<script lang="ts" setup>
import {
  OnyxBottomBar,
  OnyxButton,
  OnyxHeadline,
  OnyxImage,
  OnyxInput,
  OnyxPageLayout,
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
</style>
