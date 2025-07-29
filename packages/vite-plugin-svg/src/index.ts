import { readdir, readFile } from "node:fs/promises";
import * as path from "node:path";
import type { Plugin } from "vite";
import { camelize } from "./utils.js";

export type PluginOptions = {
  /**
   * File path to the input folder where the SVG files are placed.
   */
  input: string;
  /**
   * Modifies the export name for a given SVG.
   *
   * @param name Java-Script safe export name in camelCase, e.g. "myFile"
   * @param rawName The raw SVG file name, e.g. "my-file.svg"
   * @returns
   */
  modifyExportName?: (name: string, rawName: string) => string;
};

export default function vitePluginSVG(options: PluginOptions): Plugin {
  const virtualModuleId = "virtual:vite-plugin-svg";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "vite-plugin-svg",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id !== resolvedVirtualModuleId) return;

      const files = (await readdir(options.input, { encoding: "utf-8" })).filter((file) =>
        file.endsWith(".svg"),
      );

      const output: string[] = [];

      for (const fileName of files) {
        let exportName = camelize(fileName.replace(".svg", ""));
        if (options.modifyExportName) {
          exportName = options.modifyExportName(exportName, fileName);
        }

        const svgContent = await readFile(path.join(options.input, fileName), "utf-8");
        output.push(`export const ${exportName} = \`${svgContent}\``);
      }

      return {
        code: output.join(";\n"),
      };
    },
  };
}
