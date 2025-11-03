<script lang="ts" setup>
import type { OnyxCodeTabProps } from "sit-onyx";
import bunIcon from "~/assets/icons/bun.svg?raw";
import npmIcon from "~/assets/icons/npm.svg?raw";
import pnpmIcon from "~/assets/icons/pnpm.svg?raw";
import yarnIcon from "~/assets/icons/yarn.svg?raw";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

type Props = {
  /**
   * Code snippet for the corresponding package manager.
   */
  [T in PackageManager]?: string;
};

const props = defineProps<Props>();

const selectedTab = ref("pnpm");

const tabs = computed(() => {
  // icons are imported from: https://icon-sets.iconify.design/vscode-icons/?keyword=vsco
  const tabs = [
    { value: "pnpm", icon: pnpmIcon, language: "sh", code: props.pnpm ?? "" },
    { value: "npm", icon: npmIcon, language: "sh", code: props.npm ?? "" },
    { value: "yarn", icon: yarnIcon, language: "sh", code: props.yarn ?? "" },
    { value: "bun", icon: bunIcon, language: "sh", code: props.bun ?? "" },
  ] satisfies OnyxCodeTabProps[];

  return tabs.filter((tab) => tab.code);
});
</script>

<template>
  <OnyxUnstableCodeTabs v-model="selectedTab">
    <OnyxUnstableCodeTab v-for="tab in tabs" v-bind="tab" :key="tab.value" :label="tab.value" />
  </OnyxUnstableCodeTabs>
</template>
