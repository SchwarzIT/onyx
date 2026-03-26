<script
  setup
  lang="ts"
  generic="
    TComponent extends Component<{ modelValue?: TModelValue | null | undefined }>,
    TModelValue = unknown
  "
>
import { computed, type Component } from "vue";

const props = defineProps<{
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
}>();

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

const bind = computed(() => {
  // for now some components already use the new OnyxFormElementV2 props so we need to check them
  // here so we can use the correct properties below
  const isFormElementV2 = ["OnyxTimePicker"].includes(
    ("__name" in props.is ? props.is.__name : props.is.name) ?? "",
  );

  return {
    hideLabel: true,
    label: isFormElementV2 ? { label: props.label, hidden: true } : props.label,
    modelValue: props.modelValue,
    showError: false,
    "onUpdate:modelValue": (v: TModelValue) => emit("update:modelValue", v),
  };
});
</script>

<template>
  <component :is="props.is" v-bind="bind" class="onyx-component onyx-data-grid-form-wrapper" />
</template>

<style lang="scss">
@use "../../../styles/mixins/layers.scss";

@include layers.override() {
  .onyx-data-grid-form-wrapper,
  .onyx-data-grid-form-wrapper :is(.onyx-select-input, .onyx-time-picker-input) {
    // OnyxFormeElement based components
    --border-color: transparent;
    --border-style: none;
    --border-radius: 0;
    --background-color: transparent;
    --outline-style: none;
    --onyx-outline-width: 0;
    --padding-horizontal: 0;

    // OnyxFormeElementV2 based components
    --onyx-form-element-v2-border-size: 0;
    --onyx-form-element-v2-border-radius: 0;
    --onyx-form-element-v2-background: transparent;
    --onyx-outline-width: 0;
    --onyx-form-element-v2-padding-inline: 0rem;

    .onyx-table :is(td, th):has(&) {
      padding-block: 0;
    }
  }

  .onyx-data-grid-form-wrapper {
    &.onyx-slider {
      padding: var(--onyx-density-xs) var(--onyx-density-sm);
    }
  }
}
</style>
