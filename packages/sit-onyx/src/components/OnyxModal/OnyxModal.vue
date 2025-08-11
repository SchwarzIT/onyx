<script lang="ts" setup>
import { iconXSmall } from "@sit-onyx/icons";
import { computed, useId } from "vue";
import { useDensity } from "../../composables/density.js";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable } from "../../types/index.js";
import OnyxBasicDialog from "../OnyxBasicDialog/OnyxBasicDialog.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxModalProps } from "./types.js";

const props = defineProps<OnyxModalProps>();

const emit = defineEmits<{
  /**
   * Emitted when the modal dialog should be closed.
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
  headline?(bindings: Pick<OnyxModalProps, "label">): unknown;
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
  <OnyxBasicDialog
    v-bind="props"
    modal
    :class="['onyx-modal', densityClass]"
    :aria-describedby="hasDescription ? descriptionId : undefined"
    @update:open="emit('update:open', $event)"
  >
    <div class="onyx-modal__header">
      <div class="onyx-modal__headline">
        <div class="onyx-modal__headline-content">
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

      <div
        v-if="hasDescription"
        :id="descriptionId"
        class="onyx-modal__description onyx-text--small"
      >
        <slot name="description"></slot>
      </div>
    </div>

    <div class="onyx-modal__body">
      <slot></slot>
    </div>

    <div v-if="!!slots.footer" class="onyx-modal__footer">
      <slot name="footer"></slot>
    </div>
  </OnyxBasicDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-modal {
  @include layers.component() {
    --onyx-modal-padding-inline: var(--onyx-density-lg);
    --onyx-basic-dialog-padding: 0;
    display: flex;

    .onyx-basic-dialog__content {
      display: flex;
      flex-direction: column;
    }

    &__header {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-2xs);
      padding: var(--onyx-density-sm) var(--onyx-modal-padding-inline);
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
