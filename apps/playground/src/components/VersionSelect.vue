<script setup lang="ts">
import { OnyxListbox, OnyxSelect, type ListboxOption } from "sit-onyx";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { fetchVersions } from "../utils/versions";

const props = defineProps<{
  /**
   * npm package to show versions for
   * @example "vue"
   */
  pkg: string;
  label: string;
  /**
   * If `true`, pre-releases (e.g. alpha versions) will be included.
   * Otherwise they will be filtered out.
   */
  includePreReleases?: boolean;
}>();

const version = defineModel<string | null>();
const versions = ref<string[]>();
const expanded = ref(false);

async function toggle() {
  expanded.value = !expanded.value;

  // fetch versions if not already fetched
  if (!versions.value) {
    versions.value = await fetchVersions(props.pkg);
  }
}

const filteredVersions = computed(() => {
  if (props.includePreReleases) return versions.value;
  return versions.value?.filter((v) => !v.includes("-"));
});

const options = computed<ListboxOption[]>(() => {
  return filteredVersions.value?.map((i) => ({ id: i, label: i })) ?? [];
});

const modelValue = computed({
  get: () => {
    const isLatest = version.value && !version.value.includes(".");
    if (isLatest) return filteredVersions.value?.[0];
    return version.value ?? undefined;
  },
  set: (value) => {
    // do not allow to de-select the version
    if (!value) return;

    version.value = value;
    expanded.value = false;
  },
});

// TODO: remove as soon as OnyxSelect is fully implemented.
const onWindowClick = () => (expanded.value = false);
const onWindowBlur = () => {
  if (document.activeElement?.tagName === "IFRAME") {
    expanded.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", onWindowClick);
  window.addEventListener("blur", onWindowBlur);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", onWindowClick);
  window.removeEventListener("blur", onWindowBlur);
});
</script>

<template>
  <div class="version" @click.stop>
    <OnyxSelect
      :label="props.label"
      placeholder="Select version"
      :model-value="version ?? ''"
      density="compact"
      @click="toggle"
    />

    <!-- TODO: remove when OnyxSelect is fully implemented and add loading/empty state -->
    <OnyxListbox v-if="expanded" v-model="modelValue" label="Select version" :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.version {
  position: relative;

  :deep(.onyx-select__input) {
    width: 8rem;
  }

  .onyx-listbox {
    position: absolute;
    right: 0;
    top: 3.625rem; // select height + 0.25rem outline
  }
}
</style>
