<script lang="ts" setup>
import { iconSearch } from "@sit-onyx/icons";
import { computed, useTemplateRef } from "vue";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useVModel } from "../../composables/useVModel.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import type { OnyxSearchProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSearchProps>(), {
  color: "blank",
  cornerRadius: "soft",
});

const emit = defineEmits<{
  /**
   * Emitted when the input changes
   */
  "update:modelValue": [value: string];
}>();

/**
 * Current value of the input.
 */
const modelValue = useVModel({
  key: "modelValue",
  props,
  emit,
  default: "",
});

const inputProps = useForwardProps(props, OnyxInput);

const inputComponent = useTemplateRef("inputRef");
const input = computed(() => inputComponent.value?.input ?? null);

useAutofocus(input, props);

defineExpose({ input });
</script>

<template>
  <OnyxInput
    ref="inputRef"
    v-bind="inputProps"
    v-model="modelValue"
    :loading="props.loading"
    :class="['onyx-search', `onyx-search--${props.color}`, `onyx-search--${props.cornerRadius}`]"
    :label="props.label"
    :placeholder="props.label"
    type="search"
    hide-label
  >
    <template #leading>
      <OnyxIcon v-if="!props.loading" class="onyx-search__icon" :icon="iconSearch" />
    </template>
  </OnyxInput>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/input.scss";

.onyx-search {
  @include layers.component() {
    cursor: pointer;

    &--blank {
      --background-color: var(--onyx-color-base-background-blank);
    }

    &--tinted {
      --background-color: var(--onyx-color-base-background-tinted);
    }

    &--soft {
      --border-radius: var(--onyx-radius-sm);
    }

    &--strong {
      --border-radius: var(--onyx-radius-md);
    }

    &:focus-within,
    &:hover {
      .onyx-search__icon {
        --icon-color: var(--onyx-color-text-icons-primary-intense);
      }
    }

    &:has(.onyx-input__native:disabled) {
      cursor: default;

      .onyx-search__icon {
        --icon-color: var(--onyx-color-text-icons-neutral-soft);
      }
    }

    .onyx-input__separator--leading {
      display: none;
    }
  }
}
</style>
