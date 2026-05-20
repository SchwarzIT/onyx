<script lang="ts" setup>
import { iconMoreVertical } from "@sit-onyx/icons";
import { OnyxSystemButton } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxSystemButton label="Example label" :icon="iconMoreVertical" @click="handleClick" />
  <OnyxSystemButton label="Example label" @click="handleClick" />
</template>
