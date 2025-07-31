<script lang="ts" setup>
import { iconCircleAttention } from "@sit-onyx/icons";
import { OnyxButton, OnyxNotifications, useNotification } from "../../../index.js";

const notification = useNotification();

const showExampleNotifications = () => {
  notification.show({
    headline: "Example notification 1",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
    buttons: [
      { label: "Button", color: "neutral", onClick: () => alert("Button clicked") },
      { label: "Button", onClick: () => alert("Button clicked") },
    ],
  });
  notification.show({
    headline: "Example notification 2",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
    icon: iconCircleAttention,
  });
  notification.show({
    headline: "Example notification 3",
    description:
      "Lorem ipsum dolor sit amet consectetur. Dui purus quisque est varius vulputate. Ut odio dui diam pulvinar velit mollis cursus eu ut.",
  });
};
</script>

<template>
  <div class="example">
    <OnyxButton label="Show example notifications" @click="showExampleNotifications" />
    <OnyxNotifications />
  </div>
</template>

<style lang="scss" scoped>
.example {
  height: 24rem;
}
</style>
