<script lang="ts" setup>
import { iconBellRing, iconCircleAttention } from "@sit-onyx/icons";
import { OnyxButton, useNotification } from "sit-onyx";

const notification = useNotification();

const showExampleNotifications = () => {
  notification.show({
    headline: "Example notification",
    icon: iconCircleAttention,
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
    buttons: [
      { label: "Button", color: "neutral", onClick: () => alert("Button clicked") },
      { label: "Button", onClick: () => alert("Button clicked") },
    ],
  });
};
</script>

<template>
  <OnyxButton label="Show notification" :icon="iconBellRing" @click="showExampleNotifications" />
</template>
