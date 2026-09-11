<script lang="ts" setup>
import { iconLogin } from "@sit-onyx/icons";
import { OnyxUnstableNavButton } from "sit-onyx";

const handleClick = () => {
  // handle click here...
};
</script>

<template>
  <OnyxUnstableNavButton label="Login" :icon="iconLogin" color="primary" @click="handleClick" />
</template>
