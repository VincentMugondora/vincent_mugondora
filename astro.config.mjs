// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://vincentmugondora.com",
  trailingSlash: "never",
  integrations: [sitemap(), icon()],

  build: {
    format: "file",
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});