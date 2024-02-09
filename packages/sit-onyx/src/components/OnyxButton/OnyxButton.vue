<script lang="ts" setup>
import { computed } from "vue";

export type ButtonProps = {
  label?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "secondary" | "danger";
  variant?: "default" | "outline" | "plain";
  icon?: string;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  label: "",
  isLoading: false,
  isDisabled: false,
  type: "button",
  color: "primary",
  variant: "default",
});

const emit = defineEmits<{
  /**
   * Emitted when the button is clicked
   */
  click: [];
}>();

const handleClick = () => {
  emit("click");
};

const backgroundColor = computed(() => {
  let resultColor = "transparent";

  if (props.variant === "default") {
    if (props.color === "primary") {
      resultColor = "var(--onyx-color-base-primary-500, #0079ce)";
    } else if (props.color === "secondary") {
      resultColor = "var(--onyx-color-base-background-blank, #FFF)";
    } else if (props.color === "danger") {
      resultColor = "var(--onyx-color-base-danger-200, #F1D3D2)";
    }
  } else {
    resultColor = "transparent";
  }

  return resultColor;
});

const backgroundHoverColor = computed(() => {
  let resultColor = "transparent";

  if (props.variant === "default") {
    if (props.color === "primary") {
      resultColor = "var(--onyx-color-base-primary-400, #3B98D9)";
    } else if (props.color === "secondary") {
      resultColor = "var(--onyx-color-base-neutral-200, #EAEDF0)";
    } else if (props.color === "danger") {
      resultColor = "var(--onyx-color-base-danger-100, #FBEFEE)";
    }
  } else {
    if (props.color === "primary") {
      resultColor = "var(--onyx-color-base-primary-100, #EDF4FA)";
    } else if (props.color === "secondary") {
      resultColor = "var(--onyx-color-base-neutral-200, #EAEDF0)";
    } else if (props.color === "danger") {
      resultColor = "var(--onyx-color-base-danger-200, #F1D3D2)";
    }
  }

  return resultColor;
});

const backgroundDisabledColor = computed(() => {
  let resultColor = "transparent";

  if (props.variant === "default") {
    if (props.color === "primary") {
      resultColor = "var(--onyx-color-base-primary-200, #BFDDF3)";
    } else if (props.color === "secondary") {
      resultColor = "var(--onyx-color-base-background-blank, #FFF)";
    } else if (props.color === "danger") {
      resultColor = "var(--onyx-color-base-danger-100, #FBEFEE)";
    }
  } else {
    resultColor = "transparent";
  }

  return resultColor;
});

const color = computed(() => {
  let resultColor = "transparent";

  if (props.variant === "default" && props.color === "primary") {
    resultColor = "var(--onyx-color-text-icons-neutral-inverted, #FFF)";
  } else {
    if (props.color === "primary") {
      resultColor = "var(--onyx-color-text-icons-primary-intense, #0079CE)";
    } else if (props.color === "secondary") {
      resultColor = "var(--onyx-color-text-icons-neutral-intense, #52626D)";
    } else if (props.color === "danger") {
      resultColor = "var(--onyx-color-text-icons-danger-intense, #D1332F)";
    }
  }

  return resultColor;
});

const disabledColor = computed(() => {
  let resultColor = "transparent";

  if (props.variant === "default" && props.color === "primary") {
    resultColor = "var(--onyx-color-text-icons-neutral-inverted, #FFF)";
  } else {
    if (props.color === "primary") {
      resultColor = "var(--onyx-color-text-icons-primary-soft, #BFDDF3)";
    } else if (props.color === "secondary") {
      resultColor = "var(--onyx-color-text-icons-neutral-soft, #95A1AA)";
    } else if (props.color === "danger") {
      resultColor = "var(--onyx-color-text-icons-danger-medium, #E6A7A6)";
    }
  }

  return resultColor;
});

const borderColor = computed(() => {
  let resultColor = "transparent";

  if (props.variant === "default" || props.variant === "outline") {
    if (props.color === "primary") {
      resultColor = "var(--onyx-color-base-primary-500, #0079ce)";
    } else if (props.color === "secondary") {
      resultColor = "var(--onyx-color-base-neutral-400, #B7BFC5)";
    } else if (props.color === "danger") {
      resultColor = "var(--onyx-color-base-danger-500, #D1332F)";
    }
  } else {
    resultColor = "transparent";
  }

  return resultColor;
});

const disabledBorderColor = computed(() => {
  let resultColor = "transparent";

  if (props.variant === "default" || props.variant === "outline") {
    if (props.color === "primary") {
      resultColor = "var(--onyx-color-base-primary-200, #BFDDF3)";
    } else if (props.color === "secondary") {
      resultColor = "var(--onyx-color-base-neutral-200, #EAEDF0)";
    } else if (props.color === "danger") {
      resultColor = "var(--onyx-color-base-danger-200, #F1D3D2)";
    }
  } else {
    resultColor = "transparent";
  }

  return resultColor;
});

const focusOutlineColor = computed(() => {
  let resultColor = "transparent";

  if (props.color === "primary") {
    resultColor = "var(--onyx-color-base-primary-200, #BFDDF3)";
  } else if (props.color === "secondary") {
    resultColor = "var(--onyx-color-base-neutral-300, #D8DDE1)";
  } else {
    resultColor = "var(--onyx-color-base-danger-300, #E6A7A6)";
  }

  return resultColor;
});
</script>

<template>
  <div
    tabindex="0"
    class="onyx-button"
    :class="{
      'onyx-button--disabled': props.isDisabled,
    }"
  >
    <button
      v-bind="props"
      ref="buttonElement"
      :disabled="props.isDisabled"
      class="onyx-button__element"
      @click="handleClick"
    >
      <span class="onyx-button__element__label">{{ props.label }}</span>
    </button>
  </div>
</template>

<style lang="scss">
.onyx-button {
  display: inline-flex;
  padding: var(--onyx-spacing-2xs, 8px) var(--onyx-spacing-sm, 12px);
  justify-content: center;
  align-items: center;
  gap: var(--onyx-spacing-4xs, 4px);
  border-radius: var(--onyx-radius-sm, 4px);
  background-color: v-bind(backgroundColor);
  border: 1px solid v-bind(borderColor);

  &:hover {
    background: v-bind(backgroundHoverColor);
  }

  &:focus-visible {
    outline: 4px solid v-bind(focusOutlineColor);
  }

  .onyx-button__element__label {
    color: v-bind(color);
  }

  &--disabled {
    cursor: none;
    pointer-events: none;
    background-color: v-bind(backgroundDisabledColor);
    border-color: v-bind(disabledBorderColor);

    .onyx-button__element__label {
      color: v-bind(disabledColor);
    }
  }

  &__element {
    position: relative;
    margin: 0;
    padding: 0;
    border: none;
    cursor: pointer;
    background: transparent;

    &:focus-visible {
      outline: none;
    }

    &__label {
      display: flex;
      padding: 0px var(--onyx-spacing-4xs, 4px);
      justify-content: center;
      align-items: center;
      gap: 10px;
      max-width: 196px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }
  }
}
</style>
