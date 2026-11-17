import { extname } from "node:path";
import {
  createError,
  defineEventHandler,
  getRouterParam,
  handleCacheHeaders,
  sendRedirect,
  setResponseHeaders,
} from "h3";
import { requireUserSession } from "#imports";
import { getLatestPackageVersion, getPackageFiles } from "../../../../utils/artifactory.js";
import { detectContentType } from "../../../../utils/misc.js";
import { INTERNAL_THEMES } from "../../../../utils/themes.js";

type NpmPackage = {
  version: string;
  files: Map<string, Buffer>;
};

const cacheMaxAge = 60 * 60; // 1 hour

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const themeId = getRouterParam(event, "theme");
  const path = getRouterParam(event, "path");
  if (!themeId || !path) {
    throw createError({
      status: 400,
      message: "Missing theme or path parameter",
    });
  }

  if (!INTERNAL_THEMES.find((theme) => theme.id === themeId)) {
    throw createError({
      status: 400,
      message: `Theme "${themeId}" does not exist`,
    });
  }

  // packages might reference other npm packages (such as "@fontsource/*" for font families) so we proxy those requests
  // to jsdelivr since they are publicly accessible
  if (path.startsWith("@")) {
    const targetPath = extname(path) ? path : `${path.replace(/\/$/, "")}/index.css`;
    setResponseHeaders(event, {
      "Cache-Control": `public, max-age=${cacheMaxAge}`,
    });
    return sendRedirect(event, `https://cdn.jsdelivr.net/npm/${targetPath}`);
  }

  const packageName = `@onyx-internal/${themeId}-theme`;
  const { version, files } = await getThemePackage(packageName);

  const fileBuffer = files.get(path);
  if (!fileBuffer) {
    throw createError({ status: 404, message: `File "${path}" not found` });
  }

  const etag = `"${themeId}-${version}-${path}"`;
  if (handleCacheHeaders(event, { etag, maxAge: cacheMaxAge })) {
    return;
  }

  setResponseHeaders(event, {
    "Content-Type": detectContentType(path),
    "Content-Length": fileBuffer.byteLength.toString(),
    "Cache-Control": `private, max-age=${cacheMaxAge}`,
  });

  return fileBuffer;
});

/**
 * Gets the content / files of the given npm package.
 * Result will be cached so subsequent requests for the same package are served from the cache.
 */
const getThemePackage = (() => {
  const cache = new Map<string, Promise<NpmPackage>>();

  return (packageName: string): Promise<NpmPackage> => {
    let pending = cache.get(packageName);
    if (pending) return pending;

    pending = (async () => {
      const latestVersion = await getLatestPackageVersion(packageName);
      const parsedFiles = await getPackageFiles(packageName, latestVersion);
      const files = new Map<string, Buffer>();

      const prefix = "package/src/";

      parsedFiles.forEach((file) => {
        if (!file.name.startsWith(prefix) || !file.data) return;
        const relativePath = file.name.slice(prefix.length);
        files.set(relativePath, Buffer.from(file.data));
      });

      return { version: latestVersion, files };
    })().catch((err) => {
      cache.delete(packageName);
      throw err;
    });

    cache.set(packageName, pending);
    return pending;
  };
})();
