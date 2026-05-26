<script lang="ts" setup>
import type { ComponentMetaItem } from "./ComponentMetaDataGrid.vue";

const props = defineProps<{
  /**
   * Full component name.
   *
   * @example OnyxButton.
   */
  component: string;
  /**
   * The npm package name that the component is including in.
   */
  package: string;
}>();

const meta = computed(() => getComponentMeta(props.component, props.package));

// build time breaker to guarantee that no non-existing components are used
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

const mappedEvents = computed(() => {
  return meta.value?.events.map<ComponentMetaItem>((event) => ({
    name: event.name,
    description: event.description,
    schema: event.type === "[]" ? undefined : event.type,
  }));
});

const mappedSlots = computed(() => {
  return meta.value?.slots.map<ComponentMetaItem>((slot) => ({
    name: slot.name,
    description: slot.description,
    schema: slot.schema === "any" ? undefined : slot.schema,
  }));
});
</script>

<template>
  <div class="content">
    <ComponentMetaDataGrid :headline="$t('components.property', 2)" :items="meta?.props ?? []" />

    <ComponentMetaDataGrid
      v-if="mappedEvents?.length"
      :headline="$t('components.event', 2)"
      :items="mappedEvents"
    />

    <ComponentMetaDataGrid
      v-if="mappedSlots?.length"
      :headline="$t('components.slot', 2)"
      :items="mappedSlots"
    />

    <ComponentMetaDataGrid
      v-if="meta?.exposed?.length"
      :headline="$t('components.exposed', 2)"
      :items="meta?.exposed"
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
