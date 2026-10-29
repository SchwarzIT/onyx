import { extname } from "node:path";
import { parseTarGzip } from "nanotar";

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

interface PackageCacheItem {
  version: string;
  files: Map<string, Buffer>;
}

const packageCache = new Map<string, Promise<PackageCacheItem>>();

export default defineEventHandler(async (event) => {
  const themeName = getRouterParam(event, "themeName");
  const path = getRouterParam(event, "path");
  if (!themeName || !path) {
    throw createError({ statusCode: 400, message: "Missing theme name or path parameter" });
  }

  if (!INTERNAL_THEMES.includes(themeName)) {
    throw createError({
      statusCode: 403,
      message: `You don't have access to the "${themeName}" theme`,
    });
  }

  await requireUserSession(event);

  const packageName = `@onyx-internal/${themeName}-theme`;
  const { version, files } = await getThemePackage(packageName);

  const fileBuffer = files.get(path);
  if (!fileBuffer) {
    throw createError({ statusCode: 404, message: `File "${path}" not found` });
  }

  const etag = `"${version}-${path}"`;
  if (handleCacheHeaders(event, { etag, maxAge: 3600 })) {
    return;
  }

  const ext = extname(path);
  const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";

  setResponseHeaders(event, {
    "Content-Type": contentType,
    "Content-Length": fileBuffer.byteLength.toString(),
    "Cache-Control": "private, max-age=3600",
  });

  return fileBuffer;
});

function getThemePackage(packageName: string): Promise<PackageCacheItem> {
  let pending = packageCache.get(packageName);
  if (pending) return pending;

  pending = (async () => {
    const latestVersion = await getLatestPackageVersion(packageName);
    const tarBuffer = await getPackageTar(packageName, latestVersion);

    const parsedFiles = await parseTarGzip(new Uint8Array(tarBuffer));
    const files = new Map<string, Buffer>();

    const prefix = "package/src/";
    for (const file of parsedFiles) {
      if (file.name.startsWith(prefix) && file.data) {
        const relativePath = file.name.slice(prefix.length);
        files.set(relativePath, Buffer.from(file.data));
      }
    }

    return { version: latestVersion, files };
  })().catch((err) => {
    packageCache.delete(packageName);
    throw err;
  });

  packageCache.set(packageName, pending);
  return pending;
}

function buildPackageUrl(baseUrl: string, ...segments: string[]) {
  const base = baseUrl.replace(/\/+$/, "");
  const path = segments.map((s) => s.replace(/^\/+|\/+$/g, "")).join("/");
  return `${base}/${path}`;
}

async function getLatestPackageVersion(packageName: string) {
  const config = useRuntimeConfig();

  const metadata = await $fetch<{ "dist-tags"?: Record<string, string> }>(
    buildPackageUrl(config.jfrog.baseUrl, packageName),
    {
      headers: {
        Authorization: `Bearer ${config.jfrog.token}`,
      },
    },
  );

  const latestVersion = metadata["dist-tags"]?.latest;
  if (!latestVersion) {
    throw createError({ statusCode: 500, message: "Unable to determine latest version" });
  }

  return latestVersion;
}

async function getPackageTar(packageName: string, version: string) {
  const config = useRuntimeConfig();

  return await $fetch<ArrayBuffer>(
    buildPackageUrl(config.jfrog.baseUrl, packageName, "-", `${packageName}-${version}.tgz`),
    {
      responseType: "arrayBuffer",
      headers: {
        Authorization: `Bearer ${config.jfrog.token}`,
      },
    },
  );
}
