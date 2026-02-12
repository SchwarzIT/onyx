<script lang="ts" setup>
import { iconChevronDownSmall } from "@sit-onyx/icons";
import { OnyxFlyoutMenu, OnyxIcon, OnyxMenuItem } from "sit-onyx";
import { computed, useTemplateRef } from "vue";
import OnyxEditorToolbarAction from "../OnyxEditorToolbarAction/OnyxEditorToolbarAction.vue";
import type { OnyxEditorToolbarFlyoutProps } from "./types.js";

const props = defineProps<OnyxEditorToolbarFlyoutProps>();

const hasActiveOption = computed(() => props.options.some((option) => option.active));

const action = useTemplateRef("actionRef");
</script>

<template>
  <OnyxFlyoutMenu :label="props.label">
    <template #button="{ trigger }">
      <OnyxEditorToolbarAction
        ref="actionRef"
        v-bind="trigger"
        :label="props.label"
        :icon="props.icon"
        :active="hasActiveOption"
      />

      <Teleport :to="action?.button?.$el" :disabled="!action?.button?.$el" defer>
        <OnyxIcon class="onyx-editor-toolbar-flyout__chevron" :icon="iconChevronDownSmall" />
      </Teleport>
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
