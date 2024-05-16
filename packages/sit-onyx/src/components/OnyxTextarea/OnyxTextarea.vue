<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { useRequired } from "../../composables/required";
import { useCustomValidity } from "../../composables/useCustomValidity";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxTextareaProps } from "./types";

const props = withDefaults(defineProps<OnyxTextareaProps>(), {
  modelValue: "",
  required: false,
  autocapitalize: "sentences",
  readonly: false,
  disabled: false,
  skeleton: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value: string];
  /**
   * Emitted when the current value changes but only when the input is blurred.
   */
  change: [value: string];
  /**
   * Emitted when the input is focussed.
   */
  focus: [];
  /**
   * Emitted when the input is blurred.
   */
  blur: [];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const { vCustomValidity } = useCustomValidity({ props, emit });

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);
const { densityClass } = useDensity(props);

/**
 * Current value (with getter and setter) that can be used as "v-model" for the native input.
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleChange = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  emit("change", inputValue);
};

const shouldShowCounter = computed(() => props.withCounter && props.maxlength);
</script>

<template>
  <div v-if="props.skeleton" :class="['onyx-textarea-skeleton', densityClass]">
    <OnyxSkeleton v-if="!props.hideLabel" class="onyx-textarea-skeleton__label" />
    <OnyxSkeleton class="onyx-textarea-skeleton__input" />
  </div>

  <div v-else :class="['onyx-textarea', requiredTypeClass, densityClass]">
    <label>
      <div
        v-if="!props.hideLabel"
        :class="['onyx-textarea__label', 'onyx-text--small', requiredMarkerClass]"
      >
        <div class="onyx-truncation-ellipsis">{{ props.label }}</div>
      </div>

      <div class="onyx-textarea__wrapper">
        <!-- eslint-disable vuejs-accessibility/no-autofocus -
         We want to provide the flexibility to have the autofocus property.
         The JSDoc description includes a warning that it should be used carefully.
      -->
        <textarea
          v-model="value"
          v-custom-validity
          class="onyx-textarea__native"
          :placeholder="props.placeholder"
          :required="props.required"
          :autocapitalize="props.autocapitalize"
          :autofocus="props.autofocus"
          :name="props.name"
          :readonly="props.readonly"
          :disabled="props.disabled"
          :minlength="props.minlength"
          :maxlength="props.maxlength"
          :aria-label="props.hideLabel ? props.label : undefined"
          :title="props.hideLabel ? props.label : undefined"
          @change="handleChange"
          @focus="emit('focus')"
          @blur="emit('blur')"
        ></textarea>
        <!-- eslint-enable vuejs-accessibility/no-autofocus -->
      </div>
    </label>

    <div v-if="props.message || shouldShowCounter" class="onyx-textarea__footer onyx-text--small">
      <span v-if="props.message" class="onyx-truncation-ellipsis">{{ props.message }}</span>
      <span v-if="shouldShowCounter" class="onyx-textarea__counter">
        {{ value.length }}/{{ props.maxlength }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/input.scss";

.onyx-textarea,
.onyx-textarea-skeleton {
  @include density.compact {
    --onyx-textarea-padding-vertical: var(--onyx-spacing-4xs);
  }

  @include density.default {
    --onyx-textarea-padding-vertical: var(--onyx-spacing-2xs);
  }

  @include density.cozy {
    --onyx-textarea-padding-vertical: var(--onyx-spacing-sm);
  }
}

$default-height: calc(6lh + 2 * var(--onyx-textarea-padding-vertical));

.onyx-textarea-skeleton {
  @include input.define-skeleton-styles($height: $default-height);
}

.onyx-textarea {
  @include layers.component() {
    @include input.define-shared-styles(
      $base-selector: ".onyx-textarea",
      $vertical-padding: var(--onyx-textarea-padding-vertical)
    );

    &__wrapper {
      padding: 0;
      height: unset;
    }

    &__native {
      padding: var(--onyx-textarea-padding-vertical) var(--onyx-spacing-sm);
      resize: vertical;
      height: $default-height;

      &:read-only {
        resize: none;
      }

      &::-webkit-resizer {
        background-color: red;
      }
    }
  }
}
</style>
