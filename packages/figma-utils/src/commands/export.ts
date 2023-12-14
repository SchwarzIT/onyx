import { Command } from "commander";
import { fetchFigmaVariables } from "../utils/fetch.js";
import { parseFigmaVariables } from "../utils/parse.js";
import { writeStyleDictionaryVariables } from "../utils/style-dictionary.js";

type ExportCommandOptions = {
  fileKey: string;
  token: string;
  filename: string;
  prefix?: string;
  keepRawFiles?: boolean;
  dir?: string;
};

export const exportCommand = new Command("export")
  .description("CLI tool to export Figma variables into CSS, SCSS etc. variables.")
  .requiredOption("-k, --file-key <string>", "Figma file key (required)")
  .requiredOption(
    "-t, --token <string>",
    "Figma access token with scope `file_variables:read` (required)",
  )
  .option("-p, --prefix <string>", "Prefix to append to all generated variables")
  .option("-n, --filename <string>", "Base name of the generated variables file", "variables")
  .option(
    "--keep-raw-files",
    "Whether to keep the temporary JSON files that contain the raw parsed variables from Figma.",
    false,
  )
  .option(
    "-d, --dir <string>",
    "Working directory to use. Defaults to current working directory of the script.",
  )
  .action(async (options: ExportCommandOptions) => {
    console.log("Fetching variables from Figma API...");
    const data = await fetchFigmaVariables(options.fileKey, options.token);

    console.log("Parsing Figma variables...");
    const parsedVariables = parseFigmaVariables(data);

    console.log("Generating variables for: CSS and SCSS...");
    writeStyleDictionaryVariables(parsedVariables, {
      workingDirectory: options.dir ?? process.cwd(),
      prefix: options.prefix,
      filename: options.filename,
      keepRawFiles: options.keepRawFiles,
    });
  });
