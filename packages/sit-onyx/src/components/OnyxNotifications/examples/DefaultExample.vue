<script lang="ts" setup>
import { OnyxButton, OnyxNotifications, useNotification } from "../../..";

const notification = useNotification();

const showExampleNotifications = () => {
  notification.show({ headline: "Example notification 1", description: "Example description 1" });
  notification.show({ headline: "Example notification 2", description: "Example description 2" });
  notification.show({ headline: "Example notification 3", description: "Example description 3" });
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
