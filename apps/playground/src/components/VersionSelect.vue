<script setup lang="ts">
import { OnyxSelect, type SelectOption } from "sit-onyx";
import { computed, ref, watchEffect } from "vue";
import { fetchVersions } from "../utils/versions";

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

const modelValue = computed<SelectOption<string>>({
  get: () => {
    const isLatest = version.value && !version.value.includes(".");
    if (isLatest) return options.value?.[0];
    return options.value.find((o) => o.value === version.value)!;
  },
  set: ({ value }) => {
    version.value = value;
  },
});
</script>

<template>
  <OnyxSelect
    v-model="modelValue"
    :label="props.label"
    :list-label="`Select ${props.pkg} version`"
    placeholder="Select version"
    :options="options"
    density="compact"
  />
</template>
