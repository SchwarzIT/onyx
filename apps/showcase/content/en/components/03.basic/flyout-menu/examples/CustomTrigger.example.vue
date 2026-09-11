<script lang="ts" setup>
import { iconGlobe } from "@sit-onyx/icons";
import { OnyxButton, OnyxFlyoutMenu, OnyxMenuItem } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxFlyoutMenu label="Choose application language">
    <template #button="{ trigger }">
      <OnyxButton v-bind="trigger" label="English" :icon="iconGlobe" color="neutral" mode="plain" />
    </template>

    <template #options>
      <OnyxMenuItem label="English" active @click="handleClick" />
      <OnyxMenuItem label="German" @click="handleClick" />
      <OnyxMenuItem label="Spanish" @click="handleClick" />
    </template>
  </OnyxFlyoutMenu>
</template>
