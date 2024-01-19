<script lang="ts" setup>
import { capitalize, computed, ref } from "vue";
import ColorPaletteValue, { type ColorPaletteValueProps } from "./ColorPaletteValue.vue";
import DesignToken from "./DesignToken.vue";

const BUTTON_TYPES = ["Base", "Text", "Icon"] as const;
type ButtonType = (typeof BUTTON_TYPES)[number];

const props = defineProps<{
  name: "action" | "brand" | "neutral" | "success" | "warning" | "danger" | "info";
}>();

const activeButton = ref<ButtonType>("Base");
const activeButtonColor = computed(() => {
  const color = props.name !== "neutral" ? props.name : "action";
  return `var(--onyx-color-text-${color}-intense)`;
});

const colorSteps = computed<ColorPaletteValueProps[]>(() => {
  const whiteTextColor = "var(--onyx-color-base-greyscale-white)";

  if (activeButton.value === "Base") {
    const stepMap: Record<number, string> = {
      200: "soft",
      500: "default",
      700: "intense",
    };

    return Array.from({ length: 9 }, (_, index) => {
      const step = (index + 1) * 100;
      return {
        description: step,
        color: `var(--onyx-color-base-${props.name}-${step})`,
        name: stepMap[step],
        textColor: step < 500 ? `var(--onyx-color-text-${props.name}-bold)` : whiteTextColor,
      };
    });
  } else {
    const activeButtonValue = activeButton.value.toLowerCase();
    const textColor =
      props.name !== "neutral" ? `var(--onyx-color-text-${props.name}-bold)` : whiteTextColor;

    return [
      {
        description: "soft",
        color: `var(--onyx-color-${activeButtonValue}-${props.name}-soft)`,
        textColor,
      },
      {
        description: "medium",
        color: `var(--onyx-color-${activeButtonValue}-${props.name}-medium)`,
        textColor,
      },
      {
        description: "intense",
        color: `var(--onyx-color-${activeButtonValue}-${props.name}-intense)`,
        textColor: whiteTextColor,
      },
      props.name !== "neutral"
        ? {
            description: "bold",
            color: `var(--onyx-color-${activeButtonValue}-${props.name}-bold)`,
            textColor: whiteTextColor,
          }
        : {
            description: "inverted",
            color: `var(--onyx-color-${activeButtonValue}-inverted)`,
            textColor: `var(--onyx-color-${activeButtonValue}-intense)`,
            showBorder: true,
          },
    ];
  }
});

const copiedColor = ref("");
let copyTimeout: ReturnType<typeof setTimeout> | undefined;

const handleCopy = async (color: string) => {
  await navigator.clipboard.writeText(color);
  copiedColor.value = color.replace(/var\(--(.*)\)/, "$1");
  clearTimeout(copyTimeout);
  copyTimeout = setTimeout(() => (copiedColor.value = ""), 3000);
};
</script>

<template>
  <section class="palette">
    <div class="header">
      <h4 class="header__name">{{ capitalize(props.name) }}</h4>

      <div class="header__buttons">
        <button
          v-for="type in BUTTON_TYPES"
          :key="type"
          class="header__button"
          :class="{ 'header__button--active': activeButton === type }"
          @click="activeButton = type"
          @keyup.enter="activeButton = type"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <div class="palette__content">
      <div class="palette__steps" :class="{ 'palette__steps--4': colorSteps.length === 4 }">
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
    display: grid;
    grid-template-columns: repeat(9, 1fr);

    &--4 {
      grid-template-columns: repeat(4, 1fr);
    }
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

  &__buttons {
    display: flex;
    gap: var(--onyx-spacing-md);
  }

  &__button {
    color: var(--onyx-color-text-neutral-medium);
    font-weight: 600;
    font-size: 1rem;

    &--active {
      color: v-bind("activeButtonColor");
    }
  }
}
</style>
