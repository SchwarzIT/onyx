<script lang="ts" setup>
const props = defineProps<{
  /**
   * Full component name.
   *
   * @example OnyxButton.
   */
  component: string;
}>();

const meta = computed(() => getComponentMeta(props.component));

// build time breaker to guarantee that no non-existing examples
// see "prerender" config in nuxt.config.ts
watchEffect(() => {
  if (!meta.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `Component meta not found for component "${props.component}".`,
      // throwing a fatal error  will fail during SSR / prerendering
      fatal: true,
    });
  }
});
</script>

<template>
  <div class="content">
    <PropertyMetaDataGrid :items="meta?.props" />

    <ComponentMetaDataGrid
      v-if="meta?.events.length"
      :items="meta.events"
      :headline="$t('components.event', 2)"
    />
    <ComponentMetaDataGrid
      v-if="meta?.slots.length"
      :items="meta?.slots"
      :headline="$t('components.slot', 2)"
    />
    <ComponentMetaDataGrid
      v-if="meta?.exposed.length"
      :items="meta?.exposed"
      :headline="$t('components.exposed', 2)"
    />
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xl);
}
</style>
