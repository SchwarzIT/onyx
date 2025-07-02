<script lang="ts" setup>
import { computed } from "vue";
import { injectI18n } from "../../../../i18n/index.js";
import OnyxSelectDialog from "../../../OnyxSelectDialog/OnyxSelectDialog.vue";
import type { SelectDialogOption } from "../../../OnyxSelectDialog/types.js";
import autoImage from "./auto.svg?raw";
import darkImage from "./dark.svg?raw";
import lightImage from "./light.svg?raw";
import type { ColorSchemeValue, OnyxColorSchemeDialogProps } from "./types.js";

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

const { t } = injectI18n();

const options = computed<SelectDialogOption<ColorSchemeValue>[]>(() => {
  return [
    {
      value: "auto",
      icon: autoImage,
      label: t.value("colorScheme.auto.label"),
      description: t.value("colorScheme.auto.description"),
    },
    {
      value: "light",
      icon: lightImage,
      label: t.value("colorScheme.light.label"),
      description: t.value("colorScheme.light.description"),
    },
    {
      value: "dark",
      icon: darkImage,
      label: t.value("colorScheme.dark.label"),
      description: t.value("colorScheme.dark.description"),
    },
  ];
});
</script>

<template>
  <OnyxSelectDialog
    class="onyx-color-scheme-dialog"
    v-bind="props"
    :label="t('colorScheme.headline')"
    :options
    @close="emit('close')"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <template #description> {{ t("colorScheme.subtitle") }} </template>
  </OnyxSelectDialog>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-color-scheme-dialog {
  @include layers.component() {
    --onyx-select-dialog-icon-size: 10rem;

    .onyx-select-dialog {
      &__form {
        container-type: inline-size;
      }

      &__option {
        align-items: flex-start;

        @container (max-width: 24rem) {
          --onyx-select-dialog-icon-size: 6rem;
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }
  }
}
</style>
