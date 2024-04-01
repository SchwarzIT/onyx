<script setup lang="ts">
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

const setVersion = (v: string) => {
  version.value = v;
  expanded.value = false;
};

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
    <button class="active-version" @click="toggle">
      {{ label }}
      <span class="number">{{ version }}</span>
    </button>

    <ul class="versions" :class="{ expanded }">
      <li v-if="!versions"><a>loading versions...</a></li>

      <li v-for="ver of filteredVersions" :key="ver" :class="{ active: ver === version }">
        <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions vuejs-accessibility/click-events-have-key-events -->
        <a @click="setVersion(ver)">v{{ ver }}</a>
      </li>
    </ul>
  </div>
</template>

<style>
.version {
  margin-right: 12px;
  position: relative;
}

.active-version {
  cursor: pointer;
  position: relative;
  display: inline-flex;
  place-items: center;
}

.active-version .number {
  color: var(--green);
  margin-left: 4px;
}

.active-version::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #aaa;
  margin-left: 8px;
}

.versions .active a {
  color: var(--green);
}
</style>
