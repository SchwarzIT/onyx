<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar :app-area="{ link: '#' }" :mobile="false" logo-url="/onyx-logo.svg">
        <div class="placeholder"></div>

        <template #contextArea>
          <div class="placeholder"></div>
        </template>
      </OnyxNavBar>
    </template>

    <OnyxPageLayout footer-alignment="page">
      <div class="placeholder"></div>

      <template #sidebar>
        <OnyxSidebar class="sidebar" label="Example sidebar" :resizable="false">
          <div class="sidebar__content">
            <div class="placeholder"></div>
          </div>
        </OnyxSidebar>
      </template>

      <template #footer>
        <OnyxBottomBar>
          <div class="placeholder"></div>
          <div class="placeholder"></div>
        </OnyxBottomBar>
      </template>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.onyx-app {
  width: 100%;
  height: 100%;
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  border-radius: var(--onyx-radius-md);

  :deep(> *),
  :deep(.onyx-nav-bar) {
    border-radius: inherit;
  }
}

.sidebar {
  --onyx-sidebar-width: 10rem;

  &__content {
    padding: var(--onyx-sidebar-padding);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
  }
}

.placeholder {
  background-color: var(--onyx-color-base-neutral-200);
  width: 4rem;
  max-width: 100%;
  height: 1lh;
  border-radius: var(--onyx-radius-component-skeleton);
}
</style>
