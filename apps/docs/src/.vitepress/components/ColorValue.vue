<script lang="ts" setup>
import { useData } from "vitepress";
import { computed, ref } from "vue";
import type { ColorStep } from "./ColorPalette.vue";

export type ColorValueProps = {
  base: `--onyx-color-${string}`;
  textBase: `--onyx-color-text-${string}`;
  step: ColorStep;
};

const props = defineProps<ColorValueProps>();

const { isDark } = useData();

const cssVariableName = computed(() => `${props.base}-${props.step}`);

const colorValue = computed(() => {
  isDark.value; // just call isDark here so that this computed is re-calculated when light/dark mode changes
  return getComputedStyle(document.documentElement).getPropertyValue(cssVariableName.value);
});

const textColor = computed(() => {
  const threshold = isDark.value ? 500 : 400;
  const textStep = props.step <= threshold ? 900 : 100;
  return `var(${props.textBase}-${textStep})`;
});

const copyButtonTransitionTime = 250 as const;
const hasCopied = ref(false);

const handleCopy = async () => {
  await navigator.clipboard.writeText(`var(${cssVariableName.value})`);
  hasCopied.value = true;
};

const handleMouseLeave = () => {
  if (!hasCopied.value) return;
  setTimeout(() => (hasCopied.value = false), copyButtonTransitionTime);
};
</script>

<template>
  <div
    class="color"
    :style="{
      backgroundColor: `var(${cssVariableName})`,
      color: textColor,
    }"
    tabindex="0"
    @click="handleCopy"
    @mouseleave="handleMouseLeave"
    @keyup.enter="handleCopy"
  >
    <div>
      <p v-if="props.step === 500" class="color__title">default color</p>
      <h4 class="color__step">{{ props.step }}</h4>
      <p class="color__value">{{ colorValue }}</p>
    </div>

    <button
      class="color__copy"
      title="Copy Code"
      :style="{ transitionDuration: `${copyButtonTransitionTime}ms` }"
      tabindex="-1"
    >
      {{ hasCopied ? "✓ Copied" : "Copy" }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.color {
  padding: var(--onyx-spacing-lg) var(--onyx-spacing-sm) var(--onyx-spacing-sm);
  box-sizing: content-box;
  height: 64px;
  display: flex;
  gap: var(--onyx-spacing-sm);
  align-items: flex-end;
  cursor: pointer;

  &__title {
    margin: 0;
    font-size: 0.8125rem;
    line-height: 1.25rem;
  }

  &__step {
    margin: 0;
    font-weight: 600;
  }

  &__value {
    font-family: var(--onyx-font-family-mono);
    margin: 0;
    font-size: 0.8125rem;
    line-height: 1.25rem;
  }

  &__copy {
    opacity: 0;
    line-height: 1.25rem;
    transition: opacity;
  }

  &:hover,
  &:focus-visible {
    .color__copy {
      opacity: 1;
    }
  }
}
</style>
