<script lang="ts" setup>
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import {
  OnyxBottomBar,
  OnyxButton,
  OnyxHeadline,
  OnyxImage,
  OnyxInput,
  OnyxPageLayout,
  OnyxSidebar,
  OnyxSidebarItem,
  OnyxSwitch,
} from "sit-onyx";
import { useGridStore } from "../stores/grid-store";

const gridStore = useGridStore();
</script>

<template>
  <OnyxPageLayout no-padding>
    <OnyxImage
      class="page__hero"
      src="https://picsum.photos/1920"
      alt="Hero image"
      :width="1920"
      :height="256"
      loading="eager"
    />
    <template #sidebar>
      <OnyxSidebar label="Example sidebar" resizable>
        <template #header> Header content </template>

        <div class="sidebar__content">
          <div class="onyx-sidebar-grid-container">
            <div class="onyx-sidebar-grid">
              <OnyxSidebarItem v-for="i in 6" :key="i" :link="`#link-${i}`">
                <OnyxIcon :icon="placeholder" />
                Item {{ i }}
              </OnyxSidebarItem>
            </div>
            <div class="onyx-sidebar-grid second-sidebar-grid">
              <p
                class="onyx-sidebar-grid-md-span-2 onyx-sidebar-grid-lg-span-4 onyx-sidebar-grid-xl-span-6"
              >
                Half width
              </p>
              <p
                class="onyx-sidebar-grid-md-span-2 onyx-sidebar-grid-lg-span-4 onyx-sidebar-grid-xl-span-6"
              >
                Half width
              </p>

              <p class="onyx-sidebar-grid-span-full">Full width</p>
            </div>
          </div>
        </div>

        <template #footer>
          <OnyxButton color="neutral" label="Button" />
          <OnyxButton label="Button" />
        </template>
      </OnyxSidebar>
    </template>

    <div class="onyx-grid-container">
      <OnyxHeadline is="h1">Grid demo page</OnyxHeadline>

      <form class="onyx-grid" @submit.prevent>
        <OnyxSwitch
          v-model="gridStore.isMaxWidth"
          class="onyx-grid-span-4"
          label="Is max width (md)"
        />
        <OnyxSwitch
          v-model="gridStore.isCentered"
          class="onyx-grid-span-4"
          label="Is centered"
          :disabled="!gridStore.isMaxWidth"
        />
      </form>

      <p class="page__text">{{ "Page content ".repeat(32) }}</p>

      <form class="onyx-grid" @submit.prevent>
        <OnyxInput class="onyx-grid-span-4" label="Username" required />
        <OnyxInput class="onyx-grid-span-4" label="Password" type="password" required />
        <OnyxButton class="onyx-grid-span-16" label="Submit" type="submit" />
      </form>
    </div>

    <template #footer>
      <OnyxBottomBar>
        <OnyxButton label="Cancel" mode="plain" color="neutral"></OnyxButton>
        <OnyxButton label="Approve"></OnyxButton>
      </OnyxBottomBar>
    </template>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.page {
  &__hero {
    width: 100%;
  }
  &__text {
    margin: var(--onyx-spacing-md) 0;
  }

  &__card {
    background-color: var(--onyx-color-base-neutral-200);
  }
}
.second-sidebar-grid {
  margin-top: var(--onyx-sidebar-grid-gutter);
}
</style>
