import { Command } from "commander";
import fs from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { parseComponentsToIcons } from "../icons/parse.js";
import { fetchFigmaComponents, fetchFigmaSVGs } from "../index.js";
import { isDirectory } from "../utils/fs.js";

export type ImportIconsCommandOptions = {
  fileKey: string;
  token: string;
  pageId: string;
  dir?: string;
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
    "Working directory to use. Defaults to current working directory of the script.",
  )
  .action(importIconsCommandAction);

/**
 * Action to run when executing the import action. Only intended to be called manually for testing.
 */
export async function importIconsCommandAction(options: ImportIconsCommandOptions) {
  console.log("Fetching components from Figma API...");
  const data = await fetchFigmaComponents(options.fileKey, options.token);

  console.log("Parsing Figma icons...");
  const parsedIcons = parseComponentsToIcons(data.meta.components, options.pageId);
  const outputDirectory = options.dir ?? process.cwd();

  console.log(`Fetching SVG content for ${parsedIcons.length} icons...`);

  const svgContents = await fetchFigmaSVGs(
    options.fileKey,
    parsedIcons.map(({ id }) => id),
    options.token,
  );

  console.log("Writing icon files...");

  if (!(await isDirectory(outputDirectory))) {
    await mkdir(outputDirectory, { recursive: true });
  }

  parsedIcons.forEach((icon) => {
    const fullPath = path.join(outputDirectory, `${icon.name}.svg`);
    fs.writeFileSync(fullPath, svgContents[icon.id]);
  });

  console.log("Done.");
}
