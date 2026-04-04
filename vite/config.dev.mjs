import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  plugins: [react()],
  server: {
    port: 8080,
  },
});
