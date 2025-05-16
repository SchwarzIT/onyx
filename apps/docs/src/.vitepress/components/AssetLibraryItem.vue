<script lang="ts" setup>
import { OnyxIcon, OnyxTooltip, useToast } from "sit-onyx";

export type AssetLibraryItemProps = {
  /**
   * Raw SVG content.
   */
  content: string;
  /**
   * Text to show inside a tooltip when hovered.
   */
  tooltipText: string;
  /**
   * Value that is copied to the users clipboard.
   */
  clipboardValue: string;
  /**
   * Toast message that is shown after coping.
   */
  successMessage: string;
};

const props = defineProps<AssetLibraryItemProps>();

const toast = useToast();

const handleCopy = async () => {
  await navigator.clipboard.writeText(props.clipboardValue);

  toast.show({
    headline: "Copied to clipboard!",
    description: props.successMessage,
    color: "success",
  });
};
</script>

<template>
  <OnyxTooltip :text="props.tooltipText" position="bottom">
    <template #default="{ trigger }">
      <button type="button" class="asset" v-bind="trigger" @click="handleCopy">
        <OnyxIcon :icon="props.content" />
      </button>
    </template>
  </OnyxTooltip>
</template>

<style lang="scss" scoped>
.asset {
  height: 3.5rem;
  width: 3.5rem;
  padding: var(--onyx-spacing-md);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: var(--onyx-color-text-icons-neutral-soft);

  &:hover,
  &:focus-visible {
    border-radius: var(--onyx-radius-md);
    background: var(--onyx-color-base-background-blank);
    outline: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    color: unset;
  }
}

:deep(.onyx-tooltip) {
  align-items: flex-start;
}
</style>
