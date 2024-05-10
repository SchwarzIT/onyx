import { fileURLToPath } from "node:url";

/** Gets the given path while ensuring cross-platform and correct decoding */
export const getFilePath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url));
};
