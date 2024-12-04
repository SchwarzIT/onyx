<script lang="ts" setup>
import DesignVariableCard from "./DesignVariableCard.vue";

const props = defineProps<{
  variables: string[];
}>();
</script>

<template>
  <DesignVariableCard
    v-for="variable in props.variables"
    :key="variable"
    :name="variable"
    class="variable"
  >
    <figure class="preview">
      <figure class="preview__area" :style="{ height: `var(--${variable})` }"></figure>
    </figure>
  </DesignVariableCard>
</template>

<style lang="scss" scoped>
.variable {
  margin-bottom: var(--onyx-spacing-lg);
}

.preview {
  width: 4rem;
  min-height: 4rem;
  border-radius: var(--onyx-radius-sm);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background: var(--onyx-color-base-neutral-100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;

  &__area {
    $border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-warning-500);
    border-top: $border;
    border-bottom: $border;
    background: var(--onyx-color-base-warning-200);
    width: 100%;
    margin: var(--onyx-spacing-2xs) 0;
    box-sizing: border-box;
  }
}
</style>
