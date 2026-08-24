import { defineMiddleware } from "astro:middleware";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://analytics.ahrefs.com; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self'; connect-src 'self' https://analytics.ahrefs.com; frame-ancestors 'none'",
};

function getCookie(request: Request, name: string): string | null {
  const cookies = request.headers.get("cookie") || "";
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}

export const onRequest = defineMiddleware(async (_context, next) => {
  const url = new URL(_context.request.url);

  if (
    url.pathname.startsWith("/admin") &&
    url.pathname !== "/admin/login" &&
    !url.pathname.startsWith("/api/admin/auth")
  ) {
    const token = getCookie(_context.request, "admin_token");
    if (!token) {
      return _context.redirect("/admin/login");
    }
  }

  const response = await next();

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  if (url.pathname.startsWith("/admin")) {
    response.headers.set("Cache-Control", "no-store, private");
  } else if (url.pathname.startsWith("/_astro/") || url.pathname.startsWith("/fonts/")) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (response.status === 404) {
    response.headers.set("Cache-Control", "no-store");
  } else {
    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    );
  }

  return response;
});
