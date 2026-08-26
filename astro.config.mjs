import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://vincentmugondora.com",
  trailingSlash: "never",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/admin") && !page.includes("/certificates"),
      serialize(item) {
        const now = new Date().toISOString();
        item.lastmod = now;
        const path = new URL(item.url).pathname;
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
      optimizeDeps: {
        exclude: ["astro/virtual-modules/middleware.js"],
      },
    },
  },

  adapter: cloudflare(),
});