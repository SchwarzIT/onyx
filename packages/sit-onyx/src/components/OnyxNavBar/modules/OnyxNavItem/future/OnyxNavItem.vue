<script setup lang="ts">
import OnyxMenuItem from "../../OnyxMenuItem/OnyxMenuItem.vue";
import { type OnyxNavItemProps } from "./types";

const props = defineProps<OnyxNavItemProps>();
</script>

<template>
  <OnyxMenuItem :active="props.active" :href="props.href ?? 'javascript:void(0)'">
    <slot></slot>
  </OnyxMenuItem>
</template>
