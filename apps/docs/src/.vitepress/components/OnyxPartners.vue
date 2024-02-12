<script lang="ts" setup>
import { VPHomeSponsors } from "vitepress/theme";

const partners = [
  {
    tier: "Special Partners",
    size: "big",
    items: [
      { name: "STACKIT", img: "/images/runs-on-stackit.svg", url: "https://www.stackit.de" },
      { name: "WaWi Nexus", img: "/images/wawi-logo.svg" },
      { name: "CoreUI", img: "/images/coreui-logo.svg" },
    ],
  },
  {
    tier: "Tools & Technologies",
    items: [
      { name: "Vue.js", img: "/images/vue-logo.svg", url: "https://vuejs.org" },
      { name: "Figma", img: "/icons/figma.svg", url: "https://www.figma.com" },
      { name: "Storybook", img: "/images/storybook-logo.svg", url: "https://storybook.js.org" },
      { name: "VitePress", img: "/images/vitepress-logo.svg", url: "https://vitepress.dev" },
    ],
  },
];
</script>

<template>
  <VPHomeSponsors message="Thanks to our Partners" :data="partners" />
</template>
