<script
  setup
  lang="ts"
  generic="
    TComponent extends Component<{ modelValue?: TModelValue | null | undefined }>,
    TProps extends { modelValue?: any } = ComponentProps<TComponent>,
    TModelValue = TProps['modelValue']
  "
>
import { computed, type Component } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";

const props = defineProps<
  {
    /**
     * The component that should be wrapped.
     */
    is: Component;
    /**
     * The `modelValue` prop for setting the current value of the component.
     */
    modelValue?: TModelValue;
    /**
     * The label text, which is used for the form element.
     */
    label: string;
  } & TProps
>();

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
  /**
   * Emitted when the input changes.
   */
  "update:modelValue": [value: TModelValue];
}>();

const bind = computed(() => ({
  hideLabel: true,
  label: props.label,
  modelValue: props.modelValue,
  "onUpdate:modelValue": (v: TModelValue) => emit("update:modelValue", v),
}));
</script>

<template>
  <component :is="props.is" v-bind="bind" class="onyx-component onyx-data-grid-form-wrapper" />
</template>

<style lang="scss">
@use "../../../styles/mixins/layers.scss";

@include layers.override() {
  .onyx-data-grid-form-wrapper,
  .onyx-data-grid-form-wrapper :is(.onyx-select-input, .onyx-time-picker-input) {
    --border-color: transparent;
    --border-style: none;
    --border-radius: 0;
    --background-color: transparent;
    --outline-style: none;
    --onyx-outline-width: 0;

    .onyx-table :is(td, th):has(&) {
      padding: 0;
    }
  }

  .onyx-slider {
    padding: var(--onyx-density-xs) var(--onyx-density-sm);
  }
}
</style>
