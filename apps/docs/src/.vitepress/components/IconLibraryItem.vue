<script lang="ts" setup>
import circleCheck from "@sit-onyx/icons/circle-check.svg?raw";
import { computed, ref } from "vue";
import OnyxIcon from "~components/OnyxIcon/OnyxIcon.vue";
import OnyxTooltip from "~components/OnyxTooltip/OnyxTooltip.vue";
import type { EnrichedIcon } from "../utils-icons";

const props = defineProps<{
  icon: EnrichedIcon;
}>();

const isCopied = ref(false);

const handleCopy = async () => {
  const { importName, iconName } = props.icon;
  await navigator.clipboard.writeText(
    `import ${importName} from "@sit-onyx/icons/${iconName}.svg?raw";`,
  );
  isCopied.value = true;
  setTimeout(() => (isCopied.value = false), 3000);
};

const tooltipText = computed(() => {
  if (!isCopied.value) return props.icon.tooltipName;
  return `Import copied to clipboard!\n${props.icon.tooltipName}`;
});
</script>

<template>
  <OnyxTooltip :text="tooltipText" position="bottom" :icon="isCopied ? circleCheck : undefined">
    <button type="button" class="icon" @click="handleCopy">
      <OnyxIcon :icon="props.icon.content" />
    </button>
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
  border: var(--onyx-1px-in-rem) solid transparent;
  color: var(--onyx-color-text-icons-neutral-soft);

  &:hover,
  &:focus-visible {
    border-radius: var(--onyx-radius-md);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    background: var(--onyx-color-base-background-blank);
    outline-style: unset;
    color: unset;
  }
}

:deep(.onyx-tooltip) {
  align-items: flex-start;
}
</style>
