<script lang="ts" setup generic="T">
import { computed, useId } from "vue";
import { useRequired } from "../../composables/required";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import FormMessage from "./FormMessage.vue";
import type { OnyxFormElementProps } from "./types";

const props = withDefaults(defineProps<OnyxFormElementProps>(), {
  required: false,
  id: () => useId(),
});

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);

/**
 * Current value of the input.
 */
const modelValue = defineModel<T>();

const counter = computed(() => {
  if (props.withCounter && props.maxlength) {
    const length = (modelValue.value?.toString() ?? "").length;
    const maxLength = typeof props.maxlength === "object" ? props.maxlength.max : props.maxlength;
    const violated = length > maxLength;

    return {
      length,
      maxLength,
      violated,
    };
  }
  return undefined;
});

defineSlots<{
  /** The place for the actual form element */
  default(props: { id: string }): unknown;
}>();
</script>

<template>
  <div
    :class="[
      'onyx-component',
      'onyx-form-element',
      requiredTypeClass,
      successMessages ? 'onyx-form-element--success' : undefined,
    ]"
  >
    <div v-if="!props.hideLabel" class="onyx-form-element__label onyx-text--small">
      <label :for="props.id" class="onyx-truncation-ellipsis">{{ props.label }}</label>
      <span
        v-if="props.required"
        :class="[props.required ? requiredMarkerClass : undefined]"
      ></span>
      <OnyxInfoTooltip
        v-if="props.labelTooltip"
        class="onyx-form-element__label-tooltip"
        open="hover"
        :text="props.labelTooltip"
      />
      <span
        v-if="!props.required"
        :class="[!props.required ? requiredMarkerClass : undefined]"
      ></span>
    </div>
    <slot :id="props.id"></slot>
    <div class="onyx-form-element__footer onyx-text--small">
      <span class="onyx-form-element__footer-messages">
        <FormMessage
          v-if="props.errorMessages"
          class="onyx-form-element__error-message"
          :messages="props.errorMessages"
          type="danger"
        />
        <FormMessage
          v-if="props.successMessages"
          class="onyx-form-element__success-message"
          :messages="props.successMessages"
          type="success"
        />
        <FormMessage
          v-if="props.message"
          class="onyx-form-element__message"
          :messages="props.message"
          type="neutral"
        />
      </span>
      <span
        v-if="counter"
        :class="{
          'onyx-form-element__counter': true,
          'onyx-form-element__counter--violated': counter.violated,
        }"
      >
        {{ counter.length }}/{{ counter.maxLength }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-use-optional:not(:has(.onyx-required-marker)) {
  .onyx-form-element__optional {
    display: inline-block;
  }
}

.onyx-form-element {
  @include layers.component() {
    font-family: var(--onyx-font-family);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-3xs);

    &__label {
      display: flex;
      align-items: center;
      max-width: 100%;
      width: 100%;
      color: var(--onyx-color-text-icons-neutral-medium);

      // optional marker should be displayed at the very end of the label
      & .onyx-optional-marker {
        flex-grow: 1;
        text-align: end;
      }
    }

    &__optional {
      display: none;
      font-family: var(--onyx-font-family);
      font-weight: 400;
      font-style: normal;
      color: var(--onyx-color-text-icons-neutral-soft);
      padding-left: var(--onyx-density-xs);
      hyphens: none;
      margin-left: auto;
    }

    $footer-gap: var(--onyx-spacing-2xs);

    &__label-tooltip {
      margin-left: $footer-gap;
    }

    &__footer {
      width: 100%;
      max-width: 100%;
      display: flex;
      justify-content: space-between;

      gap: $footer-gap;
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    &__footer-messages {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    &__counter {
      max-width: fit-content;
    }

    &__counter--violated {
      color: var(--onyx-color-text-icons-danger-intense);
    }

    &__error-message,
    &__error-tooltip {
      display: var(--error-message-display, none);
      color: var(--onyx-color-base-danger-500);
    }

    &__success-message,
    &__success-tooltip {
      display: var(--success-message-display, flex);
      color: var(--onyx-color-base-success-700);
    }

    &__message {
      display: var(--message-display, flex);
    }
  }
}
</style>
