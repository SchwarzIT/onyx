<script lang="ts" setup>
import { onMounted } from "vue";
import OnyxToast from "./OnyxToast.vue";
import { useToast } from "./useToast.js";

const toast = useToast();

onMounted(() => {
  toast.show({ headline: "Example toast 1", duration: 0 });
  toast.show({ headline: "Example toast 2", color: "danger", duration: 0 });
  toast.show({ headline: "Example toast 3", color: "warning", duration: 0 });
  toast.show({
    headline: "Example toast 4",
    description: "This is a example description",
    duration: 0,
  });
  toast.show({ headline: "Test".repeat(32), color: "success", duration: 0 });
});
</script>

<template>
  <OnyxToast />
</template>
