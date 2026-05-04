<script lang="ts" setup>
export type DetailsItem = {
  /**
   * Label to display.
   */
  label: string;
  /**
   * Item value.
   */
  value: string;
  /**
   * Whether show a button to copy the value.
   */
  copy?: boolean;
};

const props = defineProps<{
  items?: DetailsItem[];
}>();
</script>

<template>
  <ul class="list">
    <li v-for="item in props.items" :key="item.label" class="item">
      <span class="item__label"> {{ item.label }} </span>
      <div class="item__value">
        {{ item.value }}
        <CopyButton v-if="item.copy" :value="item.value" />
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xs);
  list-style: none;
  padding: 0;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 var(--onyx-density-sm);
  flex-wrap: wrap;

  &__label {
    color: var(--onyx-color-text-icons-neutral-medium);
  }

  &__value {
    display: flex;
    flex-wrap: wrap;
    gap: var(--onyx-density-2xs);
  }
}
</style>
