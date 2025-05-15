import { Command } from "commander";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { writeIconMetadata } from "../icons/generate.js";
import { parseComponentsToIcons } from "../icons/parse.js";
import { fetchFigmaComponents, fetchFigmaSVGs } from "../index.js";
import { isDirectory } from "../utils/fs.js";
import { optimizeSvg } from "../utils/optimize.js";

export type ImportIconsCommandOptions = {
  fileKey: string;
  token: string;
  pageId: string;
  aliasSeparator: string;
  dir?: string;
  metaFile?: string;
};

export const importIconsCommand = new Command("import-icons")
  .description("CLI tool to import SVG icons from Figma.")
  .requiredOption("-k, --file-key <string>", "Figma file key (required)")
  .requiredOption(
    "-t, --token <string>",
    "Figma access token with scope `file_read` or `files:read` (required)",
  )
  .requiredOption("-p, --page-id <string>", "Figma page ID that contains the icons (required)")
  .option(
    "-d, --dir <string>",
    "Directory to save the icons to. Defaults to current working directory of the script.",
  )
  .option(
    "-m, --meta-file <string>",
    'JSON filename/path to write icon metadata to (categories, alias names etc.). Must end with ".json". If unset, no metadata will be generated.',
  )
  .option(
    "-s, --alias-separator <string>",
    "Separator for icon alias names (which can be set to the component description in Figma).",
    ",",
  )
  .action(importIconsCommandAction);

/**
 * Action to run when executing the import action. Only intended to be called manually for testing.
 */
export async function importIconsCommandAction(options: ImportIconsCommandOptions) {
  console.log("Fetching components from Figma API...");
  const data = await fetchFigmaComponents(options.fileKey, options.token);

  console.log("Parsing Figma icons...");
  const parsedIcons = parseComponentsToIcons({
    components: data.meta.components,
    pageId: options.pageId,
    aliasSeparator: options.aliasSeparator,
  });
  const outputDirectory = options.dir ?? process.cwd();

  console.log(`Fetching SVG content for ${parsedIcons.length} icons...`);

  const svgContents = await fetchFigmaSVGs(
    options.fileKey,
    parsedIcons.map(({ id }) => id),
    options.token,
  );

  console.log("Optimizing and writing icon files...");

  if (!(await isDirectory(outputDirectory))) {
    await mkdir(outputDirectory, { recursive: true });
  }

  await Promise.all(
    parsedIcons.map((icon) => {
      const content = optimizeSvg(svgContents[icon.id]);
      const fullPath = path.join(outputDirectory, `${icon.name}.svg`);
      return writeFile(fullPath, content, "utf-8");
    }),
  );

  if (options.metaFile) {
    console.log("Writing icon metadata...");
    await writeIconMetadata(options.metaFile, parsedIcons);
  }

  console.log("Done.");
}
