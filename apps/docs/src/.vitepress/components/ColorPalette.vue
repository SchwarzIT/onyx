<script lang="ts" setup>
import type { OnyxColor } from "sit-onyx";
import { capitalize, computed, ref } from "vue";
import ColorPaletteValue, { type ColorPaletteValueProps } from "./ColorPaletteValue.vue";
import DesignVariable from "./DesignVariable.vue";
import DesignVariableHeader from "./DesignVariableHeader.vue";

const AVAILABLE_TABS = ["Base", "Text & Icons"] as const;
type AvailableTab = (typeof AVAILABLE_TABS)[number];

const props = defineProps<{
  name: OnyxColor;
}>();

const currentTab = ref<AvailableTab>(AVAILABLE_TABS[0]);

/** Speaking names for base color steps. */
const baseStepNames: Record<number, string> = {
  200: "soft",
  500: "default",
  700: "intense",
};

const whiteTextColor = "var(--onyx-color-base-grayscale-white)";

/**
 * Available color steps to display for the currently active tab (e.g. 100-900 for base colors).
 */
const colorSteps = computed<ColorPaletteValueProps[]>(() => {
  if (currentTab.value === "Base") {
    return Array.from({ length: 9 }, (_, index) => {
      const step = (index + 1) * 100;
      return {
        description: step,
        name: baseStepNames[step],
        color: `var(--onyx-color-base-${props.name}-${step})`,
        textColor: step < 500 ? `var(--onyx-color-text-icons-${props.name}-bold)` : whiteTextColor,
      };
    });
  } else {
    const textColor =
      props.name === "neutral" ? whiteTextColor : `var(--onyx-color-text-icons-${props.name}-bold)`;

    return [
      {
        description: "soft",
        color: `var(--onyx-color-text-icons-${props.name}-soft)`,
        textColor,
      },
      {
        description: "medium",
        color: `var(--onyx-color-text-icons-${props.name}-medium)`,
        textColor,
      },
      {
        description: "intense",
        color: `var(--onyx-color-text-icons-${props.name}-intense)`,
        textColor: whiteTextColor,
      },
      props.name === "neutral"
        ? {
            description: "inverted",
            color: `var(--onyx-color-text-icons-inverted)`,
            textColor: `var(--onyx-color-text-icons-intense)`,
            showBorder: true,
          }
        : {
            description: "bold",
            color: `var(--onyx-color-text-icons-${props.name}-bold)`,
            textColor: whiteTextColor,
          },
    ];
  }
});

const copiedColor = ref("");
let copyTimeout: ReturnType<typeof setTimeout> | undefined;

/**
 * Copies the given color to the clipboard and sets the `copiedColor` to its value for 3 seconds.
 */
const handleCopy = async (color: string) => {
  await navigator.clipboard.writeText(color);
  copiedColor.value = color.replace(/var\(--(.*)\)/, "$1");

  // if multiple colors are copied quickly after each other, we need to
  // clear the previous timeout so we prevent race-conditions
  clearTimeout(copyTimeout);
  copyTimeout = setTimeout(() => (copiedColor.value = ""), 3000);
};
</script>

<template>
  <section class="palette">
    <DesignVariableHeader
      v-model="currentTab"
      :headline="capitalize(props.name)"
      :tabs="AVAILABLE_TABS"
    />

    <div class="palette__content">
      <div class="palette__steps">
        <ColorPaletteValue
          v-for="step in colorSteps"
          :key="step.description"
          v-bind="step"
          @select="handleCopy(step.color)"
        />
      </div>

      <DesignVariable
        v-if="copiedColor"
        class="palette__copied"
        :name="copiedColor"
        :value="`var(--${copiedColor})`"
        type="color"
        is-copied
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.palette {
  &__content {
    padding: var(--onyx-spacing-xl);
    border-radius: var(--onyx-radius-md);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    background: var(--onyx-color-base-background-blank);

    @include mixins.breakpoint(max, s) {
      padding: var(--onyx-spacing-md);
    }
  }

  &__steps {
    display: flex;

    @include mixins.breakpoint(max, s) {
      display: block;
    }
  }

  &__copied {
    margin-top: var(--onyx-spacing-xl);
  }
}
</style>
