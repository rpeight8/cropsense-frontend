import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const htmlPlugin = () => {
  process.env = { ...process.env, ...loadEnv("", process.cwd()) };
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return html.replace(/%LOCALE%/, "ru-RU");
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
      "@mirage": path.resolve(__dirname, ".src/mirage"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@schemas": path.resolve(__dirname, "./src/schemas"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@providers": path.resolve(__dirname, "./src/providers"),
      "@routes": path.resolve(__dirname, "./src/routes"),
    },
  },
});
