<script lang="ts" setup>
import { iconBellRing } from "@sit-onyx/icons";
import { OnyxButton, useToast } from "sit-onyx";

const toast = useToast();

const showToast = () => {
  toast.show({
    headline: "Information",
    description: "Click this toast to trigger a custom action.",
    clickable: true,
    onClick: () => {
      window.alert("Toast clicked!");
    },
  });
};
</script>

<template>
  <OnyxButton label="Show toast" :icon="iconBellRing" @click="showToast" />
</template>
