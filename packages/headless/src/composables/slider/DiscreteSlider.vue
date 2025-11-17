<script setup lang="ts">
import { ref } from "vue";
import { _unstableCreateSlider } from "./createSlider.js";

const modelValue = ref(50);
const discrete = ref(true);

const onChange = (values: number) => {
  modelValue.value = values;
};

const slider = _unstableCreateSlider({
  label: "Discrete Slider",
  value: modelValue,
  discrete,
  marks: [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ],
  onChange,
});

const {
  elements: { root, thumbInput, thumbContainer, track, mark },
  state: { marks },
} = slider;
</script>

<template>
  <div class="slider-container">
    <div v-bind="root" class="slider-root">
      <div class="slider-rail"></div>
      <div v-bind="track" class="slider-track"></div>

      <div v-bind="thumbContainer({ value: modelValue, index: 0 })" class="slider-thumb">
        <input class="visually-hidden" v-bind="thumbInput({ index: 0, value: modelValue })" />
      </div>

      <div
        v-for="markItem in marks"
        :key="markItem.value"
        v-bind="mark({ value: markItem.value })"
        class="slider-mark"
      >
        {{ markItem.label }}
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

.slider-mark {
  position: absolute;
  top: 100%;
  font-size: 12px;
  transform: translateX(-50%);
  margin-top: 5px;
  color: #666;
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
