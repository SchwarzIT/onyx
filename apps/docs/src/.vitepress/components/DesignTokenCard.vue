<script lang="ts" setup>
import { computed, ref } from "vue";
import { getCssVariableValue } from "../utils-browser";
import DesignToken from "./DesignToken.vue";

const props = defineProps<{
  /** Token name. */
  name: string;
  /** If true, both columns will take up 50% of the available width. */
  wideName?: boolean;
  /** Whether hide the token value. */
  hideValue?: boolean;
}>();

const wrapperRef = ref<HTMLElement>();

const value = computed(() =>
  props.hideValue ? undefined : getCssVariableValue(props.name, wrapperRef.value),
);
const isCopied = ref(false);

const handleCopy = async () => {
  await navigator.clipboard.writeText(`var(--${props.name})`);
  isCopied.value = true;
  setTimeout(() => (isCopied.value = false), 3000);
};
</script>

<template>
  <div ref="wrapperRef" class="card vp-raw" :class="{ 'card--wide': props.wideName }">
    <div class="card__container">
      <slot name="name">
        <!--
          client only is needed because we are using "value" here which is
          using the "getCssVariableValue" function but this is only available
          inside the browser/client
         -->
        <ClientOnly>
          <DesignToken
            :name="props.name"
            :value="value"
            :is-copied="isCopied"
            allow-copy
            @copy="handleCopy"
          />
        </ClientOnly>
      </slot>
    </div>

    <div class="card__container">
      <slot v-bind="{ name }"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.card {
  border-radius: var(--onyx-radius-md);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
  background: var(--onyx-color-base-background-blank);
  display: grid;
  grid-template-columns: 1fr 25%;

  &--wide {
    grid-template-columns: 1fr 1fr;
  }

  @include mixins.breakpoint(max, s, -1) {
    padding: var(--onyx-spacing-md);
    grid-template-columns: 1fr;
    gap: var(--onyx-spacing-md);
  }

  @include mixins.breakpoint(min, s) {
    &__container {
      padding: var(--onyx-spacing-md) var(--onyx-spacing-2xl);
      display: flex;
      align-items: center;

      &:last-child {
        border-left: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
        justify-content: center;
      }
    }
  }
}
</style>
