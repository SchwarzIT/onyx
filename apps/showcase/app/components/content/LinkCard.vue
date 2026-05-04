<script lang="ts" setup>
import { iconChevronRightSmall, iconExpandWindow } from "@sit-onyx/icons";
import { isInternalLink, type OnyxCardProps, type SharedLinkProps } from "sit-onyx";

const props = defineProps<
  Required<Pick<OnyxCardProps, "link">> & {
    headline: string;
  }
>();

const normalizedLink = computed<SharedLinkProps>(() => {
  const link: SharedLinkProps = typeof props.link === "string" ? { href: props.link } : props.link;
  return { target: !isInternalLink(link.href) ? "_blank" : undefined, ...link };
});
</script>

<template>
  <OnyxCard class="card" :link="normalizedLink">
    <OnyxHeadline is="h3">{{ props.headline }} </OnyxHeadline>
    <OnyxIcon
      :icon="normalizedLink.target === '_blank' ? iconExpandWindow : iconChevronRightSmall"
    />
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
