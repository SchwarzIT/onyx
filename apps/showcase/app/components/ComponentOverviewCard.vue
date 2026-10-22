<script lang="ts" setup>
import type { Component } from "vue";

const props = defineProps<{
  title: string;
  path: string;
}>();

const allComponents = Object.entries(
  import.meta.glob<Component>("~~/content/en/components/*/*/index.vue", {
    import: "default",
  }),
).map(([key, value]) => {
  const segments = key.split("/");
  const category = getPathSegmentName(segments.at(-3) ?? "");
  const componentName = getPathSegmentName(segments.at(-2) ?? "");
  const component = defineAsyncComponent(value);
  return { category, componentName, component };
});

function getPathSegmentName(segment: string) {
  return segment.replace(/^\d+\./, "");
}

const PreviewComponent = computed(() => {
  const pathSegments = props.path.split("/");
  const category = pathSegments.at(-2);
  const componentName = pathSegments.at(-1);

  const component = allComponents.find(
    (i) => i.category === category && i.componentName === componentName,
  )?.component;
  if (component) return component;

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console -- only logged in dev mode
    console.error(
      `No overview preview component found for "${props.title}". Create a "index.vue" file in the components content folder.`,
    );
  }
});
</script>

<template>
  <OnyxCard class="component" :link="props.path">
    <InertComponentPreview class="component__preview-wrapper">
      <div class="component__preview">
        <component :is="PreviewComponent" v-if="PreviewComponent" />
      </div>
    </InertComponentPreview>

    <div class="component__meta">
      <OnyxHeadline is="h3">{{ props.title }}</OnyxHeadline>
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.component {
  padding: 0;
  gap: 0;
  transition: border-color var(--onyx-duration-sm) ease;

  &:hover,
  &:focus-visible {
    border-color: var(--onyx-color-component-border-primary);

    .component__preview {
      transform: scale(1.05);
    }
  }

  &__preview-wrapper {
    background-color: var(--onyx-color-base-background-tinted);
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    padding: var(--onyx-density-md) var(--onyx-density-3xl);
    height: 10rem;
  }

  &__preview {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--onyx-density-sm);
    overflow: hidden;
    height: 100%;
    width: 100%;
    container-type: inline-size;
    transition: transform var(--onyx-duration-sm) ease;

    // this is used to position fixed components (e.g. OnyxFAB) relative to the preview wrapper
    // instead of relative to the whole screen
    contain: layout;
  }

  &__meta {
    padding: var(--onyx-density-sm) var(--onyx-density-md);
  }
}
</style>
