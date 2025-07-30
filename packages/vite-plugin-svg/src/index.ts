import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { camelize } from "./utils.js";

export type PluginOptions = {
  /**
   * Base path to the project, should be the same as `import.meta.url`.
   */
  base: string;
  /**
   * File path to the input folder where the SVG files are placed, relative to the `base`.
   */
  input: string;
  /**
   * Path to the generated `.d.ts` type file.
   *
   * @default "dist/index.d.ts"
   */
  dtsFile?: string;
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

  /** Gets the given path while ensuring cross-platform and correct decoding */
  const getFilePath = (path: string) => {
    return fileURLToPath(new URL(path, options.base));
  };

  return {
    name: "vite-plugin-svg",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id !== resolvedVirtualModuleId) return;

      const files = (await this.fs.readdir(getFilePath(options.input)))
        .filter((file) => file.endsWith(".svg"))
        .map((fileName) => {
          const baseName = fileName.replace(".svg", "");
          let exportName = camelize(baseName);
          if (options.modifyExportName) {
            exportName = options.modifyExportName(exportName, baseName);
          }

          return { fileName, exportName };
        });

      const output: string[] = [];

      for (const { fileName, exportName } of files) {
        const svgContent = await this.fs.readFile(path.join(options.input, fileName), {
          encoding: "utf8",
        });
        output.push(`export const ${exportName} = \`${svgContent}\``);
      }

      const dtsFilename = `${virtualModuleId}.d.ts`;

      this.emitFile({
        type: "asset",
        fileName: dtsFilename,
        source: files.map(({ exportName }) => `export const ${exportName}: string`).join(";\n"),
      });

      return {
        code: output.join(";\n"),
      };
    },
    async closeBundle() {
      const dTsPath = getFilePath(options.dtsFile ?? "dist/index.d.ts");
      const content = await this.fs.readFile(dTsPath, { encoding: "utf8" });

      const newContent = content.replace(
        `from '${virtualModuleId}'`,
        `from './${virtualModuleId}.d.ts'`,
      );

      await this.fs.writeFile(dTsPath, newContent, { encoding: "utf8" });
    },
  };
}
