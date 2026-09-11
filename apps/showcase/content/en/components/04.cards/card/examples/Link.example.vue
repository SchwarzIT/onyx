<script lang="ts" setup>
import { iconArrowSmallRight, iconExpandWindow, iconPlaceholder } from "@sit-onyx/icons";
import { isInternalLink, OnyxCard, OnyxCardProps, OnyxHeadline, OnyxIcon } from "sit-onyx";
import { computed } from "vue";

const link: OnyxCardProps["link"] = { href: "https://onyx.schwarz", target: "_blank" };

// we want to show a different arrow icon based on whether the link is internal (same application) or external
const isInternal = computed(() => {
  if (!link) return;
  const normalizedLink = typeof link === "string" ? { href: link } : link;
  return isInternalLink(normalizedLink.href);
});
</script>

<template>
  <OnyxCard class="card" :link>
    <OnyxIcon :icon="iconPlaceholder" size="48px" />

    <div class="card__content">
      <OnyxHeadline is="h3">Example headline</OnyxHeadline>
      This is an example description for a link card.
    </div>

    <OnyxIcon class="card__arrow" :icon="isInternal ? iconArrowSmallRight : iconExpandWindow" />
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

  &__arrow {
    align-self: center;
  }
}
</style>
