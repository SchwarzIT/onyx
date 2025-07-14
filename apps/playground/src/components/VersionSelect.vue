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
const versions = ref<string[]>();

watchEffect(async () => {
  versions.value = await fetchVersions(props.pkg);
});

const filteredVersions = computed(() => {
  if (props.includePreReleases) return versions.value;
  return versions.value?.filter((v) => !v.includes("-"));
});

const options = computed<SelectOption<string>[]>(() => {
  return filteredVersions.value?.map((i) => ({ value: i, label: i })) ?? [];
});
</script>

<template>
  <OnyxSelect
    :model-value="version ?? undefined"
    :label="props.label"
    :list-label="`Select ${props.pkg} version`"
    :placeholder="version || 'Select version'"
    :options="options"
    density="compact"
    with-search
    @update:model-value="version = $event as Exclude<typeof $event, string[]>"
  />
</template>
