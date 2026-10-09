<script lang="ts" setup>
import { OnyxMarkdown } from "@sit-onyx/comark";

const markdown = `# Markdown example

This is **markdown** content rendered with [Comark](https://comark.dev) and [Onyx](https://onyx.schwarz).

---

## Table

It can also render tables:

| Column A | Column B | Column C |
| -------- | :------: | -------: |
| Test     |   Test   |     Test |
| Test     |   Test   |     Test |

## Accordions

<details>
<summary>Example accordion label</summary>
Accordion content here...this can also be markdown again.
</details>
`;
</script>

<template>
  <Suspense>
    <OnyxMarkdown>{{ markdown }}</OnyxMarkdown>
  </Suspense>
</template>
