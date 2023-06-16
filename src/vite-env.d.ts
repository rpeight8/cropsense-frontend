/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_MIRAGE_EXTERNAL_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_YANDEX_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
