<script lang="ts" setup>
import { VPHomeSponsors } from "vitepress/theme";

const sponsors = [
  {
    tier: "Special Partners",
    size: "big",
    items: [
      {
        name: "STACKIT",
        img: "/runs-on-stackit.svg",
        url: "https://www.stackit.de",
      },
    ],
  },
];
</script>

<template>
  <VPHomeSponsors message="Thanks to our Partners" :data="sponsors" />
</template>
