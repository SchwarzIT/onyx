<script lang="ts" setup>
const props = defineProps<{
  /**
   * Full component name.
   *
   * @example OnyxButton.
   */
  component: string;
}>();

const meta = computedAsync(
  async () => {
    const componentMeta = (await import("sit-onyx/dist/component-meta.json")).default;
    return componentMeta.find((m) => m.displayName === props.component);
  },
  undefined,
  {
    lazy: true,
  },
);
</script>

<template>
  <div>
    <p>{{ props.component }}</p>

    <pre>{{ meta }}</pre>
  </div>
</template>

<style lang="scss" scoped></style>
