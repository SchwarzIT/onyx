<script lang="ts" setup>
import { iconXSmall } from "@sit-onyx/icons";
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable } from "../../types/index.js";
import OnyxBasicPopover from "../OnyxBasicPopover/OnyxBasicPopover.vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
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
   * The trigger for the dialog. Should be an interactive component like a button or link.
   */
  trigger?(params: {
    /**
     * Attributes and event listeners that must be bound to an interactive element (button or link), that should act as the flyout trigger.
     */
    trigger: object;
  }): unknown;
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

/**
 * If the flyout is expanded or not.
 */
const isExpanded = useVModel({
  props,
  emit,
  key: "open",
  default: false,
});

const triggerBindings = computed(() => ({
  onClick: () => (isExpanded.value = !isExpanded.value),
  "aria-expanded": isExpanded.value,
  "aria-haspopup": "dialog",
}));
</script>

<template>
  <OnyxBasicPopover
    :class="['onyx-dialog', densityClass]"
    :open="isExpanded"
    :label="props.label"
    :position="props.position"
    :alignment="props.alignment"
    @update:open="emit('update:open', $event)"
  >
    <template #default>
      <slot name="trigger" :trigger="triggerBindings">
        <OnyxButton
          :label="props.buttonText ? props.buttonText : props.label"
          v-bind="triggerBindings"
        />
      </slot>
    </template>
    <template #content>
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
            @click="() => (isExpanded = !isExpanded)"
          />
        </div>
      </div>

      <div class="onyx-dialog__body">
        <slot></slot>
      </div>

      <div v-if="!!slots.footer" class="onyx-dialog__footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </OnyxBasicPopover>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-dialog {
  @include layers.component() {
    --onyx-dialog-padding-inline: var(--onyx-density-md);
    --onyx-basic-dialog-padding: 0;
    width: fit-content;
    .onyx-basic-popover__dialog {
      --onyx-basic-popover-max-width: calc(100% - 2 * (var(--onyx-density-md)));
    }

    .onyx-basic-dialog__content {
      display: flex;
      flex-direction: column;
    }

    &__header {
      display: flex;
      flex-direction: column;
      width: 100%;
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
      width: 100%;
      overflow: hidden;
      justify-content: center;
    }

    &__body {
      overflow: auto;
      flex-grow: 1;
    }
    &__footer {
      width: 100%;
    }
  }
}
.dark .onyx-dialog {
  outline: var(--onyx-spacing-5xs) solid var(--onyx-color-component-border-neutral);
}
</style>
