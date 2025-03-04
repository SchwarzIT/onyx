<script lang="ts" setup>
import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import edit from "@sit-onyx/icons/edit.svg?raw";
import eyeDisabled from "@sit-onyx/icons/eye-disabled.svg?raw";
import eye from "@sit-onyx/icons/eye.svg?raw";
import plus from "@sit-onyx/icons/plus.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { ONYX_BREAKPOINTS, type OnyxBreakpoint } from "@sit-onyx/shared/breakpoints";
import { computed, nextTick, ref, shallowRef, useTemplateRef, watch } from "vue";
import { useResizeObserver } from "../../../composables/useResizeObserver";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxIconButton from "../../OnyxIconButton/OnyxIconButton.vue";
import OnyxLink from "../../OnyxLink/OnyxLink.vue";
import OnyxNavBar from "../../OnyxNavBar/OnyxNavBar.vue";
import OnyxMenuItem from "../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxNavSeparator from "../../OnyxNavBar/modules/OnyxNavSeparator/OnyxNavSeparator.vue";
import OnyxUserMenu from "../../OnyxNavBar/modules/OnyxUserMenu/OnyxUserMenu.vue";
import OnyxSelect from "../../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../../OnyxSelect/types";
import OnyxVisuallyHidden from "../../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import EditGridElementDialog, {
  type GridElementConfig,
} from "./EditGridElementDialog/EditGridElementDialog.vue";
import GridBadge from "./GridBadge/GridBadge.vue";
import GridElement from "./GridElement/GridElement.vue";
import GridOverlay from "./GridOverlay/GridOverlay.vue";

const viewportSize = useResizeObserver(shallowRef(document.body));

type MaxWidth = OnyxBreakpoint | "Filled";
type MaxColumns = 12 | 16 | 20;
type Alignment = "left" | "center" | "Filled";

const gridSettings = ref<{
  alignment: Alignment;
  maxWidth: MaxWidth;
  maxColumns: MaxColumns;
}>({
  alignment: "left",
  maxWidth: "md",
  maxColumns: 12,
});

const gridElements = ref<GridElementConfig[]>([]);
const isAddDialogOpen = ref(false);
const gridElementIndexToEdit = ref<number>();
const showGridLines = ref(false);

const grid = useTemplateRef("gridRef");

const gridValues = ref<{
  margin: string;
  gutter: string;
  columnCount: number;
}>();

watch(
  [viewportSize.width, grid, gridSettings],
  async () => {
    if (!grid.value) return;

    await nextTick();
    const style = getComputedStyle(grid.value);

    gridValues.value = {
      margin:
        style.getPropertyValue("--onyx-grid-margin-inline") ||
        style.getPropertyValue("--onyx-grid-margin"),
      gutter: style.getPropertyValue("--onyx-grid-gutter"),
      columnCount: +style.getPropertyValue("--onyx-grid-columns"),
    };
  },
  { immediate: true, deep: true },
);

const closeEdit = () => {
  gridElementIndexToEdit.value = undefined;
};

const deleteElement = (index: number) => {
  gridElements.value.splice(index, 1);
  closeEdit();
};

const updateElement = (index: number, newElement: GridElementConfig) => {
  gridElements.value[index] = newElement;
  closeEdit();
};

const alignmentOptions = [
  { label: "left", value: "left" },
  { label: "center", value: "center" },
] satisfies SelectOption<Alignment>[];

const maxWidthOptions = [
  { label: `${ONYX_BREAKPOINTS.lg}px`, value: "md" },
  { label: `${ONYX_BREAKPOINTS.xl}px`, value: "lg" },
] satisfies SelectOption<MaxWidth>[];

const maxColumnsOptions = [
  { label: "12 columns", value: 12 },
  { label: "16 columns", value: 16 },
  { label: "20 columns", value: 20 },
] satisfies SelectOption<MaxColumns>[];

const currentBreakpoint = computed(() => {
  const breakpoint = Object.entries(ONYX_BREAKPOINTS).reduce((prev, [name, width]) => {
    if (viewportSize.width.value >= width) return name;
    return prev;
  }, "2xs");

  return breakpoint;
});

const largeBreakpoint = computed(() => {
  return currentBreakpoint.value === "lg" || currentBreakpoint.value === "xl";
});
</script>

<template>
  <div class="onyx-text playground">
    <div class="onyx-grid-container playground__container">
      <OnyxHeadline is="h1" class="playground__headline">Grid and breakpoint demo</OnyxHeadline>

      <p class="playground__info-text">
        <OnyxIcon :icon="circleAttention" size="16px" color="warning"></OnyxIcon>
        For the best experience, please press the "Fullscreen" button in the upper right corner.
      </p>

      <p>
        This is the playground for grid and breakpoint usage. Feel free to create placeholder
        objects play around with them. To see the responsiveness of the onyx grid in action, just
        use the window resizer to adjust the width of your browser. You can globally adjust the grid
        the way that fit your needs. Details about the technical implementation can be found
        <OnyxLink href="https://onyx.schwarz/development/grid.html" target="_blank">here</OnyxLink>
      </p>

      <OnyxHeadline is="h2" class="playground__headline">Grid customization</OnyxHeadline>

      <div class="playground__options">
        <OnyxSelect
          v-model="gridSettings.alignment"
          label="Grid alignment"
          list-label="List of alignment options"
          label-tooltip="You can adjust the overall alignment of the grid here."
          :options="alignmentOptions"
        />

        <OnyxSelect
          v-model="gridSettings.maxWidth"
          label="Max overall width"
          list-label="List of max width options"
          label-tooltip="With this setting, you can adjust the maximum width of the container that includes the content. This is only relevant for large breakpoints."
          :options="maxWidthOptions"
          :readonly="!largeBreakpoint"
        />

        <OnyxSelect
          v-model="gridSettings.maxColumns"
          label="Column quantity"
          list-label="List of max columns options"
          label-tooltip="With large breakpoints you can optionally extend the default 12 column grid to 16 or even 20 columns."
          :options="maxColumnsOptions"
          :readonly="!largeBreakpoint"
        />
      </div>
    </div>

    <div v-if="gridValues" class="playground__grid-values">
      <p class="playground__breakpoint">
        Current breakpoint: <span>{{ currentBreakpoint }}</span>
      </p>

      <div class="playground__badges">
        <GridBadge :value="gridValues.margin" label="Margin" color="danger" />
        <GridBadge :value="gridValues.columnCount" label="Columns" color="warning" />
        <GridBadge :value="gridValues.gutter" label="Gutter" color="info" />
        <OnyxNavSeparator />
        <OnyxIconButton
          label="Grid lines visibility"
          :icon="showGridLines ? eye : eyeDisabled"
          @click="showGridLines = !showGridLines"
        ></OnyxIconButton>
      </div>
    </div>

    <div
      :class="{
        'onyx-grid-center': gridSettings.alignment === 'center',
        [`onyx-grid-max-${gridSettings.maxWidth}`]: gridSettings.maxWidth !== 'Filled',
        [`onyx-grid-xl-${gridSettings.maxColumns}`]: gridSettings.maxColumns !== 12,
      }"
    >
      <GridOverlay :columns="gridValues?.columnCount" />

      <div>
        <OnyxNavBar app-name="Demo App">
          <template #contextArea>
            <OnyxUserMenu full-name="Jane Doe" description="Example user">
              <OnyxMenuItem>
                <OnyxIcon :icon="settings" />
                Settings
              </OnyxMenuItem>

              <template #footer>
                App version
                <span class="onyx-text--monospace">0.0.0</span>
              </template>
            </OnyxUserMenu>
          </template>
        </OnyxNavBar>
      </div>

      <div class="onyx-grid-container">
        <div ref="gridRef" class="onyx-grid">
          <GridElement
            v-for="(element, index) in gridElements"
            :key="index"
            class="element"
            v-bind="element"
            :is-full-width="!largeBreakpoint"
            :label="`Edit grid element ${index + 1}`"
            @click="gridElementIndexToEdit = index"
          >
            <template #default="{ gridSpan }">
              <span class="element__span">{{ gridSpan }}</span>
              <OnyxVisuallyHidden>
                This grid element spans {{ gridSpan }} columns
              </OnyxVisuallyHidden>
              <OnyxIcon class="element__icon" :icon="edit" />
            </template>
          </GridElement>

          <GridElement
            :column-count="2"
            mode="outline"
            label="Add grid element"
            @click="isAddDialogOpen = true"
          >
            <OnyxIcon :icon="plus" />
          </GridElement>
        </div>
      </div>
    </div>

    <EditGridElementDialog
      :open="isAddDialogOpen"
      @close="isAddDialogOpen = false"
      @apply="
        gridElements.push($event);
        isAddDialogOpen = false;
      "
    />

    <EditGridElementDialog
      :open="gridElementIndexToEdit != undefined"
      :initial-value="
        gridElementIndexToEdit != undefined ? gridElements[gridElementIndexToEdit] : undefined
      "
      @close="closeEdit"
      @apply="updateElement(gridElementIndexToEdit!, $event)"
      @delete="deleteElement(gridElementIndexToEdit!)"
    />
  </div>
</template>

<style lang="scss" scoped>
.playground {
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
  background-color: var(--onyx-color-base-background-tinted);

  &__container {
    box-shadow: 0px 2px 8px 0px #0000001a;
    display: inline-block;
  }

  &__headline {
    margin-bottom: var(--onyx-spacing-2xs);
  }

  &__info-text {
    display: inline-flex;
    font-size: 13px;
    line-height: 20px;
    color: var(--onyx-color-text-icons-warning-intense);
    gap: var(--onyx-density-xs);
    margin: 0;
  }

  &__options {
    display: inline-flex;
    gap: var(--onyx-spacing-md);
    margin-top: var(--onyx-spacing-lg);
  }

  &__breakpoint {
    font-size: 13px;
    line-height: 20px;
    margin: 0;
    color: var(--onyx-color-text-icons-neutral-medium);

    > span {
      font-size: 16px;
      line-height: 24px;
      color: var(--onyx-color-text-icons-neutral-intense);
    }
  }

  &__grid-values {
    padding: var(--onyx-density-2xl) var(--onyx-density-3xl) var(--onyx-density-xs)
      var(--onyx-density-3xl);
    background: var(--onyx-color-base-background-blank);
    display: flex;
    gap: var(--onyx-spacing-xl);
    align-items: center;
    justify-content: space-between;
  }

  &__badges {
    display: flex;
    gap: var(--onyx-spacing-xl);
    align-items: center;
    flex-wrap: wrap;
  }

  > .onyx-grid-container {
    padding-bottom: var(--onyx-spacing-xl);
  }
}

.element {
  &__icon {
    display: none;
  }

  &:hover,
  &:focus-visible {
    background: var(--onyx-color-base-neutral-300);
    border-color: var(--onyx-color-component-border-neutral-hover);

    .element__icon {
      display: revert-layer;
    }

    .element__span {
      display: none;
    }
  }
}
</style>
