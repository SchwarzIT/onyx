<script lang="ts" setup>
import { computed } from "vue";
import { useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import type { OnyxInfoTooltipProps } from "../OnyxInfoTooltip/types.js";
import type { FormElementV2Tooltip, OnyxFormElementV2Props } from "./types.js";

const props = defineProps<OnyxFormElementV2Props>();

const slots = defineSlots<{
  bottomRight?(): unknown;
}>();

const { reserveMessageSpace } = useFormContext(props);

const normalizeMessage = (
  color: OnyxInfoTooltipProps["color"],
  message?: string | FormElementV2Tooltip,
) => {
  if (!message) return;
  if (typeof message === "object") return { ...message, color };
  return { label: message, color };
};

const message = computed(() => {
  return (
    normalizeMessage("danger", props.error) ??
    normalizeMessage("success", props.success) ??
    normalizeMessage("neutral", props.message)
  );
});
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
    <div
      v-if="message"
      :class="[
        'onyx-form-element-v2__message',
        'onyx-truncation-ellipsis',
        {
          [`onyx-form-element-v2__message--${message.color}`]:
            message.color && message.color !== 'neutral',
        },
      ]"
    >
      <span class="onyx-truncation-ellipsis">{{ message.label }}</span>

      <OnyxInfoTooltip
        v-if="message.tooltipText"
        class="onyx-form-element-v2__tooltip"
        trigger="hover"
        :text="message.tooltipText"
        :color="message.color"
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

      &--danger {
        color: var(--onyx-color-text-icons-danger-intense);
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
