<script lang="ts" setup>
import { computed } from "vue";
import { useRequired } from "../../composables/required";
import { injectI18n } from "../../i18n";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import type { OnyxFormElementProps } from "./types";

const props = withDefaults(defineProps<OnyxFormElementProps>(), {
  required: false,
});

const { t } = injectI18n();

const { requiredMarkerClass, requiredTypeClass } = useRequired(props);

const counterText = computed(() => {
  if (props.withCounter && props.maxlength) {
    const text = props.modelValue?.toString() || "";
    return `${text.length}/${props.maxlength}`;
  }
  return undefined;
});

defineSlots<{
  /** The place for the actual form element */
  default(): unknown;
}>();
</script>

<template>
  <div :class="['onyx-form-element', requiredTypeClass]">
    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
    <label>
      <div
        v-if="!props.hideLabel"
        class="onyx-form-element__label onyx-text--small"
        :class="[!props.required ? requiredMarkerClass : undefined]"
      >
        <div class="onyx-form-element__header">
          <span class="onyx-truncation-ellipsis">{{ props.label }}</span>
          <span
            v-if="props.required"
            :class="[props.required ? requiredMarkerClass : undefined]"
          ></span>
          <OnyxInfoTooltip
            v-if="props.labelTooltip"
            class="onyx-form-element__label-tooltip"
            :text="props.labelTooltip"
          />
          <span v-if="!props.required" class="onyx-form-element__optional">{{
            t("optional")
          }}</span>
        </div>
      </div>

      <slot></slot>
    </label>

    <div
      v-if="props.message || errorMessages?.shortMessage || counterText"
      class="onyx-form-element__footer onyx-text--small"
    >
      <span v-if="errorMessages" class="onyx-form-element__error-message onyx-truncation-ellipsis">
        {{ errorMessages.shortMessage }}
      </span>
      <OnyxInfoTooltip
        v-if="errorMessages?.longMessage"
        class="onyx-form-element__error-tooltip"
        color="danger"
        position="bottom"
        :label="t('showTooltip.error')"
        :text="errorMessages.longMessage"
      />

      <span v-if="props.message" class="onyx-form-element__message onyx-truncation-ellipsis">
        {{ props.message }}
      </span>
      <OnyxInfoTooltip
        v-if="props.messageTooltip"
        class="onyx-form-element__message-tooltip"
        position="bottom"
        :text="props.messageTooltip"
      />
      <span v-if="counterText" class="onyx-form-element__counter">
        {{ counterText }}
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
    /**
     * input.scss will overwrite this to only be visible
     * after the user interacted with the component.
     * can also be overwritten if a project
     * needs to enforce to show an error immediately
     */
    --error-message-display: block;
    /** input.scss will overwrite this so that
     * message and error message are not be shown simultaneously
     */
    --message-display: block;

    font-family: var(--onyx-font-family);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-5xs);

    &__label {
      display: flex;
      margin-bottom: var(--onyx-spacing-5xs);
      color: var(--onyx-color-text-icons-neutral-medium);

      // optional marker should be displayed at the very end of the label
      &.onyx-optional-marker {
        justify-content: space-between;

        &::after {
          display: none;
        }
      }
    }

    &__optional {
      display: none;
      font-family: var(--onyx-font-family);
      font-weight: 400;
      font-style: normal;
      color: var(--onyx-color-text-icons-neutral-soft);
      padding-left: var(--onyx-spacing-2xs);
      hyphens: none;
      margin-left: auto;
    }

    &__header {
      display: flex;
      align-items: center;
      max-width: 100%;
      width: 100%;
    }

    &__label-tooltip,
    &__message-tooltip,
    &__error-tooltip {
      margin-left: var(--onyx-spacing-2xs);
    }

    &__footer {
      width: 100%;
      display: flex;
      align-items: center;
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    &__counter {
      text-align: right;
      flex-grow: 1;
      margin-left: var(--onyx-spacing-2xs);
    }

    &__error-message,
    &__error-tooltip {
      display: var(--error-message-display);
      color: var(--onyx-color-base-danger-500);
    }

    &__message,
    &__message-tooltip {
      display: var(--message-display);
    }
  }
}
</style>
