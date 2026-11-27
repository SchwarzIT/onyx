<script lang="ts" setup>
import { iconLogin } from "@sit-onyx/icons";
import { OnyxNavButton } from "sit-onyx";

const handleClick = () => {
  // handle click here...
};
</script>

<template>
  <OnyxNavButton label="Login" :icon="iconLogin" color="primary" @click="handleClick" />
</template>
