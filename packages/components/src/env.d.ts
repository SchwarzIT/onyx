/// <reference types="vite/client" />

declare module "*.svg?raw" {
  const src: string;
  export default src;
}
