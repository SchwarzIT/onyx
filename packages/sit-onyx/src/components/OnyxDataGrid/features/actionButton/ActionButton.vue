<script setup lang="ts">
import { useMoreListChild } from "../../../../composables/useMoreList.js";
import { useForwardProps } from "../../../../utils/props.js";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxIconButton from "../../../OnyxIconButton/OnyxIconButton.vue";
import OnyxSeparator from "../../../OnyxSeparator/OnyxSeparator.vue";
import OnyxTooltip from "../../../OnyxTooltip/OnyxTooltip.vue";
import type { ColumnConfig } from "../index.js";
import { DATA_GRID_ACTIONS_INJECTION_KEY, type ActionProps } from "./types.js";

const { componentRef, isVisible } = useMoreListChild(DATA_GRID_ACTIONS_INJECTION_KEY);
const props = withDefaults(
  defineProps<
    ActionProps & {
      /**
       * Wether to show a Separator
       */
      showSeparator: boolean;
    }
  >(),
  {
    displayAs: "iconButton",
  },
);

// eslint-disable-next-line vue/no-setup-props-reactivity-loss -- not relevant for this component
const restAttr = useForwardProps(props, props.displayAs === "button" ? OnyxButton : OnyxIconButton);
</script>

<template>
  <template v-if="props.displayAs === 'button' && isVisible">
    <OnyxSeparator v-if="props.showSeparator" orientation="vertical" />

    <OnyxButton
      ref="componentRef"
      v-bind="restAttr"
      @click="(config: ColumnConfig<any, any, any>[]) => props.onClick(config)"
    />
  </template>

  <template v-else-if="isVisible">
    <OnyxSeparator v-if="props.showSeparator" orientation="vertical" />
    <OnyxTooltip :text="props.label">
      <template #default="{ trigger }">
        <OnyxIconButton
          ref="componentRef"
          v-bind="{ ...restAttr, ...trigger }"
          @click="(config: ColumnConfig<any, any, any>[]) => props.onClick(config)"
        />
      </template>
    </OnyxTooltip>
  </template>
</template>
