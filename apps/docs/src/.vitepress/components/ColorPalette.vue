<script lang="ts" setup>
import type { OnyxColor } from "sit-onyx";
import { capitalize, computed, ref } from "vue";
import ColorPaletteValue, { type ColorPaletteValueProps } from "./ColorPaletteValue.vue";
import DesignVariable from "./DesignVariable.vue";
import DesignVariableHeader from "./DesignVariableHeader.vue";

const props = defineProps<{
  name: OnyxColor;
}>();

const AVAILABLE_TABS = ["Base", "Text & Icons", "States"];

type AvailableTab = (typeof AVAILABLE_TABS)[number];
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
  } else if (currentTab.value === "Text & Icons") {
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
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappings: any = {
      cta: {
        primary: "default",
        danger: "invalid",
        neutral: "disabled",
      },
      border: {
        danger: "invalid",
        default: props.name,
      },
      borderHover: {
        danger: "invalid-hover",
        neutral: "disabled",
        default: `${props.name}-hover`,
      },
      focus: {
        danger: "invalid",
        default: props.name,
      },
    };
    const cta = mappings.cta[props.name] || null;
    const border = mappings.border[props.name] || props.name;
    const borderHover = mappings.borderHover[props.name] || mappings.borderHover.default;
    const focus = mappings.focus[props.name] || mappings.focus.default;
    const textColor =
      props.name === "neutral" ? `var(--onyx-color-text-icons-${props.name}-bold)` : whiteTextColor;

    return [
      //cta
      props.name === "primary" || props.name === "danger" || props.name === "neutral"
        ? {
            description: props.name === "neutral" ? "cta-disabled" : "cta",
            color: `var(--onyx-color-component-cta-${cta})`,
            textColor,
          }
        : null,
      //cta-hover
      props.name === "primary" || props.name === "danger"
        ? {
            description: "cta-hover",
            color: `var(--onyx-color-component-cta-${cta}-hover)`,
            textColor,
          }
        : null,
      props.name === "primary" ||
      props.name === "danger" ||
      props.name === "neutral" ||
      props.name === "success"
        ? // border
          {
            description: props.name === "neutral" ? "border-neutral" : "border",
            color: `var(--onyx-color-component-border-${border})`,
            textColor,
          }
        : null,
      // border-hover
      props.name === "primary" ||
      props.name === "danger" ||
      props.name === "neutral" ||
      props.name === "success"
        ? {
            description: props.name === "neutral" ? "border-disabled" : "border-hover",
            color: `var(--onyx-color-component-border-${borderHover})`,
            textColor,
          }
        : null,
      //focus
      props.name === "primary" ||
      props.name === "danger" ||
      props.name === "neutral" ||
      props.name === "success"
        ? {
            description: props.name === "neutral" ? "focus-neutral" : "focus",
            color: `var(--onyx-color-component-focus-${focus})`,
            textColor: `var(--onyx-color-text-icons-${props.name}-bold)`,
          }
        : null,
    ].filter((item) => item !== null);
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
  <!-- Warning & Info don't have content for the "States" tab so we'll hide it -->
  <section class="palette">
    <DesignVariableHeader
      v-model="currentTab"
      :headline="capitalize(props.name)"
      :tabs="
        props.name === 'warning' || props.name === 'info'
          ? AVAILABLE_TABS.slice(0, -1)
          : AVAILABLE_TABS
      "
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
        :color="`var(--${copiedColor})`"
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
