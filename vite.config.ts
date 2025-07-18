/// <reference types="vitest" />
import { defineConfig } from "vite";

// required for gun to work
const moduleExclude = (match) => {
  const m = (id) => id.indexOf(match) > -1;
  return {
    name: `exclude-${match}`,
    resolveId(id) {
      if (m(id)) return id;
    },
    load(id) {
      if (m(id)) return `export default {}`;
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      "gun",
      "gun/gun",
      "gun/sea",
      "gun/sea.js",
      "gun/lib/then",
      "gun/lib/webrtc",
      "gun/lib/radix",
      "gun/lib/radisk",
      "gun/lib/store",
      "gun/lib/rindexed",
    ],
  },
  plugins: [
    moduleExclude("text-encoding"),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   injectRegister: "script",
    //   includeAssets: ["favicon.svg"],
    //   manifest: {
    //     name: "Acquire",
    //     description: "The classic real estate investing game",
    //     theme_color: "#22c55e",
    //     icons: [
    //       {
    //         src: "logo_60x60.svg",
    //         sizes: "60x60",
    //         purpose: "any",
    //       },
    //       {
    //         src: "logo_144x144.svg",
    //         sizes: "144x144",
    //         purpose: "any",
    //       },
    //     ],
    //   },
    // }),
  ],
  server: {
    proxy: {
      "/api/gun": {
        target: "https://acquirebynate.com/gun",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/api": {
        target: "https://acquire-api.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    root: "./src",
    environment: "happy-dom",
  },
});
