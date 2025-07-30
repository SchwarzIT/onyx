<script lang="ts" setup>
import { iconXSmall } from "@sit-onyx/icons";
import { useId } from "vue";
import { useDensity } from "../../composables/density.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxDialog from "../OnyxDialog/OnyxDialog.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxAlertDialogProps } from "./types.js";

const props = defineProps<OnyxAlertDialogProps>();

const emit = defineEmits<{
  /**
   * Emitted when the dialog should be closed.
   */
  close: [];
}>();

defineSlots<{
  /**
   * Dialog content.
   */
  default(): unknown;
  /**
   * Optional slot to override the headline with custom content.
   * If unset, the `label` property will be shown.
   */
  headline?(bindings: Pick<OnyxAlertDialogProps, "label">): unknown;
  /**
   * Slot to display custom actions at the bottom of the dialog, e.g. buttons for confirm or cancelling the current user workflow.
   * For accessibility purposes it is recommended to set autofocus on one button, preferably the "cancel" button if one exists.
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
  <OnyxDialog
    :class="['onyx-alert-dialog', densityClass]"
    v-bind="props"
    :aria-describedby="describedById"
    modal
    alert
    @close="emit('close')"
  >
    <div class="onyx-alert-dialog__content">
      <OnyxIcon v-if="props.icon" class="onyx-alert-dialog__icon" v-bind="props.icon" size="64px" />

      <div>
        <div class="onyx-alert-dialog__headline">
          <slot name="headline" :label="props.label">
            <OnyxHeadline is="h2">{{ props.label }}</OnyxHeadline>
          </slot>

          <OnyxSystemButton
            class="onyx-alert-dialog__close"
            :label="t('dialog.close')"
            :icon="iconXSmall"
            @click="emit('close')"
          />
        </div>

        <div :id="describedById" class="onyx-alert-dialog__body onyx-truncation">
          <slot></slot>
        </div>
      </div>
    </div>

    <div class="onyx-alert-dialog__actions">
      <slot name="actions"></slot>
    </div>
  </OnyxDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/breakpoints.scss";

.onyx-alert-dialog {
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
