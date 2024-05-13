<script setup lang="ts">
import { computed, useAttrs, type HtmlHTMLAttributes } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const props = defineProps<{ modelValue: string }>();

const emit = defineEmits<{
  "update:modelValue": [input: string];
}>();

/**
 * Current value (with getter and setter) that can be used as "v-model" for the native input.
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const rootAttrs = computed(
  () =>
    ({ class: attrs["class"], style: attrs["style"] }) as Pick<
      HtmlHTMLAttributes,
      "class" | "style"
    >,
);

const inputAttrs = computed<Omit<HtmlHTMLAttributes, "class" | "style">>(() => {
  const rest = { ...attrs };
  delete rest.class;
  delete rest.style;
  return rest;
});
</script>
<template>
  <div class="onyx-mini-search" v-bind="rootAttrs">
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input
      v-bind="inputAttrs"
      v-model="value"
      class="onyx-mini-search__input"
      placeholder="Search"
      type="text"
    />
    <!-- We use `@mousedown.prevent` here to not lose the input focus when the button is clicked  -->
    <button
      class="onyx-mini-search__clear"
      aria-hidden="true"
      tabindex="-1"
      @mousedown.prevent="value = ''"
    >
      <OnyxIcon :icon="xSmall" />
    </button>
  </div>
</template>
<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-mini-search {
  @include layers.component() {
    display: flex;
    align-items: center;
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-sm);
    background-color: var(--onyx-color-base-background-blank);

    &__input,
    &__clear {
      all: initial;
    }

    &__input {
      color: var(--onyx-color-text-icons-neutral-soft);
      font-family: var(--onyx-font-family);
      font-size: var(--onyx-spacing-md);
      font-style: normal;
      font-weight: 400;
      line-height: var(--onyx-spacing-lg);
      flex-grow: 1;
      min-width: 0;
    }

    &__clear {
      color: var(--onyx-color-text-icons-neutral-medium);
      display: grid;
      place-items: center;
      cursor: pointer;
    }
  }
}
</style>
