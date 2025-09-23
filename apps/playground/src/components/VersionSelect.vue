<script setup lang="ts">
import { OnyxSelect, type SelectOption } from "sit-onyx";
import { computed, ref, watchEffect } from "vue";
import { fetchVersions } from "../utils/versions.js";

const props = defineProps<{
  /**
   * npm package to show versions for
   * @example "vue"
   */
  pkg: string;
  label: string;
  /**
   * If `true`, pre-releases (e.g. alpha and beta versions) will be included.
   * Otherwise they will be filtered out.
   */
  includePreReleases?: boolean;
}>();

const version = defineModel<string | null>();
const versions = ref<string[]>([]);

watchEffect(async () => {
  versions.value = await fetchVersions(props.pkg);
});

const filteredVersions = computed(() => {
  if (props.includePreReleases) return versions.value;
  return versions.value.filter((v) => !v.includes("-"));
});

const options = computed(() => {
  const versionOptions = filteredVersions.value.map<SelectOption<string>>((i) => ({
    value: i,
    label: i,
  }));
  if (!props.includePreReleases) return versionOptions;

  const SORT_ORDER = ["stable", "dev", "beta"];

  return versionOptions
    .map((option) => {
      const tag = props.includePreReleases ? getPreReleaseTagFromVersion(option.label) : undefined;
      return { ...option, group: tag };
    })
    .sort((a, b) => {
      const aIndex = SORT_ORDER.indexOf(a.group ?? "");
      const bIndex = SORT_ORDER.indexOf(b.group ?? "");
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
});

const getPreReleaseTagFromVersion = (version: string) => {
  const regex = /-(\w+)\./;
  const match = version.match(regex);
  if (match) return match[1]!;
  if (version.includes("-")) return "dev";
  return "stable";
};
</script>

<template>
  <OnyxSelect
    v-model="version"
    :label="props.label"
    :list-label="`Select ${props.pkg} version`"
    :placeholder="version || 'Select version'"
    :options="options"
    density="compact"
    with-search
  />
</template>
