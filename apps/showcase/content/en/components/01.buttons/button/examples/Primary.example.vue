<script lang="ts" setup>
import { OnyxButton } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxButton label="Default" @click="handleClick" />
  <OnyxButton label="Outline" mode="outline" @click="handleClick" />
  <OnyxButton label="Plain" mode="plain" @click="handleClick" />
</template>
