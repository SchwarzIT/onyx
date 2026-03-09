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
const marks = [0, 25, 50, 75, 100] as const;

/** Map to ensure that each mark is mapped to a corresponding icon. */
const icons: Record<(typeof marks)[number], string> = {
  "0": iconEmojiSad,
  "25": iconEmojiUnhappy,
  "50": iconEmojiNeutral1,
  "75": iconEmojiHappy1,
  "100": iconEmojiHappy2,
};
</script>

<template>
  <OnyxSlider v-model="value" label="Rate your experience" :marks :step="25">
    <template #mark="mark">
      <OnyxIcon :icon="icons[mark.value as keyof typeof icons]" size="16px" />
    </template>
  </OnyxSlider>
</template>
