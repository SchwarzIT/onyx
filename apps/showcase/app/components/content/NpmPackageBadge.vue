<script lang="ts" setup>
const props = defineProps<{
  /**
   * Package name.
   */
  package: string;
}>();

const npmLink = computed(() => `https://www.npmjs.com/package/${props.package}`);
const furyLink = computed(
  () => `https://badge.fury.io/js/${encodeURIComponent(props.package)}.svg`,
);
</script>

<template>
  <OnyxRouterLink :href="npmLink" target="_blank">
    <OnyxImage :src="furyLink" alt="npm package" :width="128" :height="20" />
  </OnyxRouterLink>
</template>
