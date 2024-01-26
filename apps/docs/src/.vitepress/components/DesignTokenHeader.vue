<script lang="ts" setup>
const props = defineProps<{
  headline?: string;
  tabs?: readonly string[];
  modelValue?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <div class="header">
    <h4 class="header__headline">{{ props.headline }}</h4>

    <div class="header__tabs">
      <button
        v-for="tab in props.tabs"
        :key="tab"
        class="header__tab"
        :class="{ 'header__tab--active': props.modelValue === tab }"
        @click="emit('update:modelValue', tab)"
      >
        {{ tab }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  margin-bottom: var(--onyx-spacing-xs);
  display: flex;
  justify-content: space-between;

  &__headline {
    font-weight: 600;
    color: var(--onyx-color-text-neutral-intense);
  }

  &__tabs {
    display: flex;
    gap: var(--onyx-spacing-md);
  }

  &__tab {
    color: var(--onyx-color-text-neutral-medium);
    font-weight: 600;
    font-size: 1rem;

    &--active {
      color: var(--active-color, var(--onyx-color-text-action-intense));
    }
  }
}
</style>
