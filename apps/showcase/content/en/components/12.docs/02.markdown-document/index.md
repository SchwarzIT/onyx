---
title: Markdown document
componentName: OnyxMarkdownDocument
package: @sit-onyx/comark
status: experimental
---

Renders a pre-parsed markdown document without any parsing. Use it when you parse on the server, in a build step, or via an API, so no parser or plugin code is shipped to the browser. If you need to render raw markdown instead, use our [markdown](/components/docs/markdown) component.

## Installation

<div class="onyx-grid">
<link-card class="onyx-grid-span-4" headline="Installation guide" link="/components/docs/markdown">
If not already installed, please follow the installation guide for our markdown components.
</link-card>
</div>

<br />

## Examples

### Basic

<steps>

::step
#headline
Parse on the server

#default
Parse your raw markdown content on the server, API or during a build step. The actual content can be received from any custom source such as a file, database or more.

```ts [server.ts]
import { createMarkdownParser } from 'comark'
import { readFile } from 'node:fs/promises'

const parse = createMarkdownParser()

// In your server handler
export async function getContentDocument(slug: string) {
  const markdown = await readFile(`content/${slug}.md`, 'utf-8')
  return parse(markdown)
}
```
::

::step
#headline
Render on the client

#default
Load the pre-parsed markdown document from the server and render it using the `OnyxMarkdownDocument` component.

```vue [ContentPage.vue]
<script lang="ts" setup>
import { OnyxMarkdownDocument } from '@sit-onyx/comark'

const { slug } = defineProps<{ slug: string }>()

const res = await fetch(`/api/content/${slug}`)
const document = await res.json()
</script>

<template>
  <OnyxMarkdownDocument :value="document" />
</template>
```
::

</steps>
