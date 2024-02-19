import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import {
  DEFAULT_MODE_NAME,
  ParsedVariable,
  fetchFigmaVariables,
  generateAsCSS,
  generateAsJSON,
  generateAsSCSS,
  parseFigmaVariables,
} from "../index.js";

export type ImportCommandOptions = {
  fileKey: string;
  token: string;
  filename: string;
  format: string[];
  dir?: string;
  modes?: string[];
  selector: string;
};

export const importCommand = new Command("import-variables")
  .description("CLI tool to import Figma variables into CSS, SCSS etc. variables.")
  .requiredOption("-k, --file-key <string>", "Figma file key (required)")
  .requiredOption(
    "-t, --token <string>",
    "Figma access token with scope `file_variables:read` (required)",
  )
  .option("-f, --format <strings...>", "Output formats. Supported are: CSS, SCSS, JSON", ["CSS"])
  .option("-n, --filename <string>", "Base name of the generated variables file", "variables")
  .option(
    "-d, --dir <string>",
    "Working directory to use. Defaults to current working directory of the script.",
  )
  .option(
    "-m, --modes <strings...>",
    "Can be used to only export specific Figma modes. If unset, all modes will be exported as a separate file.",
  )
  .option(
    "-s, --selector <string>",
    'CSS selector to use for the CSS format. You can use {mode} as placeholder for the mode name, so e.g. for the mode named "dark", passing the selector "html.{mode}" will result in "html.dark"',
    ":root",
  )
  .action(importCommandAction);

/**
 * Action to run when executing the import action. Only intended to be called manually for testing.
 */
export async function importCommandAction(options: ImportCommandOptions) {
  const generators = {
    CSS: (data: ParsedVariable) => generateAsCSS(data, { selector: options.selector }),
    SCSS: generateAsSCSS,
    JSON: generateAsJSON,
  };

  options.format.forEach((format) => {
    if (!(format in generators)) {
      throw new Error(
        `Unknown format "${format}". Supported: ${Object.keys(generators).join(", ")}`,
      );
    }
  });

  console.log("Fetching variables from Figma API...");
  const data = await fetchFigmaVariables(options.fileKey, options.token);

  console.log("Parsing Figma variables...");
  const parsedVariables = parseFigmaVariables(data);

  if (options.modes?.length) {
    // verify that all modes are found
    options.modes.forEach((mode) => {
      if (parsedVariables.find((i) => i.modeName === mode)) return;

      const availableModes = parsedVariables
        .map((i) => i.modeName ?? DEFAULT_MODE_NAME)
        .map((mode) => `"${mode}"`);

      throw new Error(
        `Mode "${mode}" not found. Available modes: ${Object.values(availableModes).join(", ")}`,
      );
    });
  }

  const outputDirectory = options.dir ?? process.cwd();
  const filename = options.filename ?? "variables";

  console.log(`Generating ${options.format} variables...`);

  options.format.forEach((format) => {
    console.log(`Generating ${format} variables...`);

    parsedVariables.forEach((data) => {
      // if the user passed specific modes to be exported, we will only generate those
      // otherwise all modes will be exported.
      // the default mode (undefined data.modeName) is always generated because its mode name can
      // not be specified by the designer in Figma
      const isModeIncluded =
        !options.modes?.length || !data.modeName || options.modes.includes(data.modeName);
      if (!isModeIncluded) return;

      const baseName = data.modeName ? `${filename}-${data.modeName}` : filename;
      const fullPath = path.join(outputDirectory, `${baseName}.${format.toLowerCase()}`);
      fs.writeFileSync(fullPath, generators[format as keyof typeof generators](data));
    });
  });

  console.log("Done.");
}
