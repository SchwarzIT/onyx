<script lang="ts" setup>
import { computed, ref } from "vue";
import { getCssVariableValue } from "../utils-browser";
import DesignToken from "./DesignToken.vue";

const props = defineProps<{
  name: string;
}>();

const value = computed(() => getCssVariableValue(`--${props.name}`));
const isCopied = ref(false);

const handleCopy = async () => {
  await navigator.clipboard.writeText(`var(--${props.name})`);
  isCopied.value = true;
  setTimeout(() => (isCopied.value = false), 3000);
};
</script>

<template>
  <div class="card">
    <div class="card__container card__container--left">
      <DesignToken :name="props.name" :value="value" :is-copied="isCopied" @copy="handleCopy" />
    </div>

    <div class="card__container card__container--right">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border-radius: var(--onyx-radius-md);
  border: 1px solid var(--onyx-color-base-border-default);
  background: var(--onyx-color-base-background-blank);
  display: flex;
  // justify-content: space-between;
  align-items: center;

  &__container {
    padding: var(--onyx-spacing-sm) var(--onyx-spacing-xl);

    &--left {
      border-right: 1px solid var(--onyx-color-base-border-default);
      width: 75%;
    }

    &--right {
      width: 25%;
    }
  }
}
</style>
