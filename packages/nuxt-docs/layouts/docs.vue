<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";

defineSlots<{
  default(): unknown;
}>();
</script>

<template>
  <OnyxPageLayout footer-aside-sidebar>
    <template #sidebar> Sidebar </template>

    <div class="onyx-grid-container content">
      <div>
        <slot />
      </div>

      <div>
        <OnyxHeadline is="h3">Table of contents</OnyxHeadline>
        ...
      </div>
    </div>

    <template #footer>
      <OnyxBottomBar>
        <template #left>
          <OnyxIconButton color="neutral" :icon="chevronLeftSmall" label="Prev" />
          <OnyxIconButton color="neutral" :icon="chevronRightSmall" label="Next" />
        </template>
      </OnyxBottomBar>
    </template>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
:deep(.onyx-page__sidebar) {
  width: 20vw;
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
}

.content {
  display: grid;
  grid-template-columns: 1fr minmax(8rem, 25%);
  gap: var(--onyx-grid-gutter);
}
</style>
