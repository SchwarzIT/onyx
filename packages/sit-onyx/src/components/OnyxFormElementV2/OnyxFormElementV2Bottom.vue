<script lang="ts" setup>
import { computed } from "vue";
import { useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import type { FormElementV2Message, OnyxFormElementV2Props } from "./types.js";

const props = defineProps<OnyxFormElementV2Props>();

const slots = defineSlots<{
  bottomRight?(): unknown;
}>();

const { reserveMessageSpace } = useFormContext(props);

const message = computed<FormElementV2Message | undefined>(() => {
  if (!props.message) return;
  if (typeof props.message === "object") return props.message;
  return { label: props.message };
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
        {
          [`onyx-form-element-v2__message--${message.color}`]:
            message.color && message.color !== 'neutral',
        },
      ]"
    >
      <!-- TODO: implement different colors -->
      <span>{{ message.label }}</span>

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
    &__bottom {
      color: var(--onyx-color-text-icons-neutral-soft);
      height: 1lh;
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
