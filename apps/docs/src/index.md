---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: onyx
  text: Design system
  tagline: A design system and Vue.js component library created by Schwarz IT.
  image:
    src: /schwarz-group.svg
    alt: Logo of the Schwarz Group
  actions:
    - theme: brand
      text: Getting Started
      link: /components/getting-started

features:
  - title: Powerful
    details: onyx's advanced components are designed for enterprise grade applications. Including everything you need to build your next enterprise or even personal project.
    icon: 🚀
  - title: Flexible and modular
    details: You can build a whole application with onyx or only use a few of our customizable components into an existing application.
    icon: 📦
  - title: Themeable
    details: We provide a well crafted theme out-of-the-box. Feel free to customize it to perfectly fit your look and feel.
    icon: 🎨
  - title: First class DX
    details: Developer Experience is our top priority. onyx is fully written in TypeScript with great type support and generically typed components.
    icon:
      src: /icons/typescript.svg
      alt: TypeScript logo
  - title: Figma library
    details: onyx also offers a Figma library for design purposes. Connecting Design and Development.
    icon:
      src: /icons/figma.svg
      alt: Figma logo
  - title: Open Source
    details: Open Source and free to use. Released under the Apache-2.0 License.
    icon:
      light: /icons/github-dark.svg
      dark: /icons/github-light.svg
      alt: GitHub logo
---

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

<VPHomeSponsors message="Thanks to our Partners" :data="sponsors" />
