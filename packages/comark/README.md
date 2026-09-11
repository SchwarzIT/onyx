<div align="center" style="text-align: center">
<img alt="Onyx logo" src="https://raw.githubusercontent.com/SchwarzIT/onyx/main/packages/assets/src/onyx-brand/signet.svg" height="96px">
</div>

<br>

# @sit-onyx/comark

Render markdown content with [onyx](https://onyx.schwarz/) components.

It's a wrapper for the [@comark/vue](https://www.npmjs.com/package/@comark/vue) package using the onyx design system created by [Schwarz Digits](https://schwarz-digits.de).

For runtime parsing and rendering of markdown use the [`OnyxMarkdown`](#onyxmarkdown) component.
Otherwise use the [`OnyxMarkdownDocument`](#onyxmarkdowndocument) for server and build-time parsing with less client code required.

## Getting Started

### Step 1: Install package

```sh
pnpm add @sit-onyx/comark
```

### Step 2: Import styles

Import the CSS file, either globally or in a single component:

```ts
// make sure to import the MDC styles AFTER the general "sit-onyx" styles
// import "sit-onyx/style.css";
import "@sit-onyx/comark/style.css";
```

## `OnyxMarkdown`

Simple runtime parser and renderer component for markdown.
Just pass your markdown string:

```vue
<!-- App.vue -->
<script setup lang="ts">
import { OnyxMarkdown } from "@sit-onyx/comark";

const content = `# Hello World

This is **markdown** with Comark components.
`;
</script>

<template>
  <!-- It is required to wrap OnyxComark in a Suspense block! -->
  <Suspense>
    <OnyxMarkdown>{{ content }}</OnyxMarkdown>
  </Suspense>
</template>
```

For more details check the [documentation for the `Markdown` component](https://comark.dev/rendering/vue#markdown).

## `OnyxComarkRenderer`

Renders a pre-parsed MarkdownDocument without any parsing. Use it when you parse on the server, in a build step, or via an API, so no parser or plugin code is shipped to the browser.

### 1. Parse on the server/buildtime

```ts
// server.ts
import { createMarkdownParser } from "comark";
import { readFile } from "node:fs/promises";

const parse = createMarkdownParser();

// In your server handler
export async function getContentDocument(slug: string) {
  const markdown = await readFile(`content/${slug}.md`, "utf-8");
  return parse(markdown);
}
```

### 2. Render the parsed tree

```vue
<!-- ContentPage.vue -->
<script setup lang="ts">
import { OnyxMarkdownDocument } from "@sit-onyx/comark";

const { slug } = defineProps<{ slug: string }>();

const res = await fetch(`/api/content/${slug}`);
const document = await res.json();
</script>

<template>
  <OnyxMarkdownDocument :value="document" />
</template>
```
