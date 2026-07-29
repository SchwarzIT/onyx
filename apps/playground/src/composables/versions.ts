import { useAsyncState } from "@vueuse/core";

export const PKG_METADATA_URL = (pkg: string) => `https://data.jsdelivr.com/v1/package/npm/${pkg}`;

type UseVersionOptions = {
  pkg: string;
  includePreReleases: boolean;
};

export const useVersions = ({ pkg, includePreReleases }: UseVersionOptions) => {
  const {
    state: versions,
    isLoading,
    execute,
  } = useAsyncState(() => fetchVersions(pkg, includePreReleases), [], {
    immediate: false,
  });

  return {
    // Add a small delay, so that the select doesn't flash
    execute: () => execute(200),
    isLoading,
    versions,
  };
};

export async function fetchVersions(pkg: string, includePreReleases = true): Promise<string[]> {
  const res = await fetch(PKG_METADATA_URL(pkg));
  let { versions } = (await res.json()) as { versions: string[] };

  if (pkg === "typescript") {
    versions = versions.filter(
      (v) => !v.includes("dev") && !v.includes("insiders") && !v.startsWith("7."),
    );
  }
  if (includePreReleases) {
    return versions;
  }
  return versions.filter((v) => !v.includes("-"));
}
