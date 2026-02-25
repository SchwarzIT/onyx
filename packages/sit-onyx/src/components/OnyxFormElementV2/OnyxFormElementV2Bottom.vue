<script lang="ts" setup>
import { computed } from "vue";
import { useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import type { OnyxInfoTooltipProps } from "../OnyxInfoTooltip/types.js";
import type { FormElementV2Tooltip, OnyxFormElementV2Props } from "./types.js";

type NormalizedMessage = FormElementV2Tooltip & { color: OnyxInfoTooltipProps["color"] };

const props = defineProps<OnyxFormElementV2Props>();

const slots = defineSlots<{
  bottomRight?(): unknown;
}>();

const { reserveMessageSpace } = useFormContext(props);

const normalizeMessage = (
  color: OnyxInfoTooltipProps["color"],
  message?: string | FormElementV2Tooltip,
): NormalizedMessage | undefined => {
  if (!message) return;
  const _message = typeof message === "object" ? { ...message } : { label: message };

  return {
    ..._message,
    color,
    // if tooltipText is unset, use the message label so the tooltip is always shown (so the full text is readable even if label is truncated)
    tooltipText: _message.tooltipText ?? _message.label,
  };
};

const messages = computed(() =>
  [
    normalizeMessage("danger", props.error),
    normalizeMessage("success", props.success),
    normalizeMessage("neutral", props.message),
  ].filter((message) => message != undefined),
);
</script>

<template>
  <div
    :class="[
      'onyx-component',
      'onyx-form-element-v2__bottom',
      'onyx-text--small',
      { 'onyx-form-element-v2__bottom--reserve-empty': reserveMessageSpace },
    ]"
  >
    <!-- for accessibility / screen readers we always render all messages but visually only show the first / most important one -->
    <div
      v-for="msg in messages"
      :key="msg.color"
      :class="[
        'onyx-form-element-v2__message',
        'onyx-truncation-ellipsis',
        {
          [`onyx-form-element-v2__message--${msg.color}`]: msg.color,
        },
      ]"
    >
      <span class="onyx-truncation-ellipsis">{{ msg.label }}</span>

      <OnyxInfoTooltip
        v-if="msg.tooltipText"
        class="onyx-form-element-v2__tooltip"
        trigger="hover"
        :text="msg.tooltipText"
        :color="msg.color"
      />
    </div>

    <div v-if="slots.bottomRight" class="onyx-form-element-v2__bottom-right">
      <slot name="bottomRight"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-form-element-v2 {
  @include layers.component() {
    --onyx-form-element-v2-bottom-height: 1lh;

    &__bottom {
      color: var(--onyx-color-text-icons-neutral-soft);
      height: var(--onyx-form-element-v2-bottom-height);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--onyx-spacing-2xs);

      &:empty:not(&--reserve-empty) {
        display: none;
      }
    }

    &__message {
      display: flex;

      &:not(&--danger) {
        // hide all other messages if error message is shown
        @container style(--onyx-form-element-v2-show-error: true) {
          display: none;
        }
      }

      // ensure always at most one non-danger (error) message is shown
      // so e.g. neutral is hidden when success is shown
      &:not(&--danger) ~ &:not(&--danger) {
        display: none;
      }

      &--danger {
        display: none;
        color: var(--onyx-color-text-icons-danger-intense);

        @container style(--onyx-form-element-v2-show-error: true) {
          display: flex;
        }
      }

      &--success {
        color: var(--onyx-color-text-icons-success-intense);
      }
    }

    &__bottom-right {
      flex-grow: 1;
      justify-content: flex-end;
      display: flex;
    }
  }
}
</style>
