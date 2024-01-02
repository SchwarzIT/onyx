# @sit-onyx/figma-utils

Utility functions and CLI for exporting data from the Figma API.

## Use as CLI

For a list of supported commands and options, run:

```sh
npx @sit-onyx/figma-utils --help
```

## Use as npm package

This package also provides utility functions for exporting data from the Figma API.
This is useful if you want customize the CLI commands to have full control over the output.

### Examples

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
