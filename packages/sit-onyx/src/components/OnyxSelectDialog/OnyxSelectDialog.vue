<script lang="ts" setup generic="TValue extends string">
import { ref, watchEffect } from "vue";
import { injectI18n } from "../../i18n";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxCard from "../OnyxCard/OnyxCard.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxModalDialog from "../OnyxModalDialog/OnyxModalDialog.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxSelectDialogProps } from "./types";

const props = withDefaults(defineProps<OnyxSelectDialogProps<TValue>>(), {
  open: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the color scheme should be changed.
   */
  "update:modelValue": [value: TValue];
  /**
   * Emitted when the dialog should be closed.
   */
  close: [];
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

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  currentValue.value = target.value as TValue;
};

const handleApply = () => {
  if (!currentValue.value) return;
  emit("update:modelValue", currentValue.value);
  emit("close");
};
</script>

<template>
  <OnyxModalDialog
    v-bind="props"
    class="onyx-select-dialog"
    :label="props.label"
    @close="emit('close')"
  >
    <template v-if="!!slots.description" #description>
      <slot name="description"></slot>
    </template>

    <form class="onyx-select-dialog__form" @submit.prevent="handleApply">
      <fieldset class="onyx-select-dialog__list" @change="handleChange">
        <label v-for="option in props.options" :key="option.value">
          <OnyxCard class="onyx-select-dialog__option">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <figure
              v-if="option.image"
              class="onyx-select-dialog__image"
              v-html="option.image"
            ></figure>

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

              <OnyxHeadline is="h3" class="onyx-select-dialog__label">
                {{ option.label }}
              </OnyxHeadline>

              <p v-if="option.description" class="onyx-text--small">{{ option.description }}</p>
            </div>
          </OnyxCard>
        </label>
      </fieldset>

      <div class="onyx-select-dialog__actions">
        <OnyxButton :label="t('cancel')" mode="plain" color="neutral" @click="emit('close')" />
        <OnyxButton :label="t('apply')" type="submit" />
      </div>
    </form>
  </OnyxModalDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-select-dialog {
  @include layers.component() {
    --image-size: 10rem;
    --gap: var(--onyx-density-md);
    width: 32rem;
    background-color: var(--onyx-color-base-background-tinted);

    &__form {
      display: flex;
      flex-direction: column;
      gap: var(--gap);
      padding: var(--gap) var(--onyx-modal-dialog-padding-inline);
      container-type: inline-size;
    }

    &__list {
      list-style: none;
      padding: 0;

      display: contents;
    }

    &__option {
      --onyx-card-gap: var(--gap);
      flex-direction: row;
      color: var(--onyx-color-text-icons-neutral-medium);
      cursor: pointer;

      @container (max-width: 24rem) {
        flex-direction: column;
        --image-size: 6rem;
      }

      &:hover {
        background: var(--onyx-color-base-neutral-200);
      }

      &:has(input:checked) {
        border-color: var(--onyx-color-base-primary-200);
        background-color: var(--onyx-color-base-primary-100);

        &:hover {
          border-color: var(--onyx-color-component-border-primary);
        }

        .onyx-select-dialog__label {
          color: var(--onyx-color-text-icons-primary-intense);
        }
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--gap);
    }

    &__image {
      display: inline-flex;

      svg {
        width: var(--image-size);
        height: auto;
      }
    }
  }
}
</style>
