import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { networkInterfaces } from "node:os";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  define: {
    __DEV_LAN_HOST__: JSON.stringify(command === "serve" ? Object.values(networkInterfaces()).flat().find(address => address && address.family === "IPv4" && !address.internal)?.address ?? "" : ""),
  },
  server: { host: "0.0.0.0", allowedHosts: ["terminal.local"] },
  build: {
    outDir: "dist/client",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/convex/")) return "convex";
          if (id.includes("/@tanstack/") || /\/(react|react-dom|scheduler)\//.test(id)) return "react-router";
        },
      },
    },
  },
}));
