<script lang="ts" setup>
import { iconXSmall } from "@sit-onyx/icons";
import { useDensity } from "../../composables/density.js";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable } from "../../types/index.js";
import OnyxBasicDialog from "../OnyxBasicDialog/OnyxBasicDialog.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxDialogProps } from "./types.js";

const props = defineProps<OnyxDialogProps>();

const emit = defineEmits<{
  /**
   * Emitted when the dialog should be closed.
   * Opening is always controlled via the `open` prop.
   */
  "update:open": [open: Nullable<boolean>];
}>();

const slots = defineSlots<{
  /**
   * Dialog content.
   */
  default(): unknown;
  /**
   * Optional slot to override the headline with custom content.
   * If unset, the `label` property will be shown.
   */
  headline?(bindings: Pick<OnyxDialogProps, "label">): unknown;
  /**
   * Optional footer slot to e.g. show action buttons (see OnyxBottomBar component).
   */
  footer?(): unknown;
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);
</script>

<template>
  <OnyxBasicDialog
    v-bind="props"
    :class="['onyx-dialog', densityClass]"
    @update:open="emit('update:open', $event)"
  >
    <div class="onyx-dialog__header">
      <div class="onyx-dialog__headline">
        <div class="onyx-dialog__headline-content">
          <slot name="headline" :label="props.label">
            <OnyxHeadline is="h2">{{ props.label }}</OnyxHeadline>
          </slot>
        </div>

        <OnyxSystemButton
          v-if="!props.nonDismissible"
          class="onyx-alert-dialog__close"
          :label="t('dialog.close')"
          :icon="iconXSmall"
          @click="emit('update:open', false)"
        />
      </div>
    </div>

    <div class="onyx-dialog__body">
      <slot></slot>
    </div>

    <div v-if="!!slots.footer" class="onyx-dialog__footer">
      <slot name="footer"></slot>
    </div>
  </OnyxBasicDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-dialog {
  @include layers.component() {
    --onyx-dialog-padding-inline: var(--onyx-density-md);
    --onyx-basic-dialog-padding: 0;
    display: flex;
    border: none;
    box-shadow: var(--onyx-shadow-medium-bottom);

    .onyx-basic-dialog__content {
      display: flex;
      flex-direction: column;
    }

    &__header {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-2xs);
      padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);
    }

    &__headline {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--onyx-density-sm);
    }

    &__headline-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: inherit;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }

    &__body {
      overflow: auto;
      flex-grow: 1;
    }
  }
}
.dark .onyx-dialog {
  outline: var(--onyx-spacing-5xs) solid var(--onyx-color-component-border-neutral);
}
</style>
