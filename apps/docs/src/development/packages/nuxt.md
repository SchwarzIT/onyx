---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/nuxt/package.json";
</script>

# @sit-onyx/nuxt

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/@sit-onyx%2Fnuxt.svg)](https://www.npmjs.com/package/@sit-onyx/nuxt)

</div>

{{ packageJson.description }}.

## Changelog

A full changelog can be found [here](/development/packages/changelogs/nuxt).

## Features

- Auto import of all onyx components
- Automatic setup of global styles

## Quick Setup

Install the module in your [Nuxt](https://nuxt.com) application with one command:

```sh
npx nuxi module add @sit-onyx/nuxt@alpha
```

Afterwards you're able to just use all onyx components inside your app and the global styles will automatically be set up for you.
