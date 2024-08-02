<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import GridElement from "./GridElement.vue";
import GridElementsIndicator, { type GridSettings } from "./GridElementsIndicator.vue";

// TODO: Create single source of truth for grid definitions and remove from this component
const BREAKPOINTS = {
  "2xs": {
    cols: 4,
  },
  xs: {
    cols: 8,
  },
  sm: {
    cols: 8,
  },
  md: {
    cols: 12,
  },
  lg: {
    cols: 16,
  },
  xl: {
    cols: 16,
  },
} as const;
export type GridBreakpoints = keyof typeof BREAKPOINTS;
export type GridElementSettings = { breakpoint?: GridBreakpoints; spans: number }[];

const elements = ref<GridElementSettings[]>([]);
const selectedElement = ref<GridElementSettings>();
const gridElement = ref<HTMLElement>();
const gridSettings = ref<GridSettings>();
const resizeObserver = new ResizeObserver(() => updateGridSettings());

const isMaxMd = ref(false);
const isMaxLg = ref(false);
const isCentered = ref(false);
const is20Xl = ref(false);

const deleteElement = () => {
  elements.value = elements.value.filter((e) => e !== selectedElement.value);
  selectedElement.value = undefined;
};

const updateGridSettings = () => {
  const computedGrid = getComputedStyle(gridElement.value!);
  gridSettings.value = {
    gridTemplateColumns: computedGrid.gridTemplateColumns,
    gutterSize: computedGrid.getPropertyValue("--onyx-grid-gutter"),
    marginSize: computedGrid.getPropertyValue("--onyx-grid-margin"),
    maxWidth: computedGrid.getPropertyValue("--onyx-grid-max-width"),
    isCentered: isCentered.value,
  };
};

watch([isMaxMd, isMaxLg, isCentered, is20Xl], () => updateGridSettings());

onMounted(() => {
  resizeObserver.observe(document.body);
  resizeObserver.observe(gridElement.value!);
});

onBeforeUnmount(() => {
  resizeObserver.unobserve(document.body);
  resizeObserver.unobserve(gridElement.value!);
});

const handleDeleteModifier = () => {
  if (!selectedElement.value) return;
  selectedElement.value.splice(elements.value.indexOf(selectedElement.value), 1);
};

const handleAddModifier = () => {
  selectedElement.value?.push({ spans: 2 });
};
</script>

<template>
  <form class="onyx-grid-playground" @submit.prevent>
    <fieldset class="onyx-grid-playground__settings">
      <legend>Grid options</legend>
      <label><input v-model="isCentered" type="checkbox" />Centered</label>
      <label><input v-model="is20Xl" type="checkbox" />XL with 20 columns</label>
      <label><input v-model="isMaxMd" type="checkbox" />Max md width</label>
      <label><input v-model="isMaxLg" type="checkbox" />Max lg width</label>
    </fieldset>
    <fieldset class="onyx-grid-playground__settings">
      <legend>Selected Grid Element options</legend>
      <template v-if="selectedElement">
        <button type="button" @click="deleteElement()">Delete Grid Element</button>
        <div v-for="(props, i) in selectedElement" :key="i">
          <label>
            Breakpoint:
            <select v-model="props.breakpoint">
              <option :value="undefined">None</option>
              <option v-for="bp in Object.keys(BREAKPOINTS)" :key="bp" :value="bp">{{ bp }}</option>
            </select>
          </label>
          <label>
            Columns:
            <input
              id="number"
              v-model="props.spans"
              type="number"
              :max="(props.breakpoint && BREAKPOINTS[props.breakpoint]?.cols) ?? 20"
            />
          </label>
          <button type="button" @click="handleDeleteModifier">Delete modifier</button>
        </div>
        <button type="button" @click="handleAddModifier">Add Grid Modifier</button>
      </template>
      <template v-else>
        <span>Click an existing grid element to change its properties</span>
      </template>
    </fieldset>
  </form>
  <GridElementsIndicator v-if="gridSettings" :settings="gridSettings" />
  <main
    ref="gridElement"
    :class="{
      'onyx-grid': true,
      'onyx-grid-container': true,
      'onyx-grid-center': isCentered,
      'onyx-grid-xl-20': is20Xl,
      'onyx-grid-max-md': isMaxMd,
      'onyx-grid-max-lg': isMaxLg,
    }"
  >
    <GridElement
      v-for="(element, i) in elements"
      :key="i"
      :settings="element"
      :selected="element === selectedElement"
      @click="selectedElement = elements[i]"
    />

    <button
      type="button"
      class="onyx-grid-playground__add-new"
      @click="elements.push([{ spans: 4 }])"
    >
      +
    </button>
  </main>
</template>

<style lang="scss" scoped>
.onyx-grid-playground {
  color: var(--onyx-color-text-icons-neutral-intense);

  &__settings {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__add-new {
    cursor: pointer;
    height: 100px;
  }
}
</style>
