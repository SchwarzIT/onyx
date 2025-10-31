<script lang="ts" setup>
import bunIcon from "~/assets/icons/bun.svg?raw";
import npmIcon from "~/assets/icons/npm.svg?raw";
import pnpmIcon from "~/assets/icons/pnpm.svg?raw";
import yarnIcon from "~/assets/icons/yarn.svg?raw";
import type { CodeGroupTab } from "../OnyxCodeGroup/types.js";

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

const tabs = computed<CodeGroupTab[]>(() => {
  const command = `${props.dev ? "-D " : ""}${props.packages}`;

  return [
    { label: "pnpm", icon: pnpmIcon, code: `pnpm add ${command}`, language: "sh" },
    { label: "npm", icon: npmIcon, code: `npm install ${command}`, language: "sh" },
    { label: "yarn", icon: yarnIcon, code: `yarn add ${command}`, language: "sh" },
    { label: "bun", icon: bunIcon, code: `bun add ${command}`, language: "sh" },
  ];
});
</script>

<template>
  <OnyxCodeGroup :tabs />
</template>
