<script lang="ts" setup>
import type { OnyxCodeTabProps } from "sit-onyx";
import bunIcon from "~/assets/icons/bun.svg?raw";
import npmIcon from "~/assets/icons/npm.svg?raw";
import pnpmIcon from "~/assets/icons/pnpm.svg?raw";
import yarnIcon from "~/assets/icons/yarn.svg?raw";

const props = defineProps<{
  /**
   * Package (or space separated multiple packages) to install.
   */
  packages: string;
  /**
   * Whether to install as dev dependency.
   */
  dev?: boolean;
}>();

const selectedTab = ref("pnpm");

const tabs = computed(() => {
  const command = `${props.dev ? "-D " : ""}${props.packages}`;

  return [
    { value: "pnpm", icon: pnpmIcon, code: `pnpm add ${command}`, language: "sh" },
    { value: "npm", icon: npmIcon, code: `npm install ${command}`, language: "sh" },
    { value: "yarn", icon: yarnIcon, code: `yarn add ${command}`, language: "sh" },
    { value: "bun", icon: bunIcon, code: `bun add ${command}`, language: "sh" },
  ] satisfies OnyxCodeTabProps[];
});
</script>

<template>
  <OnyxUnstableCodeTabs v-model="selectedTab">
    <OnyxUnstableCodeTab v-for="tab in tabs" v-bind="tab" :key="tab.value" :label="tab.value" />
  </OnyxUnstableCodeTabs>
</template>
