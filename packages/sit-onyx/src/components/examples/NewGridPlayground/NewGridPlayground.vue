<script lang="ts" setup>
import edit from "@sit-onyx/icons/edit.svg?raw";
import plus from "@sit-onyx/icons/plus.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { ref } from "vue";
import { ONYX_BREAKPOINTS, type OnyxBreakpoint } from "../../../types";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxNavBar from "../../OnyxNavBar/OnyxNavBar.vue";
import OnyxMenuItem from "../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxUserMenu from "../../OnyxNavBar/modules/OnyxUserMenu/OnyxUserMenu.vue";
import OnyxRadioGroup from "../../OnyxRadioGroup/OnyxRadioGroup.vue";
import type { SelectOption } from "../../OnyxSelect/types";
import EditGridElementDialog, { type GridElementConfig } from "./EditGridElementDialog.vue";
import GridElement from "./GridElement.vue";
import GridOverlay from "./GridOverlay.vue";

const alignment = ref<"left" | "center">("left");
const maxWidth = ref<OnyxBreakpoint | "none">("none");

const isAddDialogOpen = ref(false);
const gridElements = ref<GridElementConfig[]>([]);

const gridElementIndexToEdit = ref<number>();

const deleteElement = (index: number) => {
  gridElements.value.splice(index, 1);
  gridElementIndexToEdit.value = undefined;
};

const updateElement = (index: number, newElement: GridElementConfig) => {
  gridElements.value[index] = newElement;
  gridElementIndexToEdit.value = undefined;
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
</script>

<template>
  <div class="onyx-text playground">
    <div class="onyx-grid-container">
      <OnyxHeadline is="h2">Grid and breakpoint demo</OnyxHeadline>
      <p>To see the grid in action, just use the window resizer to adjust the width.</p>

      <div class="playground__options">
        <OnyxRadioGroup
          v-model="maxWidth"
          headline="Max content width"
          :options="maxWidthOptions"
          direction="horizontal"
        />

        <OnyxRadioGroup
          v-model="alignment"
          headline="Alignment"
          :options="alignmentOptions"
          direction="horizontal"
          :disabled="maxWidth === 'none'"
        />
      </div>
    </div>

    <div
      :class="{
        'onyx-grid-center': alignment === 'center',
        [`onyx-grid-max-${maxWidth}`]: maxWidth !== 'none',
      }"
    >
      <GridOverlay />

      <div>
        <OnyxNavBar app-name="Example navigation">
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
        <div class="onyx-grid">
          <GridElement
            v-for="(element, index) in gridElements"
            :key="index"
            class="element"
            v-bind="element"
            @click="gridElementIndexToEdit = index"
          >
            <OnyxIcon class="element__icon" :icon="edit" />
          </GridElement>

          <GridElement :column-count="3" @click="isAddDialogOpen = true">
            <OnyxIcon :icon="plus" />
          </GridElement>
        </div>
      </div>
    </div>

    <EditGridElementDialog
      :open="isAddDialogOpen"
      @close="isAddDialogOpen = false"
      @submit="
        gridElements.push($event);
        isAddDialogOpen = false;
      "
    />

    <EditGridElementDialog
      :open="gridElementIndexToEdit != undefined"
      :initial-value="
        gridElementIndexToEdit != undefined ? gridElements[gridElementIndexToEdit] : undefined
      "
      @close="gridElementIndexToEdit = undefined"
      @submit="updateElement(gridElementIndexToEdit!, $event)"
      @delete="deleteElement(gridElementIndexToEdit!)"
    />
  </div>
</template>

<style lang="scss" scoped>
.playground {
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
  background-color: var(--onyx-color-base-background-tinted);

  &__options {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-md);
    margin-top: var(--onyx-spacing-lg);
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
  }
}
</style>
