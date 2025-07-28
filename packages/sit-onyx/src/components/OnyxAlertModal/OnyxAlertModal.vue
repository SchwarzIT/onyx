<script lang="ts" setup>
import { iconCircleAttention, iconXSmall } from "@sit-onyx/icons";
import { useId } from "vue";
import { useDensity } from "../../composables/density.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxBasicDialog from "../OnyxBasicDialog/OnyxBasicDialog.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxAlertModalProps } from "./types.js";

const props = withDefaults(defineProps<OnyxAlertModalProps>(), {
  icon: () => ({ icon: iconCircleAttention, color: "danger" }),
});

const emit = defineEmits<{
  /**
   * Emitted when the modal should be closed.
   */
  close: [];
}>();

defineSlots<{
  /**
   * Modal content.
   */
  default(): unknown;
  /**
   * Optional slot to override the headline with custom content.
   * If unset, the `label` property will be shown.
   */
  headline?(bindings: Pick<OnyxAlertModalProps, "label">): unknown;
  /**
   * Slot to display custom actions at the bottom of the modal, e.g. buttons for confirm or cancelling the current user workflow.
   * Focus is automatically set to the first focusable element inside the modal dialog.
   * If this is a button, it should be the least destructive action, to prevent users from accidentally confirming non-reversible actions.
   *
   * If you have to, you can use the `autofocus` button attribute to force the initial focus on another button.
   *
   * @example
   * ```vue
   * <OnyxButton label="Cancel" color="neutral" mode="plain" autofocus />
   * ```
   */
  actions?(): unknown;
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);

const describedById = useId();
</script>

<template>
  <OnyxBasicDialog
    :class="['onyx-alert-modal', densityClass]"
    v-bind="props"
    :aria-describedby="describedById"
    modal
    alert
    @close="emit('close')"
  >
    <div class="onyx-alert-modal__content">
      <OnyxIcon v-if="props.icon" class="onyx-alert-modal__icon" v-bind="props.icon" size="64px" />

      <div>
        <div class="onyx-alert-modal__headline">
          <slot name="headline" :label="props.label">
            <OnyxHeadline is="h2">{{ props.label }}</OnyxHeadline>
          </slot>

          <OnyxSystemButton
            class="onyx-alert-modal__close"
            :label="t('dialog.close')"
            :icon="iconXSmall"
            @click="emit('close')"
          />
        </div>

        <div :id="describedById" class="onyx-alert-modal__body onyx-truncation">
          <slot></slot>
        </div>
      </div>
    </div>

    <div class="onyx-alert-modal__actions">
      <slot name="actions"></slot>
    </div>
  </OnyxBasicDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/breakpoints.scss";

.onyx-alert-modal {
  @include layers.component() {
    --max-width: 26rem;

    &__content {
      max-width: var(--max-width);
      display: flex;
      align-items: center;
      gap: var(--onyx-density-sm);
    }

    &__headline {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--onyx-density-xs);
    }

    &__body {
      margin-top: var(--onyx-density-sm);
      white-space: pre-line;
    }

    &__actions {
      margin-top: var(--onyx-density-md);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--onyx-density-xs);
      max-width: var(--max-width);
    }

    &__icon {
      @include breakpoints.screen(max, md) {
        --icon-size: 3rem;
      }

      @include breakpoints.screen(max, sm) {
        --icon-size: 2rem;
      }
    }
  }
}
</style>
