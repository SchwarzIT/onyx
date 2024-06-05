<script lang="ts" setup>
import menu from "@sit-onyx/icons/menu.svg?raw";
import moreVertical from "@sit-onyx/icons/more-vertical.svg?raw";
import { ref } from "vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxNavMobileButton from "../OnyxNavMobileButton/OnyxNavMobileButton.vue";
import OnyxUserMenu from "../OnyxUserMenu/OnyxUserMenu.vue";

const isBurgerOpen = ref(false);
const isContextOpen = ref(false);
</script>

<template>
  <header class="onyx-mobile-nav-bar">
    <div class="onyx-mobile-nav-bar__content">
      <OnyxNavMobileButton
        v-model:open="isBurgerOpen"
        :icon="menu"
        label="Toggle burger menu"
        class="onyx-mobile-nav-bar__burger"
        @update:open="isContextOpen = false"
      />

      <div class="onyx-mobile-nav-bar__main">
        <span class="onyx-mobile-nav-bar__page">Current page</span>
      </div>

      <OnyxNavMobileButton
        v-model:open="isContextOpen"
        :icon="moreVertical"
        label="Toggle context menu"
        @update:open="isBurgerOpen = false"
      />
    </div>

    <div v-if="isBurgerOpen" class="onyx-mobile-nav-bar__flyout">
      <OnyxHeadline is="h2">Navigation</OnyxHeadline>
    </div>

    <div v-if="isContextOpen" class="onyx-mobile-nav-bar__flyout">
      <OnyxUserMenu username="Jane Doe" description="Company" :options="[]" />

      <OnyxHeadline is="h2">Options</OnyxHeadline>
    </div>
  </header>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

$height: 3.5rem;

.onyx-mobile-nav-bar {
  @include layers.component() {
    background: var(--onyx-color-base-background-blank);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    z-index: var(--onyx-z-index-navigation);
    position: relative;

    // implement bottom border with :.after so it does not add to the height
    &::after {
      content: "";
      background-color: var(--onyx-color-base-neutral-300);
      height: var(--onyx-1px-in-rem);
      width: 100%;
      display: block;
      position: absolute;
      bottom: 0;
    }

    &__content {
      display: flex;
      gap: var(--onyx-spacing-md);
      align-items: center;
      justify-content: space-between;
      height: $height;
    }

    &__main {
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 600;
      flex-grow: 1;
    }

    &__burger {
      border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    }

    &__page {
      color: var(--onyx-color-text-icons-primary-intense);
    }

    &__flyout {
      position: absolute;
      top: $height;
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: var(--onyx-spacing-2xs);
      background: var(--onyx-color-base-background-tinted);
      padding: var(--onyx-spacing-xl) var(--onyx-spacing-md);

      .onyx-user-menu {
        &__flyout {
          visibility: visible;
          opacity: 1;
          position: initial;
        }

        &__trigger {
          display: none;
        }
      }
    }
  }
}
</style>
