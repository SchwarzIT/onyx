<script lang="ts" setup>
import { iconChart, iconTextSelector, iconToolTable } from "@sit-onyx/icons";
import { useI18n } from "vue-i18n";
import bannerImg from "~/assets/images/banner.webp";
import coverImg from "~/assets/images/cover.webp";
import onyxLogo from "~/assets/images/onyx-logo.svg?raw";
import type { LinkCardProps } from "../components/LinkCard.vue";

definePageMeta({ layout: false });

const { t } = useI18n();

const cards = computed<LinkCardProps[]>(() => [
  {
    headline: t("dataGrid.pageName"),
    link: "/data-grid",
    icon: iconToolTable,
  },
  {
    headline: t("forms"),
    link: "/forms",
    icon: iconTextSelector,
  },
  {
    headline: t("charts.pageName"),
    link: "/charts",
    icon: iconChart,
  },
  {
    headline: t("onyxDocs"),
    link: {
      href: "https://onyx.schwarz",
      target: "_blank",
    },
    icon: onyxLogo,
  },
]);
</script>

<template>
  <NuxtLayout name="default" no-padding>
    <Banner :src="bannerImg" />

    <div class="content onyx-grid-layout">
      <div class="onyx-grid">
        <LinkCard
          v-for="card in cards"
          :key="card.headline"
          class="onyx-grid-span-4 onyx-grid-md-span-3"
          v-bind="card"
        />
      </div>

      <div class="overview">
        <OnyxHeadline is="h1">{{ t("overview") }}</OnyxHeadline>

        <div class="onyx-grid">
          <BackgroundImageCard class="onyx-grid-span-8 onyx-grid-md-span-6" :src="coverImg" />
          <VotingCard class="onyx-grid-span-4 onyx-grid-md-span-3" />
          <VotingCard class="onyx-grid-span-4 onyx-grid-md-span-3" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.content {
  padding-top: 0;
  margin-top: calc(-1 * var(--onyx-spacing-3xl));
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);
}

.overview {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-sm);
}
</style>
