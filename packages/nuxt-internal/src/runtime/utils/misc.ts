import { extname } from "node:path";

const CONTENT_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
};

/**
 * Detects the content type for the given filename.
 */
export function detectContentType(filename: string) {
  const extension = extname(filename);
  return CONTENT_TYPES[extension] ?? "application/octet-stream";
}
