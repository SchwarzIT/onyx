<script lang="ts" setup generic="TValue extends string">
import { ref, useId, watchEffect } from "vue";
import { injectI18n } from "../../i18n/index.js";
import type { Nullable } from "../../types/index.js";
import OnyxBottomBar from "../OnyxBottomBar/OnyxBottomBar.vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxCard from "../OnyxCard/OnyxCard.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxModal from "../OnyxModal/OnyxModal.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxSelectDialogProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSelectDialogProps<TValue>>(), {
  open: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the color scheme should be changed.
   */
  "update:modelValue": [value: TValue];
  "update:open": [open: Nullable<boolean>];
}>();

const slots = defineSlots<{
  /**
   * Optional slot to add custom content, e.g. a description to the dialog header (below the headline).
   */
  description?(): unknown;
}>();

const currentValue = ref<TValue>();
watchEffect(() => (currentValue.value = props.modelValue));

const { t } = injectI18n();
const formId = useId();

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  currentValue.value = target.value as TValue;
};

const handleApply = () => {
  if (!currentValue.value) return;
  emit("update:modelValue", currentValue.value);
  emit("update:open", false);
};
</script>

<template>
  <OnyxModal
    v-bind="props"
    :open="props.open"
    class="onyx-select-dialog"
    :label="props.label"
    @update:open="emit('update:open', $event)"
  >
    <template v-if="!!slots.description" #description>
      <slot name="description"></slot>
    </template>

    <form :id="formId" class="onyx-select-dialog__form" @submit.prevent="handleApply">
      <fieldset class="onyx-select-dialog__list" @change="handleChange">
        <label v-for="option in props.options" :key="option.value">
          <OnyxCard class="onyx-select-dialog__option">
            <OnyxIcon v-if="option.icon" :icon="option.icon" class="onyx-select-dialog__icon" />

            <div>
              <OnyxVisuallyHidden is="div">
                <input
                  type="radio"
                  name="color-scheme"
                  :autofocus="props.modelValue === option.value"
                  :value="option.value"
                  :checked="props.modelValue === option.value"
                  :aria-label="option.label"
                  required
                />
              </OnyxVisuallyHidden>

              <span class="onyx-select-dialog__label"> {{ option.label }} </span>
              <p v-if="option.description" class="onyx-text--small">{{ option.description }}</p>
            </div>
          </OnyxCard>
        </label>
      </fieldset>
    </form>

    <template #footer>
      <OnyxBottomBar>
        <OnyxButton
          :label="t('cancel')"
          mode="plain"
          color="neutral"
          @click="emit('update:open', false)"
        />
        <OnyxButton :label="t('apply')" type="submit" :form="formId" />
      </OnyxBottomBar>
    </template>
  </OnyxModal>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-select-dialog {
  @include layers.component() {
    --onyx-select-dialog-icon-size: 1.5rem;
    --onyx-select-dialog-gap: var(--onyx-density-md);
    width: 32rem;
    background-color: var(--onyx-color-base-background-tinted);

    &__form {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-xs);
      padding: var(--onyx-select-dialog-gap) var(--onyx-modal-padding-inline);
    }

    &__list {
      list-style: none;
      padding: 0;
      display: contents;
    }

    &__label {
      font-weight: 600;
      font-size: var(--onyx-font-size-md);
      line-height: var(--onyx-font-line-height-md);
      color: var(--onyx-color-text-icons-neutral-intense);
    }

    &__option {
      --onyx-card-gap: var(--onyx-select-dialog-gap);
      flex-direction: row;
      align-items: center;
      color: var(--onyx-color-text-icons-neutral-medium);
      cursor: pointer;

      &:hover {
        background: var(--onyx-color-base-neutral-200);
      }

      &:has(input:checked) {
        border-color: var(--onyx-color-base-primary-200);
        background-color: var(--onyx-color-base-primary-100);

        &:hover {
          border-color: var(--onyx-color-component-border-primary);
        }

        .onyx-select-dialog__label,
        .onyx-select-dialog__icon {
          color: var(--onyx-color-text-icons-primary-intense);
        }
      }
    }

    &__icon {
      --icon-size: var(--onyx-select-dialog-icon-size);
      display: inline-flex;
      height: auto;
    }
  }
}
</style>
