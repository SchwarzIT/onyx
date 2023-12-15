import { Command } from "commander";
import fs from "node:fs";
import path from "node:path";
import { fetchFigmaVariables } from "../utils/fetch.js";
import { generateAsCSS, generateAsSass } from "../utils/generate.js";
import { parseFigmaVariables } from "../utils/parse.js";

type ExportCommandOptions = {
  fileKey: string;
  token: string;
  filename: string;
  format: string;
  dir?: string;
};

export const exportCommand = new Command("export")
  .description("CLI tool to export Figma variables into CSS, SCSS etc. variables.")
  .requiredOption("-k, --file-key <string>", "Figma file key (required)")
  .requiredOption(
    "-t, --token <string>",
    "Figma access token with scope `file_variables:read` (required)",
  )
  .option("-f, --format <string>", "Output format. Supported are: css, scss", "css")
  .option("-n, --filename <string>", "Base name of the generated variables file", "variables")
  .option(
    "-d, --dir <string>",
    "Working directory to use. Defaults to current working directory of the script.",
  )
  .action(async (options: ExportCommandOptions) => {
    const generators = {
      css: generateAsCSS,
      scss: generateAsSass,
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

    const outputDirectory = options.dir ?? process.cwd();
    const filename = options.filename ?? "variables";

    console.log(`Generating ${options.format} variables...`);
    fs.writeFileSync(
      path.join(outputDirectory, `${filename}.${options.format}`),
      generators[options.format as keyof typeof generators](parsedVariables),
    );
  });
