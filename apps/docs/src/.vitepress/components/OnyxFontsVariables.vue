<script lang="ts" setup>
import DesignVariableCard from "./DesignVariableCard.vue";

defineProps<{
  variables: string[];
  type: "fontSize" | "fontFamily" | "lineHeight" | "fontSpacing" | "fontWeight";
}>();
</script>

<template>
  <DesignVariableCard
    v-for="value in variables"
    :key="value"
    :name="value"
    class="variable"
    :style="{
      fontSize: type === 'fontSize' ? `var(--${value})` : '1rem',
      fontFamily: type === 'fontFamily' ? `var(--${value})` : 'inherit',
      fontWeight: type === 'fontWeight' ? `var(--${value})` : 'inherit',
    }"
  >
    <figure v-if="type === 'lineHeight'" class="preview">
      <figure class="preview__area" :style="{ height: `var(--${value})` }"></figure>
    </figure>
    <P v-else>Font</P>
  </DesignVariableCard>
</template>

<style lang="scss" scoped>
.variable {
  margin-bottom: var(--onyx-spacing-lg);
}
.headline {
  margin-bottom: var(--onyx-spacing-2xs);
}

.preview {
  width: 4rem;
  min-height: 4rem;
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
