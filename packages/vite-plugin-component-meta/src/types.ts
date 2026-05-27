import type { ComponentMeta, MetaCheckerOptions } from "vue-component-meta";

export type ExtractComponentMetaOptions = {
  /**
   * Path of the tsconfig file to use for the vue-component-meta checker.
   * References are not supported.
   * @default "tsconfig.json"
   */
  tsconfigPath?: string;
  /**
   * Filename of the output file. Should have the ".json" extension.
   * @default "component-meta.json"
   */
  fileName?: string;
  /**
   * Files/Modules that should be considered.
   */
  include?: RegExp;
  /**
   * Files/Modules that should be excluded.
   */
  exclude?: RegExp;
  /**
   * Filter function to filter which exports should actually end up in the emitted file.
   */
  filterMeta?: (meta: MetaSource) => boolean;
};

export type MetaSource = {
  exportName: string;
  displayName: string;
  sourceFiles: string;
} & ComponentMeta &
  Exclude<MetaCheckerOptions["schema"], boolean>;
