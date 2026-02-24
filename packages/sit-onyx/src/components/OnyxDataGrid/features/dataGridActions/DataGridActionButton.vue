<script setup lang="ts">
import { useMoreListChild } from "../../../../composables/useMoreList.js";
import { mergeVueProps } from "../../../../utils/attrs.js";
import { useForwardProps } from "../../../../utils/props.js";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxIconButton from "../../../OnyxIconButton/OnyxIconButton.vue";
import OnyxSeparator from "../../../OnyxSeparator/OnyxSeparator.vue";
import OnyxTooltip from "../../../OnyxTooltip/OnyxTooltip.vue";
import { DATA_GRID_ACTIONS_INJECTION_KEY, type DataGridAction } from "./types.js";

const { componentRef, isVisible } = useMoreListChild(DATA_GRID_ACTIONS_INJECTION_KEY);
const props = withDefaults(
  defineProps<
    DataGridAction & {
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

const buttonProps = useForwardProps(props, OnyxButton);
const iconButtonProps = useForwardProps(props, OnyxIconButton);
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -- used for the OnyxMoreList -->
<template>
  <template v-if="isVisible">
    <OnyxSeparator v-if="props.showSeparator" orientation="vertical" />

    <OnyxButton
      v-if="props.displayAs === 'button'"
      ref="componentRef"
      v-bind="buttonProps"
      @click="props.onClick"
    />

    <OnyxTooltip v-else :text="props.label">
      <template #default="{ trigger }">
        <OnyxIconButton
          ref="componentRef"
          v-bind="mergeVueProps(iconButtonProps, trigger)"
          @click="props.onClick"
        />
      </template>
    </OnyxTooltip>
  </template>
</template>
