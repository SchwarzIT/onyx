<script lang="ts" setup>
import { VPHomeSponsors } from "vitepress/theme";
import coreUILogo from "../../assets/coreui-logo.svg";
import stackitLogo from "../../assets/runs-on-stackit.svg";
import storybookLogo from "../../assets/storybook-logo.svg";
import vitepressLogo from "../../assets/vitepress-logo.svg";
import vueLogo from "../../assets/vue-logo.svg";
import waWiLogo from "../../assets/wawi-logo.svg";

const partners = [
  {
    tier: "Special Partners",
    size: "big",
    items: [
      { name: "STACKIT", img: stackitLogo, url: "https://www.stackit.de" },
      { name: "WaWi Nexus", img: waWiLogo },
      { name: "CoreUI", img: coreUILogo },
    ],
  },
  {
    tier: "Tools & Technologies",
    items: [
      { name: "Vue.js", img: vueLogo, url: "https://vuejs.org" },
      { name: "Figma", img: "/icons/figma.svg", url: "https://www.figma.com" },
      { name: "Storybook", img: storybookLogo, url: "https://storybook.js.org" },
      { name: "VitePress", img: vitepressLogo, url: "https://vitepress.dev" },
    ],
  },
];
</script>

<template>
  <VPHomeSponsors message="Thanks to our Partners" :data="partners" />
</template>
