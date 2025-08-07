<script lang="ts" setup generic="TValue extends string">
import { iconTranslate } from "@sit-onyx/icons";
import { computed, ref } from "vue";
import { injectI18n } from "../../../../i18n/index.js";
import { OnyxSelectDialog } from "../../../../index.js";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import type { OnyxCountryMenuItemProps } from "./types.js";

const props = defineProps<OnyxCountryMenuItemProps<TValue>>();

const emit = defineEmits<{
  "update:modelValue": [value: TValue];
}>();

const { t } = injectI18n();
const isOpen = ref(false);

const currentValueLabel = computed(() => {
  return props.options.find(({ value }) => value === props.modelValue)?.label ?? props.modelValue;
});
</script>

<template>
  <OnyxMenuItem class="onyx-component onyx-language-menu-item" @click="isOpen = true">
    <OnyxIcon :icon="iconTranslate" />

    <div>
      {{ t("languageSelect.label") }}:
      <span class="onyx-language-menu-item__value"> {{ currentValueLabel }} </span>
    </div>

    <!-- the menu button renders a <li> and <button> so we need to teleport the dialog
      to not nest it inside the button -->
    <Teleport to="body">
      <OnyxSelectDialog
        v-model:open="isOpen"
        :model-value="props.modelValue"
        :label="t('languageSelect.headline')"
        :options="props.options"
        @update:model-value="emit('update:modelValue', $event)"
      >
        <template #description>
          {{ t("languageSelect.subtitle") }}
        </template>
      </OnyxSelectDialog>
    </Teleport>
  </OnyxMenuItem>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-language-menu-item {
  @include layers.component() {
    &__value {
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
