<script lang="ts" setup>
import { ref, toRaw, watch } from "vue";
import { ONYX_BREAKPOINTS, type OnyxBreakpoint } from "../../../../types";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxCheckbox from "../../../OnyxCheckbox/OnyxCheckbox.vue";
import OnyxDialog from "../../../OnyxDialog/OnyxDialog.vue";
import OnyxHeadline from "../../../OnyxHeadline/OnyxHeadline.vue";
import OnyxStepper from "../../../OnyxStepper/OnyxStepper.vue";

export type GridElementConfig = {
  columnCount: number;
  breakpoints?: Partial<Record<OnyxBreakpoint, number>>;
};

const props = defineProps<{
  open?: boolean;
  /**
   * Initial value. Useful if editing an existing element.
   */
  initialValue?: GridElementConfig;
}>();

const emit = defineEmits<{
  close: [];
  submit: [element: GridElementConfig];
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
  emit("submit", cloneElement(state.value as GridElementConfig));
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
  <OnyxDialog :label="label" :open="props.open" modal class="dialog" @close="emit('close')">
    <form @submit.prevent="handleSubmit">
      <div class="dialog__header">
        <OnyxHeadline is="h2">{{ label }}</OnyxHeadline>

        <p class="dialog__description onyx-text--small">
          Define the responsive behavior of the component by setting the number of columns.
          Optionally, you can set different configs for each breakpoint.
        </p>

        <OnyxStepper
          v-model="state.columnCount"
          label="Default column count"
          placeholder="Default column count"
          v-bind="STEPPER_VALIDATIONS"
          autofocus
          required
        />
      </div>

      <div class="dialog__body">
        <p class="dialog__description onyx-text--small">
          The breakpoint configs follow a "grater or equal than" logic. Example: For default column
          4 and breakpoint "md" with 8 columns, the component will span 4 columns for breakpoints
          smaller than md and 8 columns for md and larger.
        </p>

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
              :label="`Column count for breakpoint ${breakpoint}`"
              v-bind="STEPPER_VALIDATIONS"
              hide-label
              :disabled="!state.columnCount"
            />
          </div>
        </div>

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
  </OnyxDialog>
</template>

<style lang="scss" scoped>
.dialog {
  padding: 0;
  width: 30rem;
  max-width: 100%;

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
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);

    .onyx-stepper {
      padding: var(--onyx-density-sm);
    }

    &:has(input:checked) {
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-primary-400);
      background-color: var(--onyx-color-base-primary-100);
    }

    &:has(input:enabled) {
      background-color: var(--onyx-color-base-neutral-200);
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--onyx-density-md);
    margin-top: var(--onyx-density-md);
  }

  &__checkbox {
    width: 100%;
  }
}
</style>
