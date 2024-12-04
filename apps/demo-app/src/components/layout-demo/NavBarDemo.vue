<script lang="ts" setup>
import { OnyxButton, OnyxIconButton } from "sit-onyx";
import { useRouter } from "vue-router";
import onyxLogo from "../../assets/onyx-logo.svg?raw";

defineSlots<{
  /**
   * Nav bar content.
   */
  default?(): unknown;
}>();

const isLeftAligned = defineModel<boolean>();

const router = useRouter();
</script>

<template>
  <div class="nav-bar" :class="{ 'nav-bar--left': isLeftAligned }">
    <OnyxIconButton :icon="onyxLogo" label="Home" @click="router.push('/')" />

    <slot></slot>

    <OnyxButton label="switch nav" @click="isLeftAligned = !isLeftAligned" />
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  height: 3.125rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--onyx-spacing-md);
  padding-left: 1rem;

  &--left {
    padding-left: unset;
    flex-flow: column nowrap;
    width: 4.375rem;
    height: 100%;
  }
}
</style>
