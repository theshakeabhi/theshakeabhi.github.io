// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://theshakeabhi.github.io",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
