<script lang="ts" setup>
const props = defineProps<{
  /** Headline to show on the left side of the header. */
  headline?: string;
  /** Available tab buttons. Active tab can be set with the `modelValue` property. */
  tabs?: readonly string[];
  /** Currently active tab. */
  modelValue?: string;
}>();

const emit = defineEmits<{
  /** emitted when the user selects a tab. */
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
    gap: var(--onyx-spacing-lg);
  }

  &__tab {
    color: var(--onyx-color-text-neutral-medium);
    font-weight: 600;
    font-size: 1rem;

    &--active {
      color: var(--active-color, var(--onyx-color-text-primary-intense));
    }
  }
}
</style>
