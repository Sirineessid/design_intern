import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { customComponentTagger } from "./src/utils/componentTagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && customComponentTagger(),
  ].filter(Boolean),
  css: {
    postcss: './postcss.config.js', // Ensure PostCSS config is loaded
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  hmr: {
    overlay: false,
  },
}));
