import fs from "node:fs";
import path from "node:path";
import styleDictionary from "style-dictionary";
import { ParsedFigmaVariables } from "./types.js";

export type FigmaToCssVariablesOptions = {
  workingDirectory: string;
  /**
   * Base name for the generated variable files.
   * @example "variables" will result e.g. in "variables.css"
   */
  filename: string;
  prefix?: string;
  /**
   * If `true`, the raw JSON files in the tmp directory will not be deleted.
   */
  keepRawFiles?: boolean;
};

/**
 * Generates CSS variables from the given parsed Figma variables using style-dictionary.
 */
export const writeStyleDictionaryVariables = (
  variables: ParsedFigmaVariables,
  options: FigmaToCssVariablesOptions,
) => {
  const TMP_DIR = path.join(options.workingDirectory, "tmp");

  // create tmp dir if it does not exist
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR);

  const deleteTmpDir = () => {
    if (options.keepRawFiles) return;
    fs.rmSync(TMP_DIR, { recursive: true });
  };

  Object.entries(variables).forEach(([mode, tokens]) => {
    const filePath = path.join(options.workingDirectory, "tmp", `${mode}.json`);
    fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2));
  });

  const getPlatformConfig = (platformName: string): styleDictionary.Platform => {
    return {
      transformGroup: platformName,
      prefix: options.prefix,
      buildPath: path.join(options.workingDirectory, "/"),
      files: [
        {
          destination: `${options.filename}.${platformName}`,
          format: `${platformName}/variables`,
          options: {
            outputReferences: true,
          },
        },
      ],
    };
  };

  const config: styleDictionary.Config = {
    source: [path.join(TMP_DIR, "*.json")],
    platforms: {
      css: getPlatformConfig("css"),
      scss: getPlatformConfig("scss"),
    },
  };

  try {
    styleDictionary.extend(config).buildAllPlatforms();
  } catch (e) {
    deleteTmpDir();
    throw e;
  }

  deleteTmpDir();
};
