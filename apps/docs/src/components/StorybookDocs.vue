<script lang="ts" setup>
import { useData } from "vitepress";
import { computed } from "vue";
import { vitepressEnv } from "../.vitepress/env";

/**
 * This component is expected to be put in a markdown file with the layout set to "page"
 */
const props = defineProps<{
  /**
   * Component name
   * @example MyInput
   */
  component: string;
}>();

const { isDark } = useData();

const iframeSrc = computed(() => {
  const id = `components-${props.component.toLowerCase()}--docs`;
  const theme = isDark.value ? "dark" : "light";
  return `${vitepressEnv.storybookHost}/iframe.html?id=${id}&theme=${theme}`;
});
</script>

<template>
  <iframe class="iframe" :src="iframeSrc" :title="props.component"></iframe>
</template>

<style lang="scss" scoped>
.iframe {
  border: none;
  width: 100%;

  // 49px = height of .VPLocalNav, 64px = height of header
  height: calc(100vh - 49px - 64px);

  @media (min-width: 960px) {
    height: calc(100vh - 4rem);
    padding-left: 2rem;
  }

  @media (min-width: 1450px) {
    padding-left: 5.5rem;
  }
}
</style>
