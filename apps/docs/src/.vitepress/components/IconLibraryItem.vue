<script lang="ts" setup>
import { ref } from "vue";
import OnyxIcon from "~components/OnyxIcon/OnyxIcon.vue";
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
</script>

<template>
  <button type="button" class="icon" @click="handleCopy">
    <OnyxIcon :icon="props.icon.content" />
    <span class="icon__tooltip">
      {{ props.icon.tooltipName }}
      <div v-if="isCopied">Import copy successful!</div>
    </span>
  </button>
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
  position: relative;
  color: var(--onyx-color-text-icons-neutral-soft);

  &__tooltip {
    position: absolute;
    top: 4rem;
    z-index: 1;
    visibility: hidden;

    padding: var(--onyx-spacing-5xs) var(--onyx-spacing-3xs);
    border-radius: var(--onyx-radius-xs);
    background: var(--onyx-color-base-neutral-900);
    color: var(--onyx-color-text-icons-neutral-inverted);
    font-size: 0.8125rem;
    line-height: 1.25rem;
    text-align: center;
    white-space: nowrap;
  }

  &:hover,
  &:focus-visible {
    border-radius: var(--onyx-radius-md);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    background: var(--onyx-color-base-background-blank);
    outline-style: unset;
    color: unset;

    .icon__tooltip {
      visibility: inherit;
    }
  }
}
</style>
