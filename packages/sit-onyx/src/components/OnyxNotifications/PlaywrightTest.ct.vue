<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";
import { onMounted } from "vue";
import OnyxNotifications from "./OnyxNotifications.vue";
import { useNotification } from "./useNotification.js";

const notification = useNotification();

onMounted(() => {
  notification.show({
    headline: "Example notification 1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
    duration: 0,
    buttons: [
      { label: "Button", color: "neutral", onClick: () => alert("Button clicked") },
      { label: "Button", onClick: () => alert("Button clicked") },
    ],
  });
  notification.show({
    headline: "Example notification 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
    duration: 0,
    icon: iconCircleAttention,
  });
  notification.show({
    headline: "Example notification 3",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
    duration: 0,
  });
});
</script>

<template>
  <OnyxNotifications />
</template>
