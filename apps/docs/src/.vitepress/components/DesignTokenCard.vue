<script lang="ts" setup>
import { computed, ref } from "vue";
import { getCssVariableValue } from "../utils-browser";
import DesignToken from "./DesignToken.vue";

const props = defineProps<{
  /** Token name. */
  name: string;
}>();

const value = computed(() => getCssVariableValue(props.name));
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
      <ClientOnly>
        <DesignToken :name="props.name" :value="value" :is-copied="isCopied" @copy="handleCopy" />
      </ClientOnly>
    </div>

    <div class="card__container card__container--right">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.card {
  border-radius: var(--onyx-radius-md);
  border: 1px solid var(--onyx-color-base-neutral-300);
  background: var(--onyx-color-base-background-blank);
  display: flex;
  align-items: center;

  @include mixins.breakpoint(max, s, -1) {
    padding: var(--onyx-spacing-md);
    flex-direction: column;
    align-items: flex-start;
    gap: var(--onyx-spacing-md);
  }

  @include mixins.breakpoint(min, s) {
    &__container {
      padding: var(--onyx-spacing-md) var(--onyx-spacing-2xl);

      &--left {
        width: 75%;
      }

      &--right {
        border-left: 1px solid var(--onyx-color-base-neutral-300);
        width: 25%;
      }
    }
  }
}
</style>
