<script lang="ts" setup>
import { OnyxButton, OnyxToast, useToast } from "../..";

const toast = useToast();

const showExampleToasts = () => {
  toast.show({ headline: "Example toast 1" });
  toast.show({ headline: "Example toast 2", color: "danger" });
  toast.show({ headline: "Example toast 3", color: "warning" });
  toast.show({
    headline: "Example toast 4",
    description: "This is an example description",
    color: "success",
  });
};
</script>

<template>
  <div class="onyx-component">
    <OnyxButton label="Show example toasts" @click="showExampleToasts" />
    <OnyxToast />
  </div>
</template>
