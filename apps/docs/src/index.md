---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
markdownStyles: false

hero:
  name: onyx.web
  text: design system
  tagline: A design system and Vue.js component library created by Schwarz IT.
  image:
    src: /images/logo-signet-light.svg
    alt: Logo of the Schwarz Group
  actions:
    - theme: brand
      text: Getting Started
      link: /development/

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
      light: /icons/typescript-dark.svg
      dark: /icons/typescript-light.svg
      alt: TypeScript logo

  - title: Figma library
    details: onyx also offers a Figma library for design purposes. Connecting Design and Development.
    icon:
      light: /icons/figma-dark.svg
      dark: /icons/figma-light.svg
      alt: Figma logo

  - title: Open Source
    details: Open Source and free to use. Released under the Apache-2.0 License.
    icon:
      light: /icons/github-dark.svg
      dark: /icons/github-light.svg
      alt: GitHub logo
---

<script lang="ts" setup>
import OnyxHomePage from "./.vitepress/components/OnyxHomePage.vue"
import OnyxPartners from "./.vitepress/components/OnyxPartners.vue"
import { data } from "./index.data";
</script>

<OnyxHomePage :data="data" />

<OnyxPartners />
