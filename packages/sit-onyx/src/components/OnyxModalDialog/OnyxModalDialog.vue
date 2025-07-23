<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed, useId } from "vue";
import { useDensity } from "../../composables/density.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxDialog from "../OnyxDialog/OnyxDialog.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxModalDialogProps } from "./types.js";

const props = defineProps<OnyxModalDialogProps>();

const emit = defineEmits<{
  /**
   * Emitted when the dialog should be closed.
   */
  close: [];
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
  headline?(bindings: Pick<OnyxModalDialogProps, "label">): unknown;
  /**
   * Optional slot to add custom content, e.g. a description to the dialog header (below the headline).
   */
  description?(): unknown;
  /**
   * Optional footer slot to e.g. show action buttons (see OnyxBottomBar component).
   */
  footer?(): unknown;
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);

const descriptionId = useId();
const hasDescription = computed(() => !!slots.description);
</script>

<template>
  <OnyxDialog
    v-bind="props"
    :class="['onyx-modal-dialog', densityClass]"
    :aria-describedby="hasDescription ? descriptionId : undefined"
    modal
    @close="emit('close')"
  >
    <div class="onyx-modal-dialog__header">
      <div class="onyx-modal-dialog__headline">
        <div class="onyx-modal-dialog__headline-content">
          <slot name="headline" :label="props.label">
            <OnyxHeadline is="h2">{{ props.label }}</OnyxHeadline>
          </slot>
        </div>

        <OnyxSystemButton
          class="onyx-alert-dialog__close"
          :label="t('dialog.close')"
          :icon="xSmall"
          @click="emit('close')"
        />
      </div>

      <div
        v-if="hasDescription"
        :id="descriptionId"
        class="onyx-modal-dialog__description onyx-text--small"
      >
        <slot name="description"></slot>
      </div>
    </div>

    <div class="onyx-modal-dialog__body">
      <slot></slot>
    </div>

    <div v-if="!!slots.footer" class="onyx-modal-dialog__footer">
      <slot name="footer"></slot>
    </div>
  </OnyxDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-modal-dialog {
  @include layers.component() {
    --onyx-modal-dialog-padding-inline: var(--onyx-density-lg);
    --onyx-dialog-padding: 0;
    display: flex;

    .onyx-dialog__content {
      display: flex;
      flex-direction: column;
    }

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
      gap: var(--onyx-density-sm);
    }

    &__headline-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: inherit;
    }

    &__body {
      overflow: auto;
      flex-grow: 1;
    }

    &__description {
      color: var(--onyx-color-text-icons-neutral-soft);
      white-space: pre-line;
    }
  }
}
</style>
