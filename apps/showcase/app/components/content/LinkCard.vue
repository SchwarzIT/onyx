<script lang="ts" setup>
import { iconChevronRightSmall } from "@sit-onyx/icons";
import type { OnyxCardProps } from "sit-onyx";

const props = defineProps<
  Required<Pick<OnyxCardProps, "link">> & {
    headline: string;
  }
>();
</script>

<template>
  <OnyxCard class="card" :link="props.link">
    <OnyxHeadline is="h3">{{ props.headline }} </OnyxHeadline>
    <OnyxIcon :icon="iconChevronRightSmall" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  flex-direction: row;
  justify-content: space-between;

  &:hover {
    background-color: var(--onyx-color-base-neutral-200);
  }
}
</style>
