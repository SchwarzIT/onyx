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
      <div class="page__content">
        <div class="page__headline">
          <OnyxHeadline is="h1" :skeleton="false"> Example headline </OnyxHeadline>
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
.page {
  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xl);
  }

  &__headline {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-md);
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
