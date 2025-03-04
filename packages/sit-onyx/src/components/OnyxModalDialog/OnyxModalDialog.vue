<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed, useId } from "vue";
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

      <div
        v-if="hasDescription"
        :id="descriptionId"
        class="onyx-modal-dialog__description onyx-text--small"
      >
        <slot name="description"></slot>
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
      position: sticky;
      top: 0;
      background-color: var(--onyx-color-base-background-blank);

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

    &__description {
      color: var(--onyx-color-text-icons-neutral-soft);
      white-space: pre-line;
    }
  }
}
</style>
