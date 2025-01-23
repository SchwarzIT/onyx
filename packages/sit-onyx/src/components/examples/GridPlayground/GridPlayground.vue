<script lang="ts" setup>
import edit from "@sit-onyx/icons/edit.svg?raw";
import plus from "@sit-onyx/icons/plus.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { ONYX_BREAKPOINTS, type OnyxBreakpoint } from "@sit-onyx/shared/breakpoints";
import { computed, nextTick, ref, shallowRef, watch } from "vue";
import { useResizeObserver } from "../../../composables/useResizeObserver";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxLink from "../../OnyxLink/OnyxLink.vue";
import OnyxNavBar from "../../OnyxNavBar/OnyxNavBar.vue";
import OnyxMenuItem from "../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxUserMenu from "../../OnyxNavBar/modules/OnyxUserMenu/OnyxUserMenu.vue";
import OnyxRadioGroup from "../../OnyxRadioGroup/OnyxRadioGroup.vue";
import type { SelectOption } from "../../OnyxSelect/types";
import OnyxVisuallyHidden from "../../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import EditGridElementDialog, {
  type GridElementConfig,
} from "./EditGridElementDialog/EditGridElementDialog.vue";
import GridBadge from "./GridBadge/GridBadge.vue";
import GridElement from "./GridElement/GridElement.vue";
import GridOverlay from "./GridOverlay/GridOverlay.vue";

const viewportSize = useResizeObserver(shallowRef(document.body));

const gridSettings = ref<{
  alignment: "left" | "center";
  maxWidth: OnyxBreakpoint | "none";
  maxColumns: 12 | 16 | 20;
}>({
  alignment: "left",
  maxWidth: "none",
  maxColumns: 12,
});

const gridElements = ref<GridElementConfig[]>([]);
const isAddDialogOpen = ref(false);
const gridElementIndexToEdit = ref<number>();

const gridRef = ref<HTMLElement>();

const gridValues = ref<{
  margin: string;
  gutter: string;
  columnCount: number;
}>();

watch(
  [viewportSize.width, gridRef, gridSettings],
  async () => {
    if (!gridRef.value) return;

    await nextTick();
    const style = getComputedStyle(gridRef.value);

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

const alignmentOptions: SelectOption[] = [
  { label: "left", value: "left" },
  { label: "center", value: "center" },
];

const maxWidthOptions: SelectOption[] = [
  { label: "none", value: "none" },
  { label: `${ONYX_BREAKPOINTS.lg}px`, value: "md" },
  { label: `${ONYX_BREAKPOINTS.xl}px`, value: "lg" },
];

const maxColumnsOptions: SelectOption[] = [
  { label: "12 (default)", value: 12 },
  { label: "16 (>= LG)", value: 16 },
  { label: "20 (>= XL)", value: 20 },
];

const currentBreakpoint = computed(() => {
  const breakpoint = Object.entries(ONYX_BREAKPOINTS).reduce((prev, [name, width]) => {
    if (viewportSize.width.value >= width) return name.toUpperCase();
    return prev;
  }, "2xs");

  return `${breakpoint} (${Math.round(viewportSize.width.value)}px)`;
});
</script>

<template>
  <div class="onyx-text playground">
    <div class="onyx-grid-container">
      <OnyxHeadline is="h1" class="playground__headline">Grid and breakpoint demo</OnyxHeadline>
      <OnyxHeadline is="h2">
        Your current breakpoint:
        <span class="playground__breakpoint">{{ currentBreakpoint }}</span>
      </OnyxHeadline>

      <p>
        Add placeholder components below and link them to the grid properties to get an
        understanding on how components will behave inside the grid. To see the responsiveness of
        the onyx grid in action, just use the window resizer to adjust your browser width.
      </p>

      <p>
        For further details on the grid, please refer to our
        <OnyxLink href="https://onyx.schwarz/development/grid.html" target="_blank"
          >grid docs</OnyxLink
        >
      </p>

      <p>
        <strong
          >For the best experience, please press the "Go full screen" button in the upper right
          corner.</strong
        >
      </p>

      <div class="playground__options">
        <OnyxRadioGroup
          v-model="gridSettings.maxWidth"
          label="Max content width"
          :options="maxWidthOptions"
          direction="horizontal"
        />

        <OnyxRadioGroup
          v-model="gridSettings.alignment"
          label="Alignment"
          label-tooltip="In case of a grid with a max content width of 'none', this determines the alignment of the grid elements as a whole."
          :options="alignmentOptions"
          direction="horizontal"
          :disabled="gridSettings.maxWidth === 'none'"
        />

        <OnyxRadioGroup
          v-model="gridSettings.maxColumns"
          label="Max columns"
          label-tooltip="Defines the maximum number of columns the grid can have on the 'LG' and 'XL' breakpoints. Per default the grid is restricted to 12 columns. "
          :options="maxColumnsOptions"
          direction="horizontal"
        />
      </div>

      <div v-if="gridValues" class="playground__badges">
        <GridBadge :value="gridValues.margin" label="Margin" color="danger" />
        <GridBadge :value="gridValues.columnCount" label="Columns" color="warning" />
        <GridBadge :value="gridValues.gutter" label="Gutter" color="info" />
      </div>
    </div>

    <div
      :class="{
        'onyx-grid-center': gridSettings.alignment === 'center',
        [`onyx-grid-max-${gridSettings.maxWidth}`]: gridSettings.maxWidth !== 'none',
        [`onyx-grid-xl-${gridSettings.maxColumns}`]: gridSettings.maxColumns !== 12,
      }"
    >
      <GridOverlay :columns="gridValues?.columnCount" />

      <div>
        <OnyxNavBar app-name="Demo App">
          <template #contextArea>
            <OnyxUserMenu username="Jane Doe" description="Example user">
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

  &__headline {
    margin-bottom: var(--onyx-spacing-2xs);
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-md);
    margin-top: var(--onyx-spacing-lg);
  }

  &__breakpoint {
    color: var(--onyx-color-text-icons-neutral-soft);
  }

  &__badges {
    margin-top: var(--onyx-grid-gutter);
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
    .element__icon {
      display: revert-layer;
    }

    .element__span {
      display: none;
    }
  }
}
</style>
