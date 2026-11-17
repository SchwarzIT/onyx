import { parseTarGzip } from "nanotar";
import { createError, useRuntimeConfig } from "nuxt/server";
import type { MappedResponseType, ResponseType } from "ofetch";

function getArtifactoryConfig() {
  const config = useRuntimeConfig();
  const jfrog = config.jfrog as { baseUrl?: string; token?: string } | undefined;

  if (!jfrog?.baseUrl || !jfrog?.token) {
    throw createError({ statusCode: 500, message: "Missing Artifactory configuration." });
  }

  return {
    baseUrl: jfrog.baseUrl,
    token: jfrog.token,
  };
}

export type FetchArtifactoryOptions<R extends ResponseType = "json"> = Omit<
  NonNullable<Parameters<typeof $fetch>[1]>,
  "responseType"
> & {
  responseType?: R;
};

/**
 * Unified fetch wrapper around $fetch to communicate with Artifactory. Automatically prepends the
 * configured Artifactory `baseUrl` and adds the `Authorization` token header.
 */
export function fetchArtifactory<T = unknown, R extends ResponseType = "json">(
  url: string,
  options?: FetchArtifactoryOptions<R>,
): Promise<MappedResponseType<R, T>> {
  const { baseUrl, token } = getArtifactoryConfig();

  const headers = new Headers(options?.headers);
  headers.set("Authorization", `Bearer ${token}`);

  return $fetch(url, {
    ...options,
    baseURL: baseUrl,
    headers,
  }) as Promise<MappedResponseType<R, T>>;
}

/**
 * Gets the latest version for the given npm package.
 */
export function getLatestPackageVersion(packageName: string) {
  return fetchArtifactory<{ "dist-tags"?: Record<string, string> }>(packageName)
    .then((metadata) => {
      const latestVersion = metadata["dist-tags"]?.latest;
      if (!latestVersion) throw new Error("Latest version not found");
      return latestVersion;
    })
    .catch(() => {
      throw createError({
        statusCode: 500,
        message: `Unable to determine latest version for package "${packageName}"`,
      });
    });
}

/**
 * Gets the content of all files from the given npm package.
 */
export async function getPackageFiles(packageName: string, version: string) {
  const tarBuffer = await fetchArtifactory(`${packageName}/-/${packageName}-${version}.tgz`, {
    responseType: "arrayBuffer",
  }).catch(() => {
    throw createError({
      status: 500,
      message: `Unable to load tar for package "${packageName}" and version "${version}"`,
    });
  });

  return parseTarGzip(tarBuffer).catch(() => {
    throw createError({
      status: 500,
      message: "Unable to extract package files from tar",
    });
  });
}
