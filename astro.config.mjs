import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://vincentmugondora.com",
  trailingSlash: "never",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/admin") && !page.includes("/certificates"),
      serialize(item) {
        const now = new Date().toISOString();
        item.lastmod = now;
        
        let url = new URL(item.url);
        // Clean URL to prevent redirects (strip .html and trailing slashes)
        if (url.pathname.endsWith('/index.html')) {
          url.pathname = url.pathname.slice(0, -11) || '/';
        } else if (url.pathname.endsWith('.html')) {
          url.pathname = url.pathname.slice(0, -5);
        }
        if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
          url.pathname = url.pathname.slice(0, -1);
        }
        item.url = url.href;

        const path = url.pathname;
        if (path === "" || path === "/") {
          item.priority = 1.0;
        } else if (path.startsWith("/writing")) {
          item.priority = 0.8;
        } else if (path.startsWith("/services")) {
          item.priority = 0.9;
        } else if (path === "/about") {
          item.priority = 0.9;
        } else {
          item.priority = 0.7;
        }
        return item;
      },
    }),
    icon(),
  ],

  build: {
    format: "file",
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["@resvg/resvg-js"],
      optimizeDeps: {
        exclude: ["astro/virtual-modules/middleware.js", "marked"],
      },
    },
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});