<script lang="ts" setup>
import { type OnyxBreakpoint, ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { ref, toRaw, watch } from "vue";
import OnyxBasicDialog from "../../../OnyxBasicDialog/OnyxBasicDialog.vue";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxCheckbox from "../../../OnyxCheckbox/OnyxCheckbox.vue";
import OnyxHeadline from "../../../OnyxHeadline/OnyxHeadline.vue";
import OnyxStepper from "../../../OnyxStepper/OnyxStepper.vue";

export type GridElementConfig = {
  isFullWidth?: boolean;
  columnCount?: number;
  breakpoints?: Partial<Record<OnyxBreakpoint, number>>;
};

const props = defineProps<{
  /**
   * Controls if the dialog is shown or not.
   * State is reset when the dialog is closed.
   */
  open?: boolean;
  /**
   * Initial value. Useful if editing an existing element.
   */
  initialValue?: GridElementConfig;
}>();

const emit = defineEmits<{
  close: [];
  apply: [element: GridElementConfig];
  delete: [];
}>();

const state = ref<Partial<GridElementConfig> & Required<Pick<GridElementConfig, "breakpoints">>>({
  breakpoints: {},
});

const cloneElement = <T extends object>(value: T): T => structuredClone(toRaw(value));

// reset state when dialog is closed
watch([() => props.open, () => props.initialValue], () => {
  if (props.initialValue) {
    state.value = { breakpoints: {}, ...cloneElement(props.initialValue) };
  } else {
    state.value = { breakpoints: {} };
  }
});

const handleSubmit = () => {
  emit("apply", cloneElement(state.value as GridElementConfig));
};

const label = "Column configuration";
const STEPPER_VALIDATIONS = { min: 1, max: 20 } as const;

const handleCheckboxChange = (isChecked: boolean, breakpoint: OnyxBreakpoint) => {
  if (!isChecked) {
    delete state.value.breakpoints[breakpoint];
  } else if (!state.value.breakpoints[breakpoint]) {
    state.value.breakpoints[breakpoint] = state.value.columnCount ?? 1;
  }
};
</script>

<template>
  <OnyxBasicDialog
    :label="label"
    :open="props.open"
    class="dialog"
    modal
    @update:open="(newOpen) => !newOpen && emit('close')"
  >
    <form @submit.prevent="handleSubmit">
      <div class="dialog__header">
        <OnyxHeadline is="h2">{{ label }}</OnyxHeadline>

        <OnyxCheckbox v-model="state.isFullWidth" label="Full Width" value="is-full-width" />

        <template v-if="!state.isFullWidth">
          <p class="dialog__description onyx-text--small">
            Define the responsive behavior of the component by setting the number of columns.
          </p>

          <OnyxStepper
            v-model="state.columnCount"
            label="Default number of columns"
            placeholder="Default column count"
            v-bind="STEPPER_VALIDATIONS"
            :precision="0"
            autofocus
            hide-label
          />
        </template>
      </div>

      <div class="dialog__body">
        <template v-if="!state.isFullWidth">
          <div class="dialog__grid">
            <div
              v-for="(_, breakpoint) in ONYX_BREAKPOINTS"
              :key="breakpoint"
              class="dialog__breakpoint"
            >
              <OnyxCheckbox
                class="dialog__checkbox"
                :label="`${breakpoint.toUpperCase()} breakpoint`"
                :model-value="!!state.breakpoints[breakpoint]"
                :value="breakpoint"
                :disabled="!state.columnCount"
                @update:model-value="handleCheckboxChange($event, breakpoint)"
              />
              <OnyxStepper
                v-model="state.breakpoints[breakpoint]"
                :label="`Number of columns for breakpoint ${breakpoint}`"
                v-bind="STEPPER_VALIDATIONS"
                :precision="0"
                hide-label
                :disabled="!state.columnCount"
              />
            </div>
          </div>
        </template>

        <p v-else class="dialog__description onyx-text--small">
          The grid element will always span a full row and not share any space with other elements.
        </p>

        <div class="dialog__actions">
          <OnyxButton
            v-if="props.initialValue"
            label="Delete"
            color="danger"
            @click="emit('delete')"
          />
          <OnyxButton label="Cancel" color="neutral" @click="emit('close')" />
          <OnyxButton label="Apply" type="submit" />
        </div>
      </div>
    </form>
  </OnyxBasicDialog>
</template>

<style lang="scss" scoped>
.dialog {
  --onyx-basic-dialog-padding: 0;
  width: 30rem;

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-xs);
    padding: var(--onyx-density-md);
    background-color: var(--onyx-color-base-background-tinted);
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
    margin-bottom: var(--onyx-spacing-2xs);
  }

  &__body {
    padding: var(--onyx-density-md);
  }

  &__grid {
    display: grid;
    gap: var(--onyx-density-md);
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }

  &__breakpoint {
    border-radius: var(--onyx-radius-sm);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);

    .onyx-stepper {
      padding: var(--onyx-density-sm);
    }

    &:has(input:enabled) {
      background-color: var(--onyx-color-base-neutral-200);
    }

    &:has(input:checked) {
      border-color: var(--onyx-color-component-border-primary);
      background-color: var(--onyx-color-base-primary-100);
    }

    &:has(input:disabled) {
      border-color: var(--onyx-color-component-border-disabled);
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--onyx-density-md);
    margin-top: var(--onyx-density-md);
  }

  &__checkbox {
    :deep(.onyx-checkbox) {
      width: 100%;
    }
  }
}
</style>
