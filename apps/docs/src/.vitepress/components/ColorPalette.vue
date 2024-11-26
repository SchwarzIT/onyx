<script lang="ts" setup>
import type { OnyxColor } from "sit-onyx";
import { capitalize, computed, ref } from "vue";
import ColorPaletteValue, { type ColorPaletteValueProps } from "./ColorPaletteValue.vue";
import DesignVariable from "./DesignVariable.vue";
import DesignVariableHeader from "./DesignVariableHeader.vue";

const props = defineProps<{
  name: OnyxColor;
}>();

const AVAILABLE_TABS = ["Base", "Text & Icons", "States"] as const;
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
function getBaseColorSteps(name: OnyxColor): ColorPaletteValueProps[] {
  return Array.from({ length: 9 }, (_, index) => {
    const step = (index + 1) * 100;
    return {
      description: step,
      name: baseStepNames[step],
      color: `var(--onyx-color-base-${name}-${step})`,
      textColor: step < 500 ? `var(--onyx-color-text-icons-${name}-bold)` : whiteTextColor,
    };
  });
}

function getTextAndIconColorSteps(name: OnyxColor): ColorPaletteValueProps[] {
  const textColor =
    name === "neutral" ? whiteTextColor : `var(--onyx-color-text-icons-${name}-bold)`;

  return [
    { description: "soft", color: `var(--onyx-color-text-icons-${name}-soft)`, textColor },
    { description: "medium", color: `var(--onyx-color-text-icons-${name}-medium)`, textColor },
    {
      description: "intense",
      color: `var(--onyx-color-text-icons-${name}-intense)`,
      textColor: whiteTextColor,
    },
    name === "neutral"
      ? {
          description: "inverted",
          color: `var(--onyx-color-text-icons-inverted)`,
          textColor: `var(--onyx-color-text-icons-intense)`,
          showBorder: true,
        }
      : {
          description: "bold",
          color: `var(--onyx-color-text-icons-${name}-bold)`,
          textColor: whiteTextColor,
        },
  ];
}

function getStateColorSteps(name: OnyxColor): ColorPaletteValueProps[] {
  type ExtendedOnyxColor = OnyxColor | "default";

  const mappings: {
    cta: Partial<Record<ExtendedOnyxColor, string>>;
    border: Partial<Record<ExtendedOnyxColor, string>>;
    borderHover: Partial<Record<ExtendedOnyxColor, string>>;
    focus: Partial<Record<ExtendedOnyxColor, string>>;
  } = {
    cta: { primary: "default", danger: "invalid", neutral: "disabled" },
    border: { danger: "invalid", default: name },
    borderHover: { danger: "invalid-hover", neutral: "disabled", default: `${name}-hover` },
    focus: { danger: "invalid", default: name },
  };

  const cta = mappings.cta[name] || null;
  const border = mappings.border[name] || name;
  const borderHover = mappings.borderHover[name] || mappings.borderHover.default;
  const focus = mappings.focus[name] || mappings.focus.default;
  const textColor =
    name === "neutral" ? `var(--onyx-color-text-icons-${name}-bold)` : whiteTextColor;

  return [
    name === "primary" || name === "danger" || name === "neutral"
      ? {
          description: name === "neutral" ? "cta-disabled" : "cta",
          color: `var(--onyx-color-component-cta-${cta})`,
          textColor,
        }
      : null,
    name === "primary" || name === "danger"
      ? {
          description: "cta-hover",
          color: `var(--onyx-color-component-cta-${cta}-hover)`,
          textColor,
        }
      : null,
    {
      description: name === "neutral" ? "border-neutral" : "border",
      color: `var(--onyx-color-component-border-${border})`,
      textColor,
    },
    {
      description: name === "neutral" ? "border-disabled" : "border-hover",
      color: `var(--onyx-color-component-border-${borderHover})`,
      textColor,
    },
    {
      description: name === "neutral" ? "focus-neutral" : "focus",
      color: `var(--onyx-color-component-focus-${focus})`,
      textColor: `var(--onyx-color-text-icons-${name}-bold)`,
    },
  ].filter(Boolean) as ColorPaletteValueProps[];
}

const colorSteps = computed<ColorPaletteValueProps[]>(() => {
  switch (currentTab.value) {
    case "Base":
      return getBaseColorSteps(props.name);
    case "Text & Icons":
      return getTextAndIconColorSteps(props.name);
    default:
      return getStateColorSteps(props.name);
  }
});

const copiedColor = ref("");
let copyTimeout: ReturnType<typeof setTimeout> | undefined;

/**
 * Copies the given color to the clipboard and sets the `copiedColor` to its value for 3 seconds.
 */
const handleCopy = async (color: string) => {
  const cssVariable = color.match(/var\(--(.*)\)/)?.[1] ?? color;
  await navigator.clipboard.writeText(color);

  copiedColor.value = cssVariable;

  // if multiple colors are copied quickly after each other, we need to
  // clear the previous timeout so we prevent race-conditions
  clearTimeout(copyTimeout);
  copyTimeout = setTimeout(() => {
    copiedColor.value = "";
  }, 3000);
};
</script>

<template>
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
