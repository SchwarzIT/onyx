<script lang="ts" setup>
import { OnyxIcon, OnyxTooltip, useToast } from "sit-onyx";
import type { EnrichedIcon } from "../utils-icons";

const props = defineProps<{
  icon: EnrichedIcon;
}>();

const toast = useToast();

const handleCopy = async () => {
  const { importName, iconName } = props.icon;
  await navigator.clipboard.writeText(
    `import ${importName} from "@sit-onyx/icons/${iconName}.svg?raw";`,
  );

  toast.show({
    headline: "Copied to clipboard!",
    description: `Import for icon "${importName}" has been copied to your clipboard.`,
    color: "success",
  });
};
</script>

<template>
  <OnyxTooltip :text="props.icon.tooltipName" position="bottom">
    <template #default="{ trigger }">
      <button type="button" class="icon" v-bind="trigger" @click="handleCopy">
        <OnyxIcon :icon="props.icon.content" />
      </button>
    </template>
  </OnyxTooltip>
</template>

<style lang="scss" scoped>
.icon {
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
