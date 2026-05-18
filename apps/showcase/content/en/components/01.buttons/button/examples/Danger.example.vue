<script lang="ts" setup>
import { OnyxButton } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxButton label="Default" color="danger" @click="handleClick" />
  <OnyxButton label="Outline" color="danger" mode="outline" @click="handleClick" />
  <OnyxButton label="Plain" color="danger" mode="plain" @click="handleClick" />
</template>
