<script lang="ts" setup>
const props = defineProps<{
  colors: string[];
  name: string;
}>();
</script>

<template>
  <div>
    <figure class="strip" :class="{ 'strip--border': props.showBorder }">
      <div
        class="strip__color"
        v-for="color in props.colors"
        :key="color"
        :style="{ backgroundColor: color }"
      ></div>
    </figure>

    <figcaption class="strip__name">{{ props.name }}</figcaption>
  </div>
</template>

<style lang="scss" scoped>
.strip {
  height: 18rem;
  display: flex;
  flex-direction: column;

  &__color {
    width: 100%;
    height: 100%;

    &:first-child {
      border-radius: var(--onyx-radius-sm) var(--onyx-radius-sm) 0 0;
    }

    &:last-child {
      border-radius: 0 0 var(--onyx-radius-sm) var(--onyx-radius-sm);
    }
  }

  &__name {
    font-family: var(--onyx-font-family-mono);
    font-size: 0.8125rem;
  }
}
</style>
