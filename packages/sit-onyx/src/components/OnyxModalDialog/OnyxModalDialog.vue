<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { useDensity } from "../../composables/density";
import { injectI18n } from "../../i18n";
import OnyxDialog from "../OnyxDialog/OnyxDialog.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxModalDialogProps } from "./types";

const props = defineProps<OnyxModalDialogProps>();

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
   */
  headline?(bindings: Pick<OnyxModalDialogProps, "label">): unknown;
  /**
   * Optional slot to add custom content to the dialog header (below the headline).
   */
  subtitle?(): unknown;
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);
</script>

<template>
  <OnyxDialog
    v-bind="props"
    :class="['onyx-modal-dialog', densityClass]"
    modal
    @close="emit('close')"
  >
    <div class="onyx-modal-dialog__header">
      <div class="onyx-modal-dialog__headline">
        <slot name="headline" :label="props.label">
          <OnyxHeadline is="h2">{{ props.label }}</OnyxHeadline>
        </slot>

        <OnyxSystemButton
          class="onyx-alert-dialog__close"
          :label="t('dialog.close')"
          :icon="xSmall"
          @click="emit('close')"
        />
      </div>

      <div class="onyx-modal-dialog__subtitle onyx-text--small">
        <slot name="subtitle"></slot>
      </div>
    </div>

    <slot></slot>
  </OnyxDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-modal-dialog {
  @include layers.component() {
    --onyx-modal-dialog-padding-inline: var(--onyx-density-lg);

    padding: 0;

    &__header {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-2xs);
      padding: var(--onyx-density-sm) var(--onyx-modal-dialog-padding-inline);
      border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    }

    &__headline {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--onyx-density-xs);
    }

    &__subtitle {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
