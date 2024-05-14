<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";

definePageMeta({
  layout: "component-sidebar",
});

const { data, stories } = await useComponentDocs();
</script>

<template>
  <div>
    <OnyxHeadline
      is="h1"
      class="headline"
    >
      {{ data?.name }}
    </OnyxHeadline>

    <div class="sections">
      <div
        v-for="story in stories"
        :key="story.title"
      >
        <OnyxHeadline is="h2">
          {{ story.title }}
        </OnyxHeadline>

        <ClientOnly>
          <component :is="story.component" />
        </ClientOnly>

        <details>
          <summary>Code</summary>
          <pre>{{ story.sourceCode }}</pre>
        </details>
      </div>

      <ComponentMetaTable
        v-if="data?.meta.props.length"
        :headline="$t('component.props')"
        :data="data.meta.props"
      />
      <ComponentMetaTable
        v-if="data?.meta.events.length"
        :headline="$t('component.events')"
        :data="data.meta.events"
      />
      <ComponentMetaTable
        v-if="data?.meta.slots.length"
        :headline="$t('component.slots')"
        :data="data.meta.slots"
      />
      <ComponentMetaTable
        v-if="data?.meta.exposed.length"
        :headline="$t('component.exposed')"
        :data="data.meta.exposed"
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

.sections {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-xl);
}
</style>
