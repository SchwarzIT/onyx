<script lang="ts" setup>
import { capitalize, computed, ref } from "vue";
import ColorPaletteValue, { type ColorPaletteValueProps } from "./ColorPaletteValue.vue";
import DesignToken from "./DesignToken.vue";

const AVAILABLE_TABS = ["Base", "Text", "Icon"] as const;
type AvailableTab = (typeof AVAILABLE_TABS)[number];

const props = defineProps<{
  name: "action" | "brand" | "neutral" | "success" | "warning" | "danger" | "info";
}>();

const currentTab = ref<AvailableTab>("Base");

const currentTabColor = computed(() => {
  // for the neutral color palette, we need to use the action color
  // for highlighting the active tab because neutral would be basically the same as inactive tabs
  const color = props.name !== "neutral" ? props.name : "action";
  return `var(--onyx-color-text-${color}-intense)`;
});

/** Speaking names for base color steps. */
const baseStepNames: Record<number, string> = {
  200: "soft",
  500: "default",
  700: "intense",
};

const whiteTextColor = "var(--onyx-color-base-greyscale-white)";

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
        textColor: step < 500 ? `var(--onyx-color-text-${props.name}-bold)` : whiteTextColor,
      };
    });
  } else {
    const currentTabLowercase = currentTab.value.toLowerCase();
    const textColor =
      props.name === "neutral" ? whiteTextColor : `var(--onyx-color-text-${props.name}-bold)`;

    return [
      {
        description: "soft",
        color: `var(--onyx-color-${currentTabLowercase}-${props.name}-soft)`,
        textColor,
      },
      {
        description: "medium",
        color: `var(--onyx-color-${currentTabLowercase}-${props.name}-medium)`,
        textColor,
      },
      {
        description: "intense",
        color: `var(--onyx-color-${currentTabLowercase}-${props.name}-intense)`,
        textColor: whiteTextColor,
      },
      props.name === "neutral"
        ? {
            description: "inverted",
            color: `var(--onyx-color-${currentTabLowercase}-inverted)`,
            textColor: `var(--onyx-color-${currentTabLowercase}-intense)`,
            showBorder: true,
          }
        : {
            description: "bold",
            color: `var(--onyx-color-${currentTabLowercase}-${props.name}-bold)`,
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
    <div class="header">
      <h4 class="header__name">{{ capitalize(props.name) }}</h4>

      <div class="header__tabs">
        <button
          v-for="tab in AVAILABLE_TABS"
          :key="tab"
          class="header__tab"
          :class="{ 'header__tab--active': currentTab === tab }"
          @click="currentTab = tab"
          @keyup.enter="currentTab = tab"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <div class="palette__content">
      <div class="palette__steps">
        <ColorPaletteValue
          v-for="step in colorSteps"
          :key="step.description"
          v-bind="step"
          @select="handleCopy(step.color)"
        />
      </div>

      <DesignToken class="palette__copied" v-if="copiedColor" :name="copiedColor" is-copied />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.palette {
  &__content {
    padding: var(--onyx-spacing-lg);
    border-radius: var(--onyx-radius-md);
    border: 1px solid var(--onyx-color-base-border-default);
    background: var(--onyx-color-base-background-blank);
  }

  &__steps {
    display: flex;
  }

  &__copied {
    margin-top: var(--onyx-spacing-lg);
  }
}

.header {
  margin-bottom: var(--onyx-spacing-xs);
  display: flex;
  justify-content: space-between;

  &__name {
    font-weight: 600;
    color: var(--onyx-color-text-neutral-intense);
  }

  &__tabs {
    display: flex;
    gap: var(--onyx-spacing-md);
  }

  &__tab {
    color: var(--onyx-color-text-neutral-medium);
    font-weight: 600;
    font-size: 1rem;

    &--active {
      color: v-bind("currentTabColor");
    }
  }
}
</style>
