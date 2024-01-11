import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import {
  DEFAULT_MODE_NAME,
  ParsedVariable,
  fetchFigmaVariables,
  generateAsCSS,
  generateAsSCSS,
  parseFigmaVariables,
} from "../index.js";

type ImportCommandOptions = {
  fileKey: string;
  token: string;
  filename: string;
  format: string;
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
  .option("-f, --format <string>", "Output format. Supported are: CSS, SCSS", "CSS")
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
    'CSS selector to use for the CSS format. The mode name will be added to the selector if it is set to something other than ":root", e.g. for the mode named "dark", passing the selector "html" will result in "html.dark"',
    ":root",
  )
  .action(async (options: ImportCommandOptions) => {
    const generators = {
      CSS: (data: ParsedVariable) => generateAsCSS(data, options.selector),
      SCSS: generateAsSCSS,
    };

    if (!(options.format in generators)) {
      throw new Error(
        `Unknown format: ${options.format}. Supported: ${Object.keys(generators).join(", ")}`,
      );
    }

    console.log("Fetching variables from Figma API...");
    const data = await fetchFigmaVariables(options.fileKey, options.token);

    console.log("Parsing Figma variables...");
    const parsedVariables = parseFigmaVariables(data);

    if (options.modes?.length) {
      // verify that all modes are found
      for (const mode of options.modes) {
        if (parsedVariables.find((i) => i.modeName === mode)) continue;

        const availableModes = parsedVariables
          .map((i) => i.modeName ?? DEFAULT_MODE_NAME)
          .map((mode) => `"${mode}"`);

        throw new Error(
          `Mode "${mode}" not found. Available modes: ${Object.values(availableModes).join(", ")}`,
        );
      }
    }

    const outputDirectory = options.dir ?? process.cwd();
    const filename = options.filename ?? "variables";

    console.log(`Generating ${options.format} variables...`);

    parsedVariables.forEach((data) => {
      // if the user passed specific modes to be exported, we will only generate those
      // otherwise all modes will be exported.
      // the default mode (undefined data.modeName) is always generated because its mode name can
      // not be specified by the designer in Figma
      const isModeIncluded =
        !options.modes?.length || !data.modeName || options.modes.includes(data.modeName);
      if (!isModeIncluded) return;

      const baseName = data.modeName ? `${filename}-${data.modeName}` : filename;
      const fullPath = path.join(outputDirectory, `${baseName}.${options.format.toLowerCase()}`);
      fs.writeFileSync(fullPath, generators[options.format as keyof typeof generators](data));
    });

    console.log("Done.");
  });
