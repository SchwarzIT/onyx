<script setup lang="ts">
import { OnyxButton, OnyxListbox, type ListboxOption } from "sit-onyx";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  pkg: string;
  label: string;
  includePreReleases?: boolean;
}>();

const version = defineModel<string | null>();

const expanded = ref(false);
const versions = ref<string[]>();

async function toggle() {
  expanded.value = !expanded.value;
  if (!versions.value) {
    versions.value = await fetchVersions();
  }
}

const fetchVersions = async (): Promise<string[]> => {
  const response = await fetch(`https://data.jsdelivr.com/v1/package/npm/${props.pkg}`);
  const { versions } = (await response.json()) as { versions: string[] };
  return versions;
};

const filteredVersions = computed(() => {
  if (props.includePreReleases) return versions.value;
  return versions.value?.filter((v) => !v.includes("-"));
});

const modelValue = computed({
  get: () => {
    const isLatest = version.value && !version.value.includes(".");
    if (isLatest) return filteredVersions.value?.[0];
    return version.value ?? undefined;
  },
  set: (value) => {
    version.value = value;
    expanded.value = false;
  },
});

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

const options = computed<ListboxOption[]>(() => {
  return filteredVersions.value?.map((i) => ({ id: i, label: i })) ?? [];
});
</script>

<template>
  <div class="version" @click.stop>
    <OnyxButton
      :label="`${props.label}: ${version}`"
      mode="plain"
      variation="secondary"
      @click="toggle"
    />

    <!-- TODO: add loading/empty state -->
    <OnyxListbox v-if="expanded" v-model="modelValue" label="Select version" :options="options" />
  </div>
</template>

<style lang="scss" scoped>
.version {
  position: relative;

  .onyx-listbox {
    position: absolute;
    left: 0;
    top: 2.5rem; // button height
  }
}
</style>
