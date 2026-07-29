import { useAsyncState } from "@vueuse/core";
import { toValue, type MaybeRefOrGetter } from "vue";

export const useVersions = (pkg: MaybeRefOrGetter<string>) => {
  const { state: versions, isLoading } = useAsyncState(() => fetchVersions(toValue(pkg)), []);

  return {
    isLoading,
    versions,
  };
};

export async function fetchVersions(pkg: string): Promise<string[]> {
  const res = await fetch(`https://data.jsdelivr.com/v1/package/npm/${pkg}`, { priority: "low" });
  const { versions } = (await res.json()) as { versions: string[] };

  if (pkg === "vue") {
    // If the latest Vue version is a pre-release, include up to 10 of the
    // current pre-releases so stable releases still have room in the list.
    // Once a stable release is reached, skip all older pre-releases.
    let isInPreRelease = versions[0].includes("-");
    let preReleaseCount = 0;
    const filteredVersions: string[] = [];
    for (const v of versions) {
      if (v.includes("-")) {
        if (isInPreRelease && preReleaseCount < 10) {
          filteredVersions.push(v);
          preReleaseCount++;
        }
      } else {
        filteredVersions.push(v);
        isInPreRelease = false;
      }
      if (filteredVersions.length >= 30) {
        break;
      }
    }
    return filteredVersions;
  } else if (pkg === "typescript") {
    return versions.filter(
      (v) => !v.includes("dev") && !v.includes("insiders") && !v.startsWith("7."),
    );
  }
  return versions;
}
