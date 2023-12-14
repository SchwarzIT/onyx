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
  .action(async (options: ExportCommandOptions) => {
    const data = await fetchFigmaVariables(options.fileKey, options.token);
    const parsedVariables = parseFigmaVariables(data);

    writeStyleDictionaryVariables(parsedVariables, {
      workingDirectory: process.cwd(),
      prefix: options.prefix,
      filename: options.filename,
      keepRawFiles: options.keepRawFiles,
    });
  });
