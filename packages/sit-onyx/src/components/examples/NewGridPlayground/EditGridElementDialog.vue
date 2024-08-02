<script lang="ts" setup>
import { ref, toRaw } from "vue";
import { ONYX_BREAKPOINTS, type OnyxBreakpoint } from "../../../types";
import OnyxButton from "../../OnyxButton/OnyxButton.vue";
import OnyxCheckbox from "../../OnyxCheckbox/OnyxCheckbox.vue";
import OnyxDialog from "../../OnyxDialog/OnyxDialog.vue";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import OnyxStepper from "../../OnyxStepper/OnyxStepper.vue";

export type GridElementConfig = {
  columnCount: number;
  breakpoints?: Partial<Record<OnyxBreakpoint, number>>;
};

const props = defineProps<{
  open?: boolean;
}>();

const emit = defineEmits<{
  close: [];
  submit: [element: GridElementConfig];
}>();

const state = ref<Partial<GridElementConfig> & Required<Pick<GridElementConfig, "breakpoints">>>({
  breakpoints: {},
});

const handleSubmit = () => {
  emit("submit", structuredClone(toRaw(state.value as GridElementConfig)));
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
    <form @submit.prevent="handleSubmit" @reset="emit('close')">
      <div class="dialog__header">
        <OnyxHeadline is="h2">{{ label }}</OnyxHeadline>

        <p class="dialog__description onyx-text--small">
          Define the responsive behavior of the object by setting the quantity of columns for every
          breakpoint.
        </p>

        <OnyxStepper
          v-model="state.columnCount"
          label="Default column count"
          placeholder="Default column count"
          v-bind="STEPPER_VALIDATIONS"
          required
        />
      </div>

      <div class="dialog__body">
        <div class="dialog__grid">
          <div
            v-for="(_, breakpoint) in ONYX_BREAKPOINTS"
            :key="breakpoint"
            class="dialog__breakpoint"
          >
            <OnyxCheckbox
              :label="`${breakpoint.toUpperCase()} breakpoint`"
              :value="breakpoint"
              :disabled="!state.columnCount"
              @update:model-value="handleCheckboxChange($event, breakpoint)"
            />
            <OnyxStepper
              v-model="state.breakpoints[breakpoint]"
              label="Column count"
              v-bind="STEPPER_VALIDATIONS"
              hide-label
              :disabled="!state.columnCount"
            />
          </div>
        </div>

        <div class="dialog__actions">
          <OnyxButton label="Cancel" color="neutral" type="reset" />
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
}
</style>
