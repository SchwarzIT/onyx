<script lang="ts" setup>
import { iconChevronDownSmall } from "@sit-onyx/icons";
import { OnyxFlyoutMenu, OnyxIcon, OnyxMenuItem } from "sit-onyx";
import { computed } from "vue";
import OnyxEditorToolbarAction from "../OnyxEditorToolbarAction/OnyxEditorToolbarAction.vue";
import type { OnyxEditorToolbarFlyoutProps } from "./types.js";

const props = defineProps<OnyxEditorToolbarFlyoutProps>();

const activeOption = computed(() => props.options.find((option) => option.active));
const icon = computed(() => activeOption.value?.icon ?? props.icon);
</script>

<template>
  <OnyxFlyoutMenu :label="props.label">
    <template #button="{ trigger }">
      <OnyxEditorToolbarAction v-bind="trigger" :label="props.label" :icon :active="!!activeOption">
        <OnyxIcon :icon />
        <OnyxIcon class="onyx-editor-toolbar-flyout__chevron" :icon="iconChevronDownSmall" />
      </OnyxEditorToolbarAction>
    </template>

    <template #options>
      <OnyxMenuItem
        v-for="option in props.options"
        :key="option.label"
        :active="option.active"
        @click="option.onClick?.()"
      >
        <OnyxIcon v-if="option.icon" class="onyx-editor-toolbar-flyout__icon" :icon="option.icon" />
        {{ option.label }}
      </OnyxMenuItem>
    </template>
  </OnyxFlyoutMenu>
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-editor-toolbar-flyout {
  @include layers.override() {
    &__chevron {
      --icon-size: 0.75rem;
    }

    &__icon {
      color: var(--onyx-color-text-icons-neutral-medium);
    }
  }
}
</style>
