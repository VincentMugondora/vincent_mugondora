// @ts-check
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
      filter: (page) => !page.includes("/admin"),
      serialize(item) {
        if (item.url.includes("/writing/")) {
          item.lastmod = new Date().toISOString();
          item.changefreq = "weekly";
          item.priority = 0.8;
        } else if (item.url === "https://vincentmugondora.com") {
          item.lastmod = new Date().toISOString();
          item.changefreq = "weekly";
          item.priority = 1.0;
        } else if (item.url.includes("/services/")) {
          item.lastmod = new Date().toISOString();
          item.changefreq = "monthly";
          item.priority = 0.9;
        } else {
          item.lastmod = new Date().toISOString();
          item.changefreq = "monthly";
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