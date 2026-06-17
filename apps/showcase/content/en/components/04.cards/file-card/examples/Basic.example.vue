<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { MediaType, OnyxFileCard } from "sit-onyx";
import { onBeforeUnmount } from "vue";

// create an initial dummy file for this example
const file = new File([iconPlaceholder], "icon-placeholder.svg", { type: "image/svg+xml" });
const link = URL.createObjectURL(file);
onBeforeUnmount(() => URL.revokeObjectURL(link));
</script>

<template>
  <OnyxFileCard
    :filename="file.name"
    :size="file.size"
    :type="file.type as MediaType"
    :link="{ href: link, target: '_blank' }"
  />
</template>
