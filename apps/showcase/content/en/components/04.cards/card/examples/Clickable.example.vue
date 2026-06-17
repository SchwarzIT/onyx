<script lang="ts" setup>
import { iconTouchPress } from "@sit-onyx/icons";
import { OnyxCard, OnyxHeadline, OnyxIcon, useToast } from "sit-onyx";

const toast = useToast();

const handleClick = () => {
  // your logic here...
  toast.show({
    headline: "Card clicked",
    description: "Implement your custom logic here...",
  });
};
</script>

<template>
  <OnyxCard class="card" clickable @click="handleClick">
    <OnyxIcon :icon="iconTouchPress" size="48px" />

    <div class="card__content">
      <OnyxHeadline is="h3">Example headline</OnyxHeadline>
      This is an example description for a clickable card.
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  flex-direction: row;
  gap: var(--onyx-density-md);

  &:hover {
    background-color: var(--onyx-color-base-neutral-200);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-2xs);
    flex-grow: 1;
  }
}
</style>
