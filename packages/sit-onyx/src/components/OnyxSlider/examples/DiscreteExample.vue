<script lang="ts" setup>
import {
  iconEmojiHappy1,
  iconEmojiHappy2,
  iconEmojiNeutral1,
  iconEmojiSad,
  iconEmojiUnhappy,
} from "@sit-onyx/icons";
import { ref } from "vue";
import { OnyxIcon, OnyxSlider } from "../../../index.js";

const value = ref(50);

const customMarks = {
  0: {
    label: "Very bad",
    icon: iconEmojiSad,
  },
  25: {
    label: "Bad",
    icon: iconEmojiUnhappy,
  },
  50: {
    label: "Neutral",
    icon: iconEmojiNeutral1,
  },
  75: {
    label: "Good",
    icon: iconEmojiHappy1,
  },
  100: {
    label: "Awesome",
    icon: iconEmojiHappy2,
  },
};

// get marks as numbers
type MarkValue = keyof typeof customMarks;
const marks = Object.keys(customMarks).map((value) => +value as MarkValue);
</script>

<template>
  <OnyxSlider
    v-model="value"
    label="Rate your experience"
    :marks
    :step="25"
    :tooltip="{ formatter: (value) => customMarks[value as MarkValue].label }"
  >
    <template #mark="mark">
      <OnyxIcon :icon="customMarks[mark.value as MarkValue].icon" size="16px" />
    </template>
  </OnyxSlider>
</template>
