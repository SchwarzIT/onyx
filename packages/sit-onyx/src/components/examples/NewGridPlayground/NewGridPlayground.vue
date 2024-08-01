<script lang="ts" setup>
import plus from "@sit-onyx/icons/plus.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { ref, shallowRef, watch } from "vue";
import { useResizeObserver } from "../../../composables/useResizeObserver";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxNavBar from "../../OnyxNavBar/OnyxNavBar.vue";
import OnyxMenuItem from "../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxUserMenu from "../../OnyxNavBar/modules/OnyxUserMenu/OnyxUserMenu.vue";
import EditGridElementDialog, { type GridElementData } from "./EditGridElementDialog.vue";
import GridElement from "./GridElement.vue";

export type GridSettings = {
  margin: string;
  gutter: string;
  columnCount: number;
  maxWidth?: string;
};

const isCentered = ref(false);
const gridSettings = ref<GridSettings>();
const windowSize = useResizeObserver(shallowRef(document.body));
const isAddDialogOpen = ref(false);
const gridElements = ref<GridElementData[]>([]);

watch(
  windowSize.width,
  () => {
    const grid = document.body.querySelector(".onyx-grid");
    if (!grid) return;

    const styles = getComputedStyle(grid);

    gridSettings.value = {
      columnCount: +styles.getPropertyValue("--onyx-grid-columns"),
      gutter: styles.getPropertyValue("--onyx-grid-gutter"),
      margin: styles.getPropertyValue("--onyx-grid-margin"),
      maxWidth: styles.getPropertyValue("--onyx-grid-max-width"),
    };
  },
  { immediate: true },
);
</script>

<template>
  <div class="onyx-text playground" :class="{ 'onyx-grid-center': isCentered }">
    <div class="onyx-grid-container">
      <OnyxHeadline is="h2">Grid and breakpoint demo</OnyxHeadline>
      <p>To see the grid in action, just use the window resizer to adjust the width.</p>
    </div>

    <div class="schema">
      <div class="schema__margin"></div>

      <template v-for="i in gridSettings?.columnCount" :key="i">
        <div class="schema__column"></div>
        <div v-if="i <= gridSettings!.columnCount" class="schema__gutter"></div>
      </template>

      <div class="schema__margin"></div>
    </div>

    <div>
      <OnyxNavBar app-name="Example navigation">
        <template #contextArea>
          <OnyxUserMenu username="Jane Doe" description="Example user">
            <OnyxMenuItem>
              <OnyxIcon :icon="settings" />
              Settings
            </OnyxMenuItem>
          </OnyxUserMenu>
        </template>
      </OnyxNavBar>
    </div>

    <div class="onyx-grid-container">
      <div class="onyx-grid">
        <GridElement
          v-for="(element, index) in gridElements"
          :key="index"
          v-bind="element"
          @edit="gridElements[index] = $event"
          @delete="gridElements.splice(index, 1)"
        />

        <GridElement :column-count="3" @click="isAddDialogOpen = true">
          <OnyxIcon :icon="plus" />
        </GridElement>
      </div>
    </div>

    <EditGridElementDialog
      label="Add new grid element"
      :open="isAddDialogOpen"
      @close="isAddDialogOpen = false"
      @submit="
        gridElements.push($event);
        isAddDialogOpen = false;
      "
    />
  </div>
</template>

<style lang="scss" scoped>
.playground {
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
  background-color: var(--onyx-color-base-background-tinted);
}

.schema {
  height: 1.5rem;
  display: flex;

  &__margin {
    height: 100%;
    width: var(--onyx-grid-margin);
    background-color: var(--onyx-color-text-icons-danger-soft);
  }

  &__column {
    height: 100%;
    flex-grow: 1;
    background-color: var(--onyx-color-text-icons-warning-soft);
  }

  &__gutter {
    height: 100%;
    width: var(--onyx-grid-gutter);
    background-color: var(--onyx-color-text-icons-info-soft);
  }
}
</style>
