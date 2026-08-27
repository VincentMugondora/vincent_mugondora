import type { APIContext } from "astro";

export function GET(context: APIContext) {
  const sitemapUrl = new URL("/sitemap-index.xml", context.site).href;

  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
