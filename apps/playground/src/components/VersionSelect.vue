<script setup lang="ts">
import { OnyxSelect, type SelectOption } from "sit-onyx";
import { computed, ref, watch } from "vue";
import { useVersions } from "../composables/versions.js";

const props = defineProps<{
  /**
   * Npm package to show versions for
   *
   * @example
   *   "vue";
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
const isOpen = ref(false);

const { versions, isLoading, execute } = useVersions(props);

watch(isOpen, () => execute(), { once: true });

const options = computed(() => {
  const versionOptions = versions.value.map<SelectOption<string>>((i) => ({
    value: i,
    label: i,
  }));
  if (version.value && versionOptions.every(({ value }) => value !== version.value)) {
    versionOptions.unshift({ value: version.value, label: version.value });
  }
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
    v-model:open="isOpen"
    :label="props.label"
    :list-label="`Select ${props.pkg} version`"
    :placeholder="version || 'Select version'"
    :options="options"
    :loading="isLoading"
    density="compact"
    hide-clear-icon
    with-search
  />
</template>
