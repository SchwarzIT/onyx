import { Command } from "commander";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { writeFlagMetadata } from "../flags/generate.js";
import { parseComponentsToFlags } from "../flags/parse.js";
import { optimizeSvg } from "../icons/optimize.js";
import { fetchFigmaComponents, fetchFigmaSVGs } from "../index.js";
import { isDirectory } from "../utils/fs.js";

export type ImportFlagsCommandOptions = {
  fileKey: string;
  token: string;
  pageId: string;
  dir?: string;
  metaFile?: string;
};

export const importFlagsCommand = new Command("import-flags")
  .description("CLI tool to import SVG flags from Figma.")
  .requiredOption("-k, --file-key <string>", "Figma file key (required)")
  .requiredOption(
    "-t, --token <string>",
    "Figma access token with scope `file_read` or `files:read` (required)",
  )
  .requiredOption("-p, --page-id <string>", "Figma page ID that contains the flags (required)")
  .option(
    "-d, --dir <string>",
    "Directory to save the flags to. Defaults to current working directory of the script.",
  )
  .option(
    "-m, --meta-file <string>",
    'JSON filename/path to write flag metadata to (country name etc.). Must end with ".json". If unset, no metadata will be generated.',
  )
  .action(importFlagsCommandAction);

/**
 * Action to run when executing the import action. Only intended to be called manually for testing.
 */
export async function importFlagsCommandAction(options: ImportFlagsCommandOptions) {
  console.log("Fetching components from Figma API...");
  const data = await fetchFigmaComponents(options.fileKey, options.token);

  console.log("Parsing Figma flags...");
  const parsedFlags = parseComponentsToFlags({
    components: data.meta.components,
    pageId: options.pageId,
  });
  const outputDirectory = options.dir ?? process.cwd();

  console.log(`Fetching SVG content for ${parsedFlags.length} flags...`);

  const svgContents = await fetchFigmaSVGs(
    options.fileKey,
    parsedFlags.map(({ id }) => id),
    options.token,
  );

  console.log("Optimizing and writing flag files...");

  if (!(await isDirectory(outputDirectory))) {
    await mkdir(outputDirectory, { recursive: true });
  }

  await Promise.all(
    parsedFlags.map((flag) => {
      const content = optimizeSvg(svgContents[flag.id], "image");
      const fullPath = path.join(outputDirectory, `${flag.code}.svg`);
      return writeFile(fullPath, content, "utf-8");
    }),
  );

  if (options.metaFile) {
    console.log("Writing flag metadata...");
    await writeFlagMetadata(options.metaFile, parsedFlags);
  }

  console.log("Done.");
}
