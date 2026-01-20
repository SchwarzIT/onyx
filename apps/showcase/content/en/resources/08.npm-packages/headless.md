---
title: Headless
---

# Headless

---

# @sit-onyx/headless

:npm-package-badge{package="@sit-onyx/headless"}

{{ packageJson.description }}.

Inspired by [Melt UI](https://melt-ui.com).

## Changelog

A full changelog can be found [here](/development/packages/changelogs/headless).

## Installation

Install the npm package with your corresponding package manager:

:npm-install-code-tabs{packages="@sit-onyx/headless"}

## Composables

### useComboBox

```vue
<script lang="ts" setup>
import { createCombobox } from "@sit-onyx/headless";

const {
  elements: {
    ...
  }
 } = createCombobox();
</script>
```
