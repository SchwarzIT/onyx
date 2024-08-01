<script lang="ts" setup>
import { ref } from "vue";
import { ONYX_BREAKPOINTS, type OnyxBreakpoint } from "../../../types";
import OnyxButton from "../../OnyxButton/OnyxButton.vue";
import OnyxDialog from "../../OnyxDialog/OnyxDialog.vue";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import OnyxSelect from "../../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../../OnyxSelect/types";
import OnyxStepper from "../../OnyxStepper/OnyxStepper.vue";

export type GridElementData = {
  columnCount: number;
  breakpoint?: OnyxBreakpoint;
};

const props = defineProps<{
  label: string;
  open?: boolean;
}>();

const emit = defineEmits<{
  close: [];
  submit: [element: GridElementData];
}>();

const state = ref<Partial<GridElementData>>({
  columnCount: 1,
});

const breakpointOptions = Object.keys(ONYX_BREAKPOINTS).map<SelectOption>((breakpoint) => ({
  label: breakpoint,
  value: breakpoint,
}));

const handleSubmit = () => {
  emit("submit", { ...(state.value as GridElementData) });
};
</script>

<template>
  <OnyxDialog :label="props.label" :open="props.open" modal @close="emit('close')">
    <div class="content">
      <OnyxHeadline is="h2">{{ props.label }}</OnyxHeadline>

      <form @submit.prevent="handleSubmit">
        <OnyxStepper v-model="state.columnCount" label="Column count" :min="1" :max="20" required />

        <OnyxSelect
          v-model="state.breakpoint"
          label="Breakpoint"
          list-label="List of breakpoints"
          :options="breakpointOptions"
          placeholder="None"
        />

        <div class="content__actions">
          <OnyxButton label="Cancel" color="neutral" @click="emit('close')" />
          <OnyxButton label="Add" type="submit" />
        </div>
      </form>
    </div>
  </OnyxDialog>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);

  form {
    display: contents;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--onyx-grid-gutter);
  }
}
</style>
