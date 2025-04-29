<script lang="ts" setup>
import {
  OnyxButton,
  OnyxInput,
  OnyxPageLayout,
  OnyxRadioGroup,
  OnyxStepper,
  type RadioButtonOption,
} from "../../..";

const handleSubmit = () => {
  // implement your submit logic here...
};

const radioOptions: RadioButtonOption[] = [
  { label: "Green", value: 1 },
  { label: "Red", value: 2 },
  { label: "Pink", value: 3 },
  { label: "Yellow", value: 4 },
];
</script>

<template>
  <OnyxPageLayout skeleton>
    <!-- TODO: fix bug that when using OnyxForm, the skeleton inheritance does not work -->
    <form class="form" @submit.prevent="handleSubmit">
      <OnyxInput label="Favorite band" />

      <OnyxInput label="Favorite password" type="password" />
      <OnyxStepper label="Number of hairs" :min="0" />

      <OnyxRadioGroup label="Color choices" :options="radioOptions" />

      <div class="form__actions">
        <OnyxButton label="Reset" mode="outline" type="reset" />
        <OnyxButton label="Submit" type="submit" />
      </div>
    </form>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--onyx-density-xs);
  }
}
</style>
