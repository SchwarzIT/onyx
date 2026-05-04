<script lang="ts" setup>
import digitsLogo from "~/assets/images/brands/digits.svg?raw";
import kauflandLogo from "~/assets/images/brands/kaufland.svg?raw";
import lidlLogo from "~/assets/images/brands/lidl.svg?raw";
import prezeroLogo from "~/assets/images/brands/prezero.svg?raw";
import scosLogo from "~/assets/images/brands/scos.svg?raw";
import tailwindLogo from "~/assets/images/brands/tailwind.svg?raw";
import onyxLogo from "~~/public/onyx-logo.svg?raw";
import type { DetailsItem } from "../DetailsList.vue";

const props = defineProps<{
  brand: "onyx" | "lidl" | "kaufland" | "prezero" | "digits" | "schwarzgroup-scos" | "tailwind";
  items?: DetailsItem[];
}>();

const map: Record<typeof props.brand, { image: string; name: string }> = {
  onyx: {
    name: "Onyx (default)",
    image: onyxLogo,
  },
  lidl: {
    name: "Lidl",
    image: lidlLogo,
  },
  kaufland: {
    name: "Kaufland",
    image: kauflandLogo,
  },
  prezero: {
    name: "PreZero",
    image: prezeroLogo,
  },
  digits: {
    name: "Schwarz Digits",
    image: digitsLogo,
  },
  "schwarzgroup-scos": {
    name: "Schwarz Group / SCOS",
    image: scosLogo,
  },
  tailwind: {
    name: "Tailwind",
    image: tailwindLogo,
  },
};

const data = computed(() => map[props.brand]);
</script>

<template>
  <OnyxCard class="card">
    <div class="card__image">
      <OnyxIcon :icon="data.image" size="64px" />
    </div>

    <div class="card__content">
      <OnyxHeadline is="h3">{{ data.name }}</OnyxHeadline>
      <DetailsList v-if="props.items?.length" :items="props.items" />
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  --onyx-card-gap: 0;
  padding: 0;

  &__image {
    padding: var(--onyx-card-padding);
    background-color: var(--onyx-color-base-background-tinted);
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    padding: var(--onyx-card-padding);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-xs);
  }
}
</style>
