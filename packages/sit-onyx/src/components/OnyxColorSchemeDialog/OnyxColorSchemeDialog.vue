<script lang="ts" setup>
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxDialog from "../OnyxDialog/OnyxDialog.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import type { ColorSchemeValue, OnyxColorSchemeDialogProps } from "./types";

const props = withDefaults(defineProps<OnyxColorSchemeDialogProps>(), {
  open: false,
});

defineEmits<{
  "update:modelValue": [value: ColorSchemeValue];
}>();
</script>

<template>
  <OnyxDialog class="onyx-color-scheme-dialog" v-bind="props">
    <div>
      <OnyxHeadline is="h2">Color scheme selection</OnyxHeadline>
      <div class="onyx-color-scheme-dialog__subtitle onyx-text">
        Please select the appearance of your application
      </div>
    </div>

    <ul class="onyx-color-scheme-dialog__list">
      <li class="onyx-color-scheme-dialog__option">System</li>
      <li class="onyx-color-scheme-dialog__option">Light</li>
      <li class="onyx-color-scheme-dialog__option">Dark</li>
    </ul>

    <form method="dialog" class="onyx-color-scheme-dialog__actions">
      <OnyxButton label="Abort" mode="plain" color="neutral" />
      <OnyxButton label="Apply" type="submit" />
    </form>
  </OnyxDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-color-scheme-dialog {
  @include layers.component() {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-md);

    &__subtitle {
      color: var(--onyx-color-text-icons-neutral-medium);
    }

    &__list {
      border-radius: var(--onyx-radius-md);
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      background: var(--onyx-color-base-background-tinted);
      list-style: none;
      padding: 0;
    }

    &__option {
      display: flex;
      padding: var(--onyx-spacing-md) var(--onyx-spacing-xl);
      align-items: flex-start;
      gap: var(--onyx-spacing-md);
      align-self: stretch;

      &:not(:last-child) {
        border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--onyx-spacing-md);
    }
  }
}
</style>
