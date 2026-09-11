<script lang="ts" setup>
import { iconChevronRightSmall, iconExpandWindow } from "@sit-onyx/icons";
import { isInternalLink, type OnyxCardProps, type SharedLinkProps } from "sit-onyx";

const props = defineProps<
  Required<Pick<OnyxCardProps, "link">> & {
    headline: string;
  }
>();

const slots = defineSlots<{
  default?(): unknown;
}>();

const normalizedLink = computed<SharedLinkProps>(() => {
  const link: SharedLinkProps = typeof props.link === "string" ? { href: props.link } : props.link;
  return { target: isInternalLink(link.href) ? undefined : "_blank", ...link };
});
</script>

<template>
  <OnyxCard class="card" :link="normalizedLink">
    <div class="card__headline">
      <OnyxHeadline is="h3">{{ props.headline }} </OnyxHeadline>
      <OnyxIcon
        :icon="normalizedLink.target === '_blank' ? iconExpandWindow : iconChevronRightSmall"
      />
    </div>

    <div v-if="slots.default" class="card__content">
      <slot></slot>
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  &:hover {
    background-color: var(--onyx-color-base-neutral-200);
  }

  &__headline {
    display: flex;
    gap: var(--onyx-card-gap);
    justify-content: space-between;
    flex-grow: 1;
  }

  &__content {
    > :first-child {
      margin-top: 0;
    }
    > :last-child {
      margin-bottom: 0;
    }
  }
}
</style>
