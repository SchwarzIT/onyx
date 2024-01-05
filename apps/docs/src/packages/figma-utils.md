---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../packages/figma-utils/package.json";
</script>

# @sit-onyx/figma-utils

[![npm version](https://badge.fury.io/js/@sit-onyx%2Ffigma-utils.svg)](https://www.npmjs.com/package/@sit-onyx/figma-utils)

{{ packageJson.description }}.

## Use as CLI <Badge text="recommended" />

For a list of supported commands and options, run:

```sh
npx @sit-onyx/figma-utils@latest --help
```

::: tip Usage in CI
If you are using the CLI in CI (e.g. via GitHub actions or Azure pipelines), we recommend that you specify the major version that you want to
use to prevent possible future breaking changes that might break your pipeline. Example:

```sh
npx @sit-onyx/figma-utils@1 --help
```

:::

## Use as npm package

If you don't want to use the CLI, this package also provides utility functions for importing data from the Figma API.
This is useful if you want customize the CLI commands to have full control over the output.

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

### Examples

#### Import Figma variables to CSS/SCSS variables

```ts
import fs from "node:fs";
import path from "node:path";
import { fetchFigmaVariables, generateAsCSS, parseFigmaVariables } from "@sit-onyx/figma-utils";

const FILE_KEY = "your-figma-file-key";
const FIGMA_TOKEN = "your-figma-access-token";

// fetch variables from Figma API
const data = await fetchFigmaVariables(FILE_KEY, FIGMA_TOKEN);

// parse variables into a readable and normalized format
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
