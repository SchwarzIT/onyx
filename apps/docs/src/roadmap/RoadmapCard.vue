<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";

const props = defineProps<{
  title?: string | number;
  description?: string;
}>();

const value = ref(0);

onMounted(() => {
  watchEffect(() => {
    setTimeout(() => {
      if (typeof props.title !== "number") return;
      value.value = props.title;
    }, 50);
  });
});
</script>

<template>
  <div class="card">
    <article class="card__content">
      <p
        v-if="typeof props.title === 'number'"
        class="card__title card__title--animated"
        :style="`--num: ${value}`"
      ></p>
      <p v-else class="card__title">{{ props.title }}</p>
      <h4 class="card__description">{{ props.description }}</h4>
    </article>
  </div>
</template>

<style lang="scss" scoped>
@property --num {
  syntax: "<integer>";
  initial-value: 0;
  inherits: false;
}

.card {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition:
    border-color 0.25s,
    background-color 0.25s;

  &__content {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    height: 100%;
  }

  &__title {
    font-size: 2.5rem;
    line-height: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;

    &--animated {
      transition: --num 1s;
      counter-reset: num var(--num);

      &::after {
        content: counter(num);
      }
    }
  }

  &__description {
    color: var(--vp-c-text-2);
    font-size: 1.25rem;
    line-height: 1.25rem;
    font-weight: 500;
  }
}
</style>
