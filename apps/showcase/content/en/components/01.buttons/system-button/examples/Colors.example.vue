<script lang="ts" setup>
import { OnyxSystemButton } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxSystemButton label="Intense" @click="handleClick" />
  <OnyxSystemButton label="Medium" color="medium" @click="handleClick" />
  <OnyxSystemButton label="Soft" color="soft" @click="handleClick" />
</template>
