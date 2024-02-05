<script lang="ts" setup>
import { ref } from "vue";
import GridElement from "./GridElement.vue";

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
const selectedElement = ref<GridElementSettings | null>(null);

const isMaxMd = ref(false);
const isMaxLg = ref(false);
const isCentered = ref(false);
const is20Xl = ref(false);

const deleteElement = () => {
  elements.value = elements.value.filter((e) => e !== selectedElement.value);
  selectedElement.value = null;
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
        <button @click="deleteElement()">Delete Grid Element</button>
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
          <button @click="selectedElement.splice(elements.indexOf(selectedElement), 1)">
            Delete modifier
          </button>
        </div>
        <button @click="selectedElement.push({ spans: 2 })">Add Grid Modifier</button>
      </template>
      <template v-else>
        <span>Click an existing grid element to change its properties</span>
      </template>
    </fieldset>
  </form>
  <main
    :class="{
      'onyx-grid': true,
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

    <button class="onyx-grid-playground__add-new" @click="elements.push([{ spans: 4 }])">+</button>
  </main>
</template>

<style lang="scss" scoped>
.onyx-grid-playground {
  color: var(--onyx-color-text-neutral-intense);

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
