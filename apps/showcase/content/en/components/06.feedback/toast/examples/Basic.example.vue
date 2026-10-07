<script lang="ts" setup>
import { iconBellRing } from "@sit-onyx/icons";
import { OnyxButton, useToast } from "sit-onyx";

const toast = useToast();

const showExampleToasts = () => {
  toast.show({
    headline: "Information",
    description: "This is an example description",
  });
  toast.show({
    headline: "Error",
    description: "This is an example description",
    color: "danger",
  });
  toast.show({
    headline: "Warning",
    description: "This is an example description",
    color: "warning",
  });
  toast.show({
    headline: "Success",
    description: "This is an example description",
    color: "success",
  });
};
</script>

<template>
  <OnyxButton label="Show toasts" :icon="iconBellRing" @click="showExampleToasts" />
</template>
