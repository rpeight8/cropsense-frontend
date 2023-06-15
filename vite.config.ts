import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const htmlPlugin = () => {
  process.env = { ...process.env, ...loadEnv("", process.cwd()) };
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return html.replace(
        /YANDEX_MAP_API_KEY/,
        process.env.VITE_YANDEX_API_KEY
      );
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [htmlPlugin(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@components/ui": path.resolve(__dirname, "./src/components/ui"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
});
