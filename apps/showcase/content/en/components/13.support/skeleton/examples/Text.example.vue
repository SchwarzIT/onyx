<script lang="ts" setup>
import { OnyxSkeleton } from "sit-onyx";
import { ref } from "vue";

const lines = ref(3);
</script>

<template>
  <div class="text">
    <OnyxSkeleton v-for="i in lines" :key="i" class="text__skeleton" />
  </div>
</template>

<style lang="scss" scoped>
.text {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-2xs);
  width: 100%;
  height: calc(v-bind(lines) * 1lh);

  &__skeleton {
    flex: 1;
    min-height: 0;
    width: 100%;

    &:first-of-type:not(:only-of-type) {
      width: 75%;
    }
  }
}
</style>
