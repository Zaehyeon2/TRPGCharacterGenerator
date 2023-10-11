/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_LOCALHOST: string;
  readonly VITE_ENV_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
