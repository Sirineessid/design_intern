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
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  esbuild: {
    loader: "jsx",            // Treat .js files as JSX
    include: /src\/.*\.js$/,  // Apply this rule to .js files in the /src folder
  },
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },/* this is added in vite.config.js to send the request from api to localhost:3001
  الـ proxy
   API يسهّل التواصل بين الفرونت (8080) والباكند (3001) باستعمال هالبادئة.
   -وقت تضغط "Login"، الفرونت يبعث POST إلى /api/auth/

Vite يحوّلها تلقائيًا إلى http://localhost:3001/api/auth/ (باكند)

باكند يرجع response حسب الـ email/password

وكل شيء يخدم smoothly، من غير ما تحتاج تعمل fetch بـ URL كامل أو تقلق من CORS. */  

  proxy: {
    '/socket.io': {
      target: 'http://localhost:3002',
      ws: true,
    },
    '/api': {
      target: 'http://localhost:3002',
      changeOrigin: true,
      secure: false,
    },
  
  }
}));
