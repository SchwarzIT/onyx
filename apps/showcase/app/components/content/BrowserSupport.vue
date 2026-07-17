<script setup lang="ts">
import browserslistrc from "@repo-root/.browserslistrc?raw";
import browserslist from "browserslist";
import { capitalize } from "vue";

export type Browser = {
  /**
   * Browser ID.
   */
  id: string;
  /**
   * User-friendly browser name.
   */
  name: string;
  /**
   * Minimum supported version.
   */
  version: string;
  /**
   * Image URL for the browser logo.
   */
  image: string;
};

const { data: browsers } = await useAsyncData(async () => {
  const config = browserslist.parseConfig(browserslistrc);

  /**
   * Key = browser ID, value: supported versions
   */
  const versionsByBrowser = new Map<string, Set<string>>();

  for (const entry of browserslist(config.defaults)) {
    const [id = "", version = ""] = entry.split(" ");

    // filter out unwanted browsers
    if (["and_chr", "ios_saf"].includes(id)) continue;

    const set = versionsByBrowser.get(id) ?? new Set();
    set.add(version);
    versionsByBrowser.set(id, set);
  }

  return Array.from(versionsByBrowser.entries()).reduce((obj, [id, versions]) => {
    const version = sortVersions(Array.from(versions).sort())[0]!;
    obj.push({
      id,
      version,
      name: capitalize(id),
      image: `/images/browsers/${id}.svg`,
    });
    return obj;
  }, [] as Browser[]);
});

/**
 * Sorts the given versions ascending.
 */
function sortVersions(versions: string[]) {
  return versions.toSorted((a, b) => {
    // split the version strings into arrays of numbers
    const aParts = a.split(".").map(Number);
    const bParts = b.split(".").map(Number);

    // find the maximum length to ensure we compare all segments (e.g., 1.0 vs 1.0.1)
    const maxLength = Math.max(aParts.length, bParts.length);

    for (let i = 0; i < maxLength; i++) {
      // fallback to 0 if a version string has fewer segments (e.g., treat '1' as '1.0.0')
      const aVal = aParts[i] ?? 0;
      const bVal = bParts[i] ?? 0;

      if (aVal !== bVal) {
        return aVal - bVal; // ascending order (smallest first)
      }
    }

    return 0; // versions are identical
  });
}
</script>

<template>
  <ul class="list">
    <li v-for="browser in browsers" :key="browser.id" class="browser">
      <img
        :src="browser.image"
        :alt="`Logo for ${browser.name} browser`"
        width="40px"
        height="40px"
        class="browser__image"
      />

      <div>
        <OnyxHeadline is="h3">{{ browser.name }}</OnyxHeadline>
        <p class="browser__version">Version ≥ {{ browser.version }}</p>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--onyx-density-xl);
  margin: 0;
  padding: 0;
}

.browser {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-md);

  &__image {
    display: block;
    width: 3rem;
    height: 3rem;
  }
}
</style>
