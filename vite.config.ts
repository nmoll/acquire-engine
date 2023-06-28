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
  plugins: [moduleExclude("text-encoding")],
  server: {
    proxy: {
      "/api/gun": {
        target: "https://gun-manhattan.herokuapp.com/gun",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  test: {
    root: "./src",
  },
});
