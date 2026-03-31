// Based on https://github.com/storybookjs/storybook/blob/2b4ef8b687463fb3da89e2888620357afa31dadf/code/frameworks/vue3-vite/src/plugins/vue-component-meta.ts
import { readFile, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import type { Type } from "typescript";

import { createFilter, type Plugin } from "vite";
import {
  type ComponentMeta,
  createChecker,
  type MetaCheckerOptions,
  TypeMeta,
} from "vue-component-meta";
import { parseMulti } from "vue-docgen-api";

type MetaSource = {
  exportName: string;
  displayName: string;
  sourceFiles: string;
} & ComponentMeta &
  Exclude<MetaCheckerOptions["schema"], boolean>;

type ExtractComponentMetaOptions = {
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

export const DEFAULT_INCLUDE = /\.(vue|ts|js|tsx|jsx)$/;
/**
 * Exclude stories, virtual modules and storybook internals
 */
export const DEFAULT_EXCLUDE =
  /\.stories\.(ts|\.ct\.tsx|tsx|js|jsx)$|^\0\/virtual:|^\/virtual:|\.storybook\/.*\.(ts|js)$/;

export async function extractComponentMeta(
  options: ExtractComponentMetaOptions = {},
): Promise<Plugin> {
  const {
    tsconfigPath = "tsconfig.json",
    fileName = "component-meta.json",
    filterMeta = () => true,
    include = DEFAULT_INCLUDE,
    exclude = DEFAULT_EXCLUDE,
  } = options;

  const collect: MetaSource[][] = [];
  /**
   * Stores the entry files from the resolved vite config.
   */
  let entry: string[] = [];
  const exportViaEntry = new Set<string>(["default"]);

  const filterById = createFilter(include, exclude);

  const checker = await createVueComponentMetaChecker(tsconfigPath);

  return {
    name: "sit-onyx:extract-component-meta-plugin",
    async transform(_src, id) {
      if (entry.includes(id)) {
        // store what is actually exported
        return checker.getExportNames(id).forEach((name) => exportViaEntry.add(name));
      }

      if (!filterById(id)) {
        return undefined;
      }

      try {
        const exportNames = checker.getExportNames(id);

        let componentsMeta = exportNames
          .filter((name) => exportViaEntry.has(name))
          .map((name) => checker.getComponentMeta(id, name));

        componentsMeta = await applyTempFixForEventDescriptions(id, componentsMeta);

        const metaSources: MetaSource[] = [];

        componentsMeta.forEach((meta, index) => {
          // filter out empty meta
          const isEmpty =
            !meta.props.length && !meta.events.length && !meta.slots.length && !meta.exposed.length;

          if (isEmpty || meta.type === TypeMeta.Unknown) {
            return;
          }

          const exportName = exportNames[index];

          removeDefaultVueProps(meta);

          const exposed =
            // the meta also includes duplicated entries in the "exposed" array with "on"
            // prefix (e.g. onClick instead of click), so we need to filter them out here
            meta.exposed
              .filter((expose) => {
                let nameWithoutOnPrefix = expose.name;

                if (nameWithoutOnPrefix.startsWith("on")) {
                  nameWithoutOnPrefix = lowercaseFirstLetter(expose.name.replace("on", ""));
                }

                const hasEvent = meta.events.find((event) => event.name === nameWithoutOnPrefix);
                return !hasEvent;
              })
              // remove unwanted duplicated "$slots" expose
              .filter((expose) => {
                if (expose.name === "$slots") {
                  const slotNames = meta.slots.map((slot) => slot.name);
                  return !slotNames.every((slotName) => expose.type.includes(slotName));
                }
                return true;
              });

          metaSources.push({
            exportName,
            displayName: exportName === "default" ? getFilenameWithoutExtension(id) : exportName,
            ...meta,
            exposed,
            sourceFiles: id,
          });
        });

        // if there is no component meta, return undefined
        if (metaSources.length === 0) {
          return undefined;
        }

        collect.push(metaSources);
        return;
      } catch {
        return undefined;
      }
    },
    configResolved(config) {
      if (config.build.lib === false) {
        return;
      } else if (typeof config.build.lib.entry === "object") {
        entry = Object.values(config.build.lib.entry);
      } else if (Array.isArray(config.build.lib.entry)) {
        entry = config.build.lib.entry;
      } else {
        entry = [config.build.lib.entry];
      }
    },
    generateBundle() {
      const json = collect
        .flat()
        .filter(filterMeta)
        .map(({ sourceFiles: _, ...meta }) => meta);

      this.emitFile({
        type: "asset",
        fileName,
        source: JSON.stringify(json, null, 2),
      });
    },
  };
}

/**
 * Creates the `vue-component-meta` checker to use for extracting component meta/docs. Considers the
 * given tsconfig file.
 */
async function createVueComponentMetaChecker(tsconfigPath = "tsconfig.json") {
  const checkerOptions: MetaCheckerOptions = {
    printer: { newLine: 1 },
    schema: {
      ignore: [
        // Don't expand external schemas
        (_, type) => {
          const path = getModulePathFromType(type);
          return path?.includes("node_modules");
        },
      ],
    },
  };

  const projectRoot = join(import.meta.dirname, "..");
  const projectTsConfigPath = join(projectRoot, tsconfigPath);

  const exists = await fileExists(projectTsConfigPath);
  if (!exists) {
    throw new Error("The required tsconfig file does not exist!");
  }

  const references = await getTsConfigReferences(projectTsConfigPath);
  if (references.length > 0) {
    throw new Error("vue-component-meta does not resolve tsconfig references!");
  }

  return createChecker(projectTsConfigPath, checkerOptions);
}

/** Gets the filename without file extension. */
function getFilenameWithoutExtension(filename: string) {
  return parse(filename).name;
}

/** Lowercases the first letter. */
function lowercaseFirstLetter(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

/** Checks whether the given file path exists. */
async function fileExists(fullPath: string) {
  try {
    await stat(fullPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Applies a temporary workaround/fix for missing event descriptions because Volar is currently not
 * able to extract them. Will modify the events of the passed meta. Performance note: Based on some
 * quick tests, calling "parseMulti" only takes a few milliseconds (8-20ms) so it should not
 * decrease performance that much. Especially because it is only execute if the component actually
 * has events.
 *
 * Check status of this Volar issue: https://github.com/vuejs/language-tools/issues/3893 and
 * update/remove this workaround once Volar supports it:
 *
 * - Delete this function
 * - Uninstall vue-docgen-api dependency
 */
async function applyTempFixForEventDescriptions(filename: string, componentMeta: ComponentMeta[]) {
  // do not apply temp fix if no events exist for performance reasons
  const hasEvents = componentMeta.some((meta) => meta.events.length);

  if (!hasEvents) {
    return componentMeta;
  }

  try {
    const parsedComponentDocs = await parseMulti(filename);

    // add event descriptions to the existing Volar meta if available
    componentMeta.forEach((meta, index) => {
      const eventsWithDescription = parsedComponentDocs[index].events;

      if (!meta.events.length || !eventsWithDescription?.length) {
        return meta;
      }

      meta.events = meta.events.map((event) => {
        const description = eventsWithDescription.find((i) => i.name === event.name)?.description;
        if (description) {
          (event as typeof event & { description: string }).description = description;
        }
        return event;
      });

      return meta;
    });
  } catch {
    // noop
  }

  return componentMeta;
}

/**
 * Gets a list of tsconfig references for the given tsconfig This is only needed for the temporary
 * workaround/fix for: https://github.com/vuejs/language-tools/issues/3896
 */
async function getTsConfigReferences(tsConfigPath: string) {
  try {
    const content = JSON.parse(await readFile(tsConfigPath, "utf-8"));

    if (!("references" in content) || !Array.isArray(content.references)) {
      return [];
    }
    return content.references as unknown[];
  } catch {
    // invalid project tsconfig
    return [];
  }
}

const VUE_DEFAULT_PROPS = new Set([
  "class",
  "style",
  "ref_for",
  "key",
  "ref_key",
  "ref",
  "onVnodeBeforeMount",
  "onVue:beforeMount",
  "onVnodeMounted",
  "onVue:mounted",
  "onVnodeBeforeUpdate",
  "onVue:beforeUpdate",
  "onVnodeUpdated",
  "onVue:updated",
  "onVnodeBeforeUnmount",
  "onVue:beforeUnmount",
  "onVnodeUnmounted",
  "onVue:unmounted",
]);

/**
 * Removes all common vue props from the component meta,
 * as they are not relevant and clutter the output.
 */
function removeDefaultVueProps(meta: ComponentMeta) {
  // We have to modify the array in place, otherwise the script breaks.
  // The relevant indices are stored in reverse order,
  // so that they stay correct when elements are removed from the array.
  const dropIndices: number[] = [];
  meta.props.forEach(({ name }, i) => {
    if (VUE_DEFAULT_PROPS.has(name)) {
      dropIndices.unshift(i);
    }
  });
  dropIndices.forEach((i) => meta.props.splice(i, 1));
}

/**
 * For a typescript type, get the declaration file.
 */
function getModulePathFromType(type: Type): string | undefined {
  const symbol = type.aliasSymbol ?? type.getSymbol();

  if (!symbol) {
    return undefined;
  }

  const declarations = symbol.getDeclarations();
  if (!declarations || declarations.length === 0) {
    return undefined;
  }

  const sourceFile = declarations[0].getSourceFile();
  return sourceFile.fileName;
}
