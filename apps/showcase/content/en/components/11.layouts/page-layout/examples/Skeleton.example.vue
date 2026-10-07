<script lang="ts" setup>
import {
  OnyxAppLayout,
  OnyxButton,
  OnyxForm,
  OnyxHeadline,
  OnyxInput,
  OnyxPageLayout,
  OnyxStepper,
} from "sit-onyx";

const handleSubmit = () => {
  // implement your submit logic here...
};
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout skeleton>
      <div class="onyx-grid">
        <div class="headline">
          <OnyxHeadline is="h1" class="onyx-grid-span-full" :skeleton="false">
            Example headline
          </OnyxHeadline>

          <OnyxButton label="Button" />
        </div>

        <OnyxForm class="onyx-grid" @submit.prevent="handleSubmit">
          <OnyxInput class="onyx-grid-span-4" label="Name" />
          <OnyxStepper class="onyx-grid-span-4" label="Age" />
        </OnyxForm>
      </div>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.headline {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-md);
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
