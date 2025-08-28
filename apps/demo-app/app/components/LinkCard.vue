<script lang="ts" setup>
import { iconArrowSmallRight, iconExpandWindow } from "@sit-onyx/icons";
import { OnyxCard, type OnyxCardProps, OnyxIcon, extractLinkProps, isInternalLink } from "sit-onyx";

export type LinkCardProps = Required<Pick<OnyxCardProps, "link">> & {
  /**
   * Headline text.
   */
  headline: string;
  /**
   * Icon to show.
   */
  icon: string;
};

const props = defineProps<LinkCardProps>();

const isExternal = computed(() => {
  const link = extractLinkProps(props.link);
  return !isInternalLink(link.href);
});
</script>

<template>
  <OnyxCard class="card" v-bind="props">
    <div>
      <div class="card__header">
        <OnyxHeadline is="h2"> {{ props.headline }}</OnyxHeadline>
        <OnyxIcon :icon="isExternal ? iconExpandWindow : iconArrowSmallRight" />
      </div>

      <p class="card__description onyx-text--small">Lorem ipsum dolor sit amet consectetur.</p>
    </div>

    <OnyxIcon :icon="props.icon" size="64px" color="primary" />
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  --onyx-card-gap: var(--onyx-density-md);

  &:hover {
    background-color: var(--onyx-color-base-neutral-200);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--onyx-card-gap);
    width: 100%;
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-medium);
    margin-top: var(--onyx-density-3xs);
  }
}
</style>
