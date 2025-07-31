<script lang="ts" setup>
import { iconCircleContrast } from "@sit-onyx/icons";
import { ref } from "vue";
import { injectI18n } from "../../../../i18n/index.js";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxColorSchemeDialog from "../OnyxColorSchemeDialog/OnyxColorSchemeDialog.vue";
import type { ColorSchemeValue } from "../OnyxColorSchemeDialog/types.js";
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import type { OnyxColorSchemeMenuItemProps } from "./types.js";

const props = defineProps<OnyxColorSchemeMenuItemProps>();

const emit = defineEmits<{
  "update:modelValue": [value: ColorSchemeValue];
}>();

const { t } = injectI18n();

const isOpen = ref(false);
</script>

<template>
  <OnyxMenuItem class="onyx-component onyx-color-scheme-menu-item" @click="isOpen = true">
    <OnyxIcon :icon="iconCircleContrast" />

    <div>
      {{ t("colorScheme.appearance") }}:
      <span class="onyx-color-scheme-menu-item__value">
        {{ t(`colorScheme.${props.modelValue}.label`) }}
      </span>
    </div>

    <!-- the menu button renders a <li> and <button> so we need to teleport the dialog
      to not nest it inside the button -->
    <Teleport to="body">
      <OnyxColorSchemeDialog
        :model-value="props.modelValue"
        :open="isOpen"
        @close="isOpen = false"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </Teleport>
  </OnyxMenuItem>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-color-scheme-menu-item {
  @include layers.component() {
    &__value {
      color: var(--onyx-color-text-icons-neutral-soft);
    }

    .onyx-color-scheme-dialog {
      text-align: left;
    }
  }
}
</style>
