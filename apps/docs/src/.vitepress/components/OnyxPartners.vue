<script lang="ts" setup>
import { VPHomeSponsors } from "vitepress/theme";

const sponsors = [
  {
    tier: "Special Partners",
    size: "big",
    items: [
      {
        name: "STACKIT",
        img: new URL("../../assets/runs-on-stackit.svg", import.meta.url).href,
        url: "https://www.stackit.de",
      },
      {
        name: "WaWi Nexus",
        img: new URL("../../assets/wawi-logo.svg", import.meta.url).href,
      },
      {
        name: "CoreUI",
        img: new URL("../../assets/coreui-logo.svg", import.meta.url).href,
      },
    ],
  },
  {
    tier: "Tools & Technologies",
    items: [
      {
        name: "Vue.js",
        img: new URL("../../assets/vue-logo.svg", import.meta.url).href,
        url: "https://vuejs.org",
      },
      {
        name: "Figma",
        img: "/icons/figma.svg",
        url: "https://www.figma.com",
      },
      {
        name: "Storybook",
        img: new URL("../../assets/storybook-logo.svg", import.meta.url).href,
        url: "https://storybook.js.org",
      },
      {
        name: "VitePress",
        img: new URL("../../assets/vitepress-logo.svg", import.meta.url).href,
        url: "https://vitepress.dev",
      },
    ],
  },
];
</script>

<template>
  <VPHomeSponsors message="Thanks to our Partners" :data="sponsors" />
</template>
