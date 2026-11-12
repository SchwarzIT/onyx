<script setup lang="ts">
import { iconTouchHold } from "@sit-onyx/icons";
import { OnyxAppLayout, OnyxPageLayout, OnyxSidebar, OnyxIcon } from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <template #sidebar>
        <ClientOnly>
          <OnyxSidebar class="sidebar" label="Example sidebar" :collapse-sidebar="false">
            <OnyxIcon class="sidebar__icon" :icon="iconTouchHold" size="32px" />
          </OnyxSidebar>
        </ClientOnly>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.onyx-app {
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-secondary);
  border-radius: var(--onyx-radius-md);

  :deep(.onyx-app__page, .onyx-page) {
    border-radius: inherit;
  }

  :deep(.onyx-page__sidebar) {
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    overflow: visible;
  }
}

.sidebar {
  --onyx-sidebar-width: 6rem;
  position: relative;
  overflow: inherit;

  &__icon {
    position: absolute;
    top: calc(50% - 0.5 * var(--icon-size));
    right: calc(-0.5 * var(--icon-size));
  }
}
</style>
