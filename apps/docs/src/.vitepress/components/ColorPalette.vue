<script lang="ts" setup>
import { ref } from "vue";
import ColorValue, { type ColorValueProps } from "./ColorValue.vue";

const COLOR_STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type ColorStep = (typeof COLOR_STEPS)[number];

const props = defineProps<Pick<ColorValueProps, "variableName">>();

const selectedStep = ref<ColorStep>();
</script>

<template>
  <section>
    <div class="palette">
      <ColorValue
        class="palette__color"
        v-for="step in COLOR_STEPS"
        :key="step"
        :step="step"
        :variable-name="props.variableName"
        :selected="step === selectedStep"
        @keyup.enter="selectedStep = step"
        @click="selectedStep = step"
      />
    </div>

    <p class="headline">Related tokens</p>
    <p class="placeholder">Please select a color to show the related tokens</p>
  </section>
</template>

<style lang="scss" scoped>
.palette {
  display: grid;
  grid-template-columns: repeat(9, 1fr);

  &__color {
    &:first-child {
      border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);
    }

    &:last-child {
      border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
    }
  }
}

.headline {
  font-weight: 600;
  margin-top: var(--onyx-spacing-md);
  margin-bottom: var(--onyx-spacing-sm);
}

.placeholder {
  color: var(--onyx-color-text-neutral-medium);
}
</style>
