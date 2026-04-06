import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", 
  build: {
    outDir: "dist",      // Must match YAML output_location
    assetsDir: "assets", // Keeps JS/CSS organized
    emptyOutDir: true    // Cleans old builds
  }
});
