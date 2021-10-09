import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: ["src/favicon.svg", "robots.txt"],
      manifest: {
        name: "Acquire",
        short_name: "Acquire",
        start_url: ".",
        display: "standalone",
        background_color: "#000",
        theme_color: "#22c55e",
        description: "The classic real estate investing game",
        orientation: "landscape",
        icons: [
          {
            src: "src/logo_60x60.svg",
            sizes: "60x60",
            purpose: "any",
          },
          {
            src: "src/logo_144x144.svg",
            sizes: "144x144",
            purpose: "any",
          },
        ],
      },
    }),
  ],
});
