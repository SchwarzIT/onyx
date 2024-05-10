<script lang="ts" setup>
import { OnyxEmpty, OnyxHeadline, OnyxLoadingIndicator } from "sit-onyx";
import type { EventMeta, ExposeMeta, PropertyMeta, SlotMeta } from "vue-component-meta";

const route = useRoute();

definePageMeta({
  layout: "component-sidebar",
});

useHead({
  title: route.params.name as string,
});

const { data, pending, error } = await useFetch(`/api/components/${route.params.name}`);
</script>

<template>
  <div>
    <OnyxHeadline
      is="h1"
      class="headline"
    >
      {{ $route.params.name }}
    </OnyxHeadline>

    <OnyxLoadingIndicator v-if="pending" />

    <OnyxEmpty
      v-else-if="error"
      class="error"
    >
      {{ $t("component.loadError") }}
    </OnyxEmpty>

    <div
      v-else
      class="tables"
    >
      <ComponentMetaTable
        v-if="data?.meta.props.length"
        :headline="$t('component.props')"
        :data="data.meta.props as PropertyMeta[]"
      />
      <ComponentMetaTable
        v-if="data?.meta.events.length"
        :headline="$t('component.events')"
        :data="data.meta.events as EventMeta[]"
      />
      <ComponentMetaTable
        v-if="data?.meta.slots.length"
        :headline="$t('component.slots')"
        :data="data.meta.slots as SlotMeta[]"
      />
      <ComponentMetaTable
        v-if="data?.meta.exposed.length"
        :headline="$t('component.exposed')"
        :data="data.meta.exposed as ExposeMeta[]"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headline {
  margin-bottom: var(--onyx-spacing-md);
}

.error {
  margin: 0 auto;
}

.tables {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-xl);
}
</style>
