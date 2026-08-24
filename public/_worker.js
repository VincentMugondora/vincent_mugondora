const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://analytics.ahrefs.com; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self'; connect-src 'self' https://analytics.ahrefs.com; frame-ancestors 'none'",
};

function applyHeaders(response, cacheControl) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  headers.set("Cache-Control", cacheControl);
  return headers;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);

    // Serve custom 404 page for HTML requests that aren't found
    if (response.status === 404 && !url.pathname.match(/\.\w+$/)) {
      const notFoundPage = await env.ASSETS.fetch(
        new Request(new URL("/404.html", url.origin))
      );

      if (notFoundPage.ok) {
        const headers = applyHeaders(notFoundPage, "no-store");
        headers.set("Content-Type", "text/html;charset=UTF-8");
        return new Response(notFoundPage.body, { status: 404, headers });
      }
    }

    // Apply headers based on path
    let cacheControl = "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

    if (url.pathname.startsWith("/_astro/") || url.pathname.startsWith("/fonts/")) {
      cacheControl = "public, max-age=31536000, immutable";
    }

    const headers = applyHeaders(response, cacheControl);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
