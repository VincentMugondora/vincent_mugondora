import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const content = `User-agent: *
Allow: /

Sitemap: https://vincentmugondora.com/sitemap-index.xml
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
