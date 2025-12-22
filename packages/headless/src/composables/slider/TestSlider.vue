<script setup lang="ts">
import { createSlider } from "./createSlider.js";

const modelValue = defineModel<number | [number, number]>({ required: true });

const {
  elements: { root, thumbInput, thumbContainer, track },
  state: { normalizedValue },
} = createSlider({
  label: "Slider",
  value: modelValue,
  onChange: (newValue) => (modelValue.value = newValue),
});
</script>

<template>
  <div class="slider-container">
    <div v-bind="root" class="slider-root">
      <div class="slider-rail"></div>
      <div v-bind="track" class="slider-track"></div>

      <div
        v-for="(value, index) in normalizedValue"
        :key="index"
        v-bind="thumbContainer({ value, index })"
        class="slider-thumb"
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
