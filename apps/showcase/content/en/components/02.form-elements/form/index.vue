<script lang="ts" setup>
import {
  OnyxButton,
  OnyxCard,
  OnyxForm,
  OnyxInput,
  OnyxStepper,
  OnyxUnstableDatePickerV2,
} from "sit-onyx";
</script>

<template>
  <OnyxCard class="card">
    <OnyxForm class="onyx-grid" @submit.prevent>
      <OnyxInput class="onyx-grid-span-full" label="Email" type="email" placeholder="Placeholder" />

      <OnyxUnstableDatePickerV2 class="onyx-grid-span-2" label="Date" placeholder="mm/dd/yyyy" />
      <OnyxStepper class="onyx-grid-span-2" label="Number" placeholder="0" />

      <OnyxButton class="onyx-grid-span-full" label="Submit" type="submit" />
    </OnyxForm>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  zoom: 0.425;
}
</style>
