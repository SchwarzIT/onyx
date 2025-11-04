<script lang="ts" setup>
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

const scripts = computed(() => {
  const command = `${props.dev ? "-D " : ""}${props.packages}`;
  return {
    pnpm: `pnpm add ${command}`,
    npm: `npm install ${command}`,
    yarn: `yarn add ${command}`,
    bun: `bun add ${command}`,
  };
});
</script>

<template>
  <PackageManagerCodeTabs v-bind="scripts" />
</template>
