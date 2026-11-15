import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * JPL Horizons sends no CORS headers, so the browser reaches it through this
 * same-origin path. Covers `npm run dev` and `npm run preview`. A static host
 * needs server/horizons-proxy.mjs mounted at the same path.
 */
const horizonsProxy = {
  "/api/horizons": {
    target: "https://ssd.jpl.nasa.gov",
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api\/horizons/, "/api/horizons.api"),
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 4731,
    strictPort: true,
    proxy: horizonsProxy,
  },
  preview: {
    host: "0.0.0.0",
    port: 4731,
    strictPort: true,
    proxy: horizonsProxy,
  },
});
