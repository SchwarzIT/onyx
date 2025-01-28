<script lang="ts" setup>
import { computed, ref, useId } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";

type PositionAreaRow = "top" | "center" | "bottom";
type PositionAreaColumn = "left" | "center" | "right";
type PositionAreaSpan = "left" | "x-end";

type TooltipPosition =
  | PositionAreaRow
  | PositionAreaColumn
  | `${PositionAreaRow} ${PositionAreaColumn}`
  | `${PositionAreaRow} span-${PositionAreaSpan}`
  | `${Extract<PositionAreaRow, "center">} span-${PositionAreaSpan | "all"}`;

const props = withDefaults(
  defineProps<{
    /**
     * How to position the tooltip relative to the trigger element.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using#setting_a_position-area
     */
    position?: TooltipPosition;
  }>(),
  {
    position: "top center",
  },
);

const id = useId();
const isOpen = ref(false);
const anchorName = computed(() => `--anchor-${id}`);

const handleToggle = (event: ToggleEvent) => {
  isOpen.value = event.newState === "open";
};
</script>

<template>
  <div class="onyx-component onyx-tooltip">
    <div
      :id="id"
      class="onyx-tooltip__popover"
      :style="`position-area: ${props.position}; position-anchor: ${anchorName}`"
      popover
      @toggle="handleToggle"
    >
      Tooltip content
    </div>

    <OnyxButton
      class="onyx-tooltip__trigger"
      label="Trigger"
      :popovertarget="id"
      :style="{ anchorName }"
    />
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-tooltip {
  @include layers.component() {
    &__trigger {
      width: fit-content;
    }

    &__popover {
      position: fixed;
    }
  }
}
</style>
