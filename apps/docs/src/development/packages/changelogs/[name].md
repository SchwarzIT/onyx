---
title: Changelog
---

<script lang="ts" setup>
import { useData } from "vitepress";

const { params } = useData();
</script>

# Changelog

Below you can find a full list of changes for the current and previous versions.

<div v-if="params.name === 'figma-utils'">

<!--@include: @/../../../packages/figma-utils/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'headless'">

<!--@include: @/../../../packages/headless/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'sit-onyx'">

<!--@include: @/../../../packages/sit-onyx/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'storybook-utils'">

<!--@include: @/../../../packages/storybook-utils/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'vitepress-theme'">

<!--@include: @/../../../packages/vitepress-theme/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'icons'">

<!--@include: @/../../../packages/icons/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'chartjs-plugin'">

<!--@include: @/../../../packages/chartjs-plugin/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'nuxt'">

<!--@include: @/../../../packages/nuxt/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'playwright-utils'">

<!--@include: @/../../../packages/playwright-utils/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'nuxt-docs'">

<!--@include: @/../../../packages/nuxt-docs/CHANGELOG.md-->

</div>

<div v-else>
  <h1>Changelogs</h1>
  <p>No changelog found for package "{{ params.name }}".</p>
  <p>Please create a bug report using the link in the header above.</p>
</div>
