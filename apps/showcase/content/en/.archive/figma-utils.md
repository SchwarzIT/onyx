---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../../packages/figma-utils/package.json";
</script>

# @sit-onyx/figma-utils

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/@sit-onyx%2Ffigma-utils.svg)](https://www.npmjs.com/package/@sit-onyx/figma-utils)

</div>

{{ packageJson.description }}.

## Changelog

A full changelog can be found [here](/development/packages/changelogs/figma-utils).

## Use as CLI <Badge text="recommended" />

For a list of supported commands and options, run:

```sh
npx @sit-onyx/figma-utils --help
```

::: tip Usage in CI
If you are using the CLI in CI (e.g. via GitHub actions or Azure pipelines), we recommend that you specify the major version that you want to
use to prevent possible future breaking changes that might disrupt your pipeline. Example:

```sh
npx @sit-onyx/figma-utils@1 --help
```

:::

## Use as npm package

If you don't want to use the CLI, this package also provides utility functions for importing data from the Figma API.
This is useful if you want to further customize the CLI commands to have full control over the output.

Install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add @sit-onyx/figma-utils
```

```sh [npm]
npm install @sit-onyx/figma-utils
```

```sh [yarn]
yarn install @sit-onyx/figma-utils
```

:::

### Import variables as CSS

::: info CLI command
Importing variables is also supported via CLI. For more information, run:

```sh
npx @sit-onyx/figma-utils import-variables --help
```

:::

Alternatively, you can implement it manually for full control and customization:

```ts
import fs from "node:fs";
import path from "node:path";
import { fetchFigmaVariables, generateAsCSS, parseFigmaVariables } from "@sit-onyx/figma-utils";

const FILE_KEY = "your-figma-file-key";
const FIGMA_TOKEN = "your-figma-access-token";

// fetch variables from Figma API
const data = await fetchFigmaVariables(FILE_KEY, FIGMA_TOKEN);

// parse variables into a readable and normalized format
// note: variables and collections that are set to "Hide from publishing" in Figma
// will not be parsed. If you face missing variables, please ask your UX designer
// to check the Figma settings
const parsedVariables = parseFigmaVariables(data);

// generate .css files for every Figma mode
parsedVariables.forEach((mode) => {
  // get .css file content
  const fileContent = generateAsCSS(mode);

  // write content as a file
  const filename = mode.modeName ? `variables-${mode.modeName}.css` : "variables.css";
  const fullPath = path.join(process.cwd(), filename);
  fs.writeFileSync(fullPath, fileContent);
});
```

### Import icons

::: info CLI command
Importing icons is also supported via CLI. For more information, run:

```sh
npx @sit-onyx/figma-utils import-icons --help
```

:::

Alternatively, you can implement it manually for full control and customization:

```ts
import fs from "node:fs";
import path from "node:path";
import {
  fetchFigmaComponents,
  optimizeSvg,
  parseComponentsToIcons,
  fetchFigmaSVGs,
  writeIconMetadata,
} from "@sit-onyx/figma-utils";

const FILE_KEY = "your-figma-file-key";
const FIGMA_TOKEN = "your-figma-access-token";
const ICON_PAGE_ID = "your-page-id-that-contains-the-icons"; // e.g. "1:345"

// fetch icon components from Figma API
const data = await fetchFigmaComponents(FILE_KEY, FIGMA_TOKEN);

// parse components into a normalized format
const parsedIcons = parseComponentsToIcons({
  components: data.meta.components,
  pageId: ICON_PAGE_ID,
});

// fetch actual SVG content of the icons
const svgContents = await fetchFigmaSVGs(
  FILE_KEY,
  parsedIcons.map(({ id }) => id),
  FIGMA_TOKEN,
);

const outputDirectory = process.cwd();

// write .svg files for all icons
await Promise.all(
  parsedIcons.map((icon) => {
    const content = optimizeSvg(svgContents[icon.id]);
    const fullPath = path.join(outputDirectory, `${icon.name}.svg`);
    return writeFile(fullPath, content, "utf-8");
  }),
);

// optionally write file with metadata (categories, alias names etc.)
await writeIconMetadata(path.join(outputDirectory, "metadata.json"), parsedIcons);
```

### Import flags

::: info CLI command
Importing flags is also supported via CLI. For more information, run:

```sh
npx @sit-onyx/figma-utils import-flags --help
```

:::

Alternatively, you can implement it manually for full control and customization:

```ts
import fs from "node:fs";
import path from "node:path";
import {
  fetchFigmaComponents,
  optimizeSvg,
  parseComponentsToFlags,
  fetchFigmaSVGs,
  writeFlagMetadata,
} from "@sit-onyx/figma-utils";

const FILE_KEY = "your-figma-file-key";
const FIGMA_TOKEN = "your-figma-access-token";
const FLAG_PAGE_ID = "your-page-id-that-contains-the-flags"; // e.g. "1:345"

// fetch flag components from Figma API
const data = await fetchFigmaComponents(FILE_KEY, FIGMA_TOKEN);

// parse components into a normalized format
const parsedFlags = parseComponentsToFlags({
  components: data.meta.components,
  pageId: FLAG_PAGE_ID,
});

// fetch actual SVG content of the flags
const svgContents = await fetchFigmaSVGs(
  FILE_KEY,
  parsedFlags.map(({ id }) => id),
  FIGMA_TOKEN,
);

const outputDirectory = process.cwd();

// write .svg files for all flags
await Promise.all(
  parsedFlags.map((flag) => {
    const content = optimizeSvg(svgContents[icon.id], "image");
    const fullPath = path.join(outputDirectory, `${flag.code}.svg`);
    return writeFile(fullPath, content, "utf-8");
  }),
);

// optionally write file with metadata (country name, continent etc.)
await writeFlagMetadata(path.join(outputDirectory, "metadata.json"), parsedFlags);
```
