<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { injectI18n } from "../../../../i18n";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxDialog from "../../../OnyxDialog/OnyxDialog.vue";
import OnyxHeadline from "../../../OnyxHeadline/OnyxHeadline.vue";
import OnyxVisuallyHidden from "../../../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import autoImage from "./auto.svg?raw";
import darkImage from "./dark.svg?raw";
import lightImage from "./light.svg?raw";
import type { ColorSchemeValue, OnyxColorSchemeDialogProps } from "./types";

const props = withDefaults(defineProps<OnyxColorSchemeDialogProps>(), {
  open: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the color scheme should be changed.
   */
  "update:modelValue": [value: ColorSchemeValue];
  /**
   * Emitted when the dialog should be closed.
   */
  close: [];
}>();

const currentValue = ref<ColorSchemeValue>();
watchEffect(() => (currentValue.value = props.modelValue));

const { t } = injectI18n();

const options = computed(() => {
  return [
    {
      value: "auto",
      image: autoImage,
      label: t.value("colorScheme.auto.label"),
      description: t.value("colorScheme.auto.description"),
    },
    {
      value: "light",
      image: lightImage,
      label: t.value("colorScheme.light.label"),
      description: t.value("colorScheme.light.description"),
    },
    {
      value: "dark",
      image: darkImage,
      label: t.value("colorScheme.dark.label"),
      description: t.value("colorScheme.dark.description"),
    },
  ];
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  currentValue.value = target.value as ColorSchemeValue;
};

const handleApply = () => {
  if (!currentValue.value) return;
  emit("update:modelValue", currentValue.value);
  emit("close");
};
</script>

<template>
  <OnyxDialog
    class="onyx-color-scheme-dialog"
    v-bind="props"
    :label="t('colorScheme.headline')"
    modal
    @close="emit('close')"
  >
    <form class="onyx-color-scheme-dialog__form" @submit.prevent="handleApply">
      <div>
        <OnyxHeadline is="h2"> {{ t("colorScheme.headline") }}</OnyxHeadline>
        <span class="onyx-color-scheme-dialog__subtitle onyx-text">
          {{ t("colorScheme.subtitle") }}
        </span>
      </div>

      <fieldset class="onyx-color-scheme-dialog__list" @change="handleChange">
        <label
          v-for="option in options"
          :key="option.value"
          class="onyx-color-scheme-dialog__option"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <figure class="onyx-color-scheme-dialog__image" v-html="option.image"></figure>

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

            <OnyxHeadline is="h3" class="onyx-color-scheme-dialog__label">
              {{ option.label }}
            </OnyxHeadline>
            <p class="onyx-text--small">{{ option.description }}</p>
          </div>
        </label>
      </fieldset>

      <div class="onyx-color-scheme-dialog__actions">
        <OnyxButton :label="t('cancel')" mode="plain" color="neutral" @click="emit('close')" />
        <OnyxButton :label="t('apply')" type="submit" />
      </div>
    </form>
  </OnyxDialog>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-color-scheme-dialog {
  @include layers.component() {
    --image-size: 10rem;

    width: 32rem;
    background-color: var(--onyx-color-base-background-tinted);

    &__form {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-spacing-md);
    }

    &__subtitle {
      color: var(--onyx-color-text-icons-neutral-medium);
    }

    &__list {
      list-style: none;
      padding: 0;
      container-type: inline-size;

      display: flex;
      flex-direction: column;
      gap: var(--onyx-spacing-md);
      border: none;
    }

    &__option {
      display: flex;
      padding: var(--onyx-spacing-md) var(--onyx-spacing-xl);
      align-items: flex-start;
      gap: var(--onyx-spacing-md);
      align-self: stretch;
      color: var(--onyx-color-text-icons-neutral-medium);
      cursor: pointer;
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      background-color: var(--onyx-color-base-background-blank);
      border-radius: var(--onyx-radius-md);

      @container (max-width: 24rem) {
        flex-direction: column;
        --image-size: 6rem;
      }

      &:hover {
        background: var(--onyx-color-base-background-tinted);
      }

      &:has(input:checked) {
        border-color: var(--onyx-color-base-primary-200);
        background-color: var(--onyx-color-base-primary-100);

        &:hover {
          border-color: var(--onyx-color-base-primary-500);
        }

        .onyx-color-scheme-dialog__label {
          color: var(--onyx-color-text-icons-primary-intense);
        }
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--onyx-spacing-md);
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
