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

import { defineConfig } from "vite";

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
  plugins: [moduleExclude("text-encoding")],
  // plugins: [
  //   VitePWA({
  //     includeAssets: [
  //       "src/favicon.svg",
  //       "logo_60x60.svg",
  //       "logo_144x144.svg",
  //       "robots.txt",
  //     ],
  //     manifest: {
  //       name: "Acquire",
  //       short_name: "Acquire",
  //       start_url: ".",
  //       display: "standalone",
  //       background_color: "#000",
  //       theme_color: "#22c55e",
  //       description: "The classic real estate investing game",
  //       orientation: "landscape",
  //       icons: [
  //         {
  //           src: "logo_60x60.svg",
  //           sizes: "60x60",
  //           purpose: "any",
  //         },
  //         {
  //           src: "logo_144x144.svg",
  //           sizes: "144x144",
  //           purpose: "any",
  //         },
  //       ],
  //     },
  //   }),
  // ],
});
