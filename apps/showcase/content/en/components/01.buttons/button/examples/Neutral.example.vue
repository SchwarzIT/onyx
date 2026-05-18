<script lang="ts" setup>
import { OnyxButton } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxButton label="Default" color="neutral" @click="handleClick" />
  <OnyxButton label="Outline" color="neutral" mode="outline" @click="handleClick" />
  <OnyxButton label="Plain" color="neutral" mode="plain" @click="handleClick" />
</template>
