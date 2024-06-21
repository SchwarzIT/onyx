<script lang="ts" setup>
import { OnyxSelect } from "sit-onyx";
import { ref } from "vue";

const showFlyout = defineModel<boolean>();

defineProps<{ small?: boolean }>();

const selectState = ref();
</script>

<template>
  <label class="flyout-demo" :class="{ 'flyout-demo--small': small }">
    Demo Drop Down:
    <div class="flyout-demo__parent">
      <input class="flyout-demo__input" width="10px" @click="showFlyout = !showFlyout" />
      <div v-if="showFlyout" class="flyout-demo__flyout">
        <slot></slot>
      </div>
    </div>
    <OnyxSelect
      v-model="selectState"
      label="Example select"
      list-label="Example listbox list"
      :options="[]"
      hide-label
    />
  </label>
</template>

<style lang="scss" scoped>
.flyout-demo {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  gap: 0.5rem;

  &__parent {
    position: relative;
  }
  &__flyout {
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    background-color: var(--onyx-color-base-background-blank);
    position: absolute;
    z-index: var(--onyx-z-index-flyout);
    height: fit-content;
    min-width: 6.25rem;
    right: 0;
    left: 0;
  }

  &--small .flyout-demo__input {
    width: 90%;
  }
}
</style>
