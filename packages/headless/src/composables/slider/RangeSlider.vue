<script setup lang="ts">
import { ref } from "vue";
import { createSlider } from "./createSlider.js";

const modelValue = ref([25, 75]);
const committed = ref<number[] | null>(null);
const min = ref(0);
const max = ref(100);
const step = ref(1);

const onChange = (values: number[]) => {
  modelValue.value = values;
};

const onCommit = (values: number[]) => {
  committed.value = values;
};

const slider = createSlider({
  value: modelValue,
  min,
  max,
  step,
  onChange,
  onCommit,
  label: "Range Slider",
});

const {
  elements: { root, thumbInput, thumbContainer, track, rail },
  state: { trackOffset, trackLength },
} = slider;

defineExpose({ slider });
</script>

<template>
  <div class="slider-container">
    <div v-bind="root" class="slider-root">
      <div v-bind="rail" class="slider-rail"></div>
      <div
        v-bind="track"
        class="slider-track"
        :style="{ left: `${trackOffset}%`, width: `${trackLength}%` }"
      ></div>

      <div
        v-for="(value, index) in modelValue"
        :key="index"
        v-bind="thumbContainer({ value, index })"
        class="slider-thumb"
        :style="{ left: `${((value - min) / (max - min)) * 100}%` }"
      >
        <input class="visually-hidden" v-bind="thumbInput({ index, value })" />
      </div>
    </div>
  </div>
</template>

<style>
.slider-container {
  padding: 20px;
  width: 400px;
}

.slider-root {
  position: relative;
  height: 20px;
  margin: 20px 0;
}

.slider-rail {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: #ddd;
  transform: translateY(-50%);
}

.slider-track {
  position: absolute;
  top: 50%;
  height: 4px;
  background: #007bff;
  transform: translateY(-50%);
}

.slider-thumb {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  background: #007bff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
}

.visually-hidden {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
}
</style>
