import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { toCamelCase } from "./utils.js";

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
   * Path to the generated `.d.ts` type file that exports the SVGs.
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

/**
 * A Vite plugin to generate JavaScript exports for SVG files
 */
export default function vitePluginSVG(options: PluginOptions): Plugin {
  const virtualModuleId = "virtual:vite-plugin-svg";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  /** Gets the given path while ensuring cross-platform and correct decoding */
  const getFilePath = (path: string) => fileURLToPath(new URL(path, options.base));

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
          let exportName = toCamelCase(baseName);
          if (options.modifyExportName) {
            exportName = options.modifyExportName(exportName, baseName);
          }

          return { fileName, exportName };
        });

      const exports = files.map(({ fileName, exportName }) => {
        // we are using import query "?raw" here so Vite will take care of loading the SVG content for us
        // so we don't need to read the file content ourselves
        const svgPath = `${path.join(getFilePath(options.input), fileName)}?raw`;
        return `export { default as ${exportName} } from "${svgPath}";`;
      });

      // generate a .d.ts file for the dist folder that includes types for all icons
      // to support intellisense when using the exports
      this.emitFile({
        type: "asset",
        fileName: `${virtualModuleId}.d.ts`,
        source: files.map(({ exportName }) => `export const ${exportName}: string`).join(";\n"),
      });

      return {
        code: exports.join(";\n"),
      };
    },
    async closeBundle() {
      // Since Vite virtual modules must be imported from "virtual:vite-plugin-svg"
      // the virtual:vite-plugin-svg.d.ts file that we are generating above will not be picked up
      // since it must be a relative path.
      // Therefore, we are replacing the imported module name with the correct relative path to our .d.ts file
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
