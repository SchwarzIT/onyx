<script setup lang="ts">
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";

defineOptions({ inheritAttrs: false });
</script>
<template>
  <div class="onyx-mini-search">
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input v-bind="$attrs" class="onyx-mini-search__input" placeholder="Search" type="text" />
    <button class="onyx-mini-search__clear">
      <OnyxIcon :icon="xSmall" />
    </button>
  </div>
</template>
<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-mini-search {
  @include layers.component() {
    display: flex;
    align-items: center;
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);

    &__input,
    &__clear {
      all: initial;
    }

    &__input {
      color: var(--onyx-color-text-icons-neutral-soft);
      font-family: var(--onyx-font-family);
      font-size: var(--onyx-spacing-md);
      font-style: normal;
      font-weight: 400;
      line-height: var(--onyx-spacing-lg);
      flex-grow: 1;
    }

    &__clear {
      color: var(--onyx-color-text-icons-neutral-medium);
      display: grid;
      place-items: center;
      cursor: pointer;
    }
  }
}
</style>
