import { readFile, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, extname, join, resolve } from "node:path";
import {
  createError,
  defineEventHandler,
  getRouterParam,
  handleCacheHeaders,
  setResponseHeaders,
} from "h3";
import { requireUserSession } from "#imports";
import { INTERNAL_THEMES } from "../../../../utils/themes.js";

const require = createRequire(import.meta.url);
const cacheMaxAge = 60 * 60; // 1 hour;

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const themeId = getRouterParam(event, "theme");
  const path = getRouterParam(event, "path");
  if (!themeId || !path) {
    throw createError({
      statusCode: 400,
      message: "Missing theme or path parameter",
    });
  }

  if (!INTERNAL_THEMES.find((theme) => theme.id === themeId)) {
    throw createError({
      statusCode: 400,
      message: `Theme "${themeId}" does not exist`,
    });
  }

  const packageName = `@onyx-internal/${themeId}-theme`;
  const themePackage = await getNpmPackage(packageName);

  let fileBuffer: Buffer;
  let filePath: string;
  try {
    filePath = await resolveFilePath(themePackage, path);
    fileBuffer = await readFile(filePath);
  } catch {
    throw createError({ status: 400, message: `File "${path}" not found` });
  }

  const etag = `"${themeId}-${themePackage.version}-${path}"`;
  if (handleCacheHeaders(event, { etag, maxAge: cacheMaxAge })) {
    return;
  }

  const ext = extname(filePath);
  const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";

  setResponseHeaders(event, {
    "Content-Type": contentType,
    "Content-Length": fileBuffer.byteLength.toString(),
    "Cache-Control": `private, max-age=${cacheMaxAge}`,
  });

  return fileBuffer;
});

type NpmPackage = {
  version: string;
  srcDir: string;
  resolve: (id: string) => string;
  dependencies: string[];
};

/**
 * Gets the src path and version of the given npm package.
 */
const getNpmPackage = (() => {
  const cache = new Map<string, NpmPackage>();

  return async (packageName: string) => {
    if (cache.has(packageName)) {
      return cache.get(packageName)!;
    }

    try {
      const entryPoint = require.resolve(packageName);
      const srcDir = dirname(entryPoint);
      const packageJsonPath = join(srcDir, "..", "package.json");
      const packageJson = JSON.parse(await readFile(packageJsonPath, { encoding: "utf-8" })) as {
        version?: string;
        dependencies?: Record<string, string>;
      };

      const themeRequire = createRequire(entryPoint);
      const version = packageJson.version ?? "unknown";
      const dependencies = Object.keys(packageJson.dependencies ?? {});

      const npmPackage: NpmPackage = {
        srcDir,
        version,
        resolve: themeRequire.resolve,
        dependencies,
      };
      cache.set(packageName, npmPackage);
      return npmPackage;
    } catch {
      throw createError({
        status: 500,
        message: `No files found for package "${packageName}"`,
      });
    }
  };
})();

/**
 * Resolves the given file path of the given npm package.
 * Will also handle resolving direct dependencies.
 */
const resolveFilePath = async (npmPackage: NpmPackage, path: string): Promise<string> => {
  const localPath = resolve(npmPackage.srcDir, path);
  const isInsideSrcDir =
    localPath === npmPackage.srcDir || localPath.startsWith(npmPackage.srcDir + "/");

  if (isInsideSrcDir) {
    try {
      const stats = await stat(localPath);
      if (stats.isFile()) {
        return localPath;
      }
    } catch {
      // not a local file, try resolving as package dependency
    }
  }

  // 1. Direct package resolution (e.g. "@fontsource/barlow" or "@fontsource/barlow/files/...")
  try {
    return npmPackage.resolve(path);
  } catch {
    // ignore
  }

  // 2. Handle cases where relative URLs were resolved by the browser against an extensionless package URL
  // (e.g. "@fontsource/files/..." when loaded from "@fontsource/barlow")
  const parts = path.split("/");
  if (parts[0]?.startsWith("@") && parts.length > 1) {
    const scope = parts[0];
    const subpath = parts.slice(1).join("/");
    for (const dependency of npmPackage.dependencies) {
      if (dependency.startsWith(scope + "/")) {
        try {
          return npmPackage.resolve(`${dependency}/${subpath}`);
        } catch {
          // ignore
        }
      }
    }
  }

  throw createError({ status: 404, message: `File "${path}" not found` });
};

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
