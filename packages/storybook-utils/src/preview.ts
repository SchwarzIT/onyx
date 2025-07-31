import { getIconImportName } from "@sit-onyx/icons/utils";
import type { Preview } from "@storybook/vue3-vite";
import { DARK_MODE_EVENT_NAME } from "@vueless/storybook-dark-mode";
import { deepmerge } from "deepmerge-ts";
import { DOCS_RENDERED } from "storybook/internal/core-events";
import { addons } from "storybook/internal/preview-api";
import type { ThemeVars } from "storybook/internal/theming";
import { enhanceEventArgTypes } from "./actions.js";
import { requiredGlobalType, withRequired } from "./required.js";
import { ONYX_BREAKPOINTS, createTheme, type BrandDetails } from "./theme.js";

/**
 * Creates a default Storybook preview configuration for 'onyx' with the following features:
 * - Improved controls (sorting and expanded controls so descriptions etc. are also shown in a single story)
 * - Improved Vue-specific code highlighting (e.g. using `@` instead of `v-on:`)
 * - Setup for dark mode (including docs page). Requires addon `@vueless/storybook-dark-mode` to be enabled in .storybook/main.ts file
 * - Custom Storybook theme using onyx colors (light and dark mode)
 * - Configure viewports / breakpoints as defined by onyx
 * - Logs Vue emits as Storybook events
 *
 * @param overrides Custom preview / overrides, will be deep merged with the default preview.
 *
 * @example
 * ```ts
 * // .storybook/preview.ts
 * const preview = {
 *   // you need to destructure here because as of Storybook 7.6
 *   // it can not statically analyze that the `preview` variable is an object
 *   ...createPreview({
 *     // custom preview / overrides
 *     },
 *   }),
 * };
 *
 * export default preview;
 * ```
 */
export const createPreview = <T extends Preview = Preview>(
  overrides?: T,
  brandDetails?: BrandDetails,
) => {
  const themes = {
    light: createTheme("light", brandDetails),
    dark: createTheme("dark", brandDetails),
  } as const;

  const defaultPreview = {
    argTypesEnhancers: [enhanceEventArgTypes],
    initialGlobals: {
      ["requiredMode" satisfies keyof typeof requiredGlobalType]: "required",
      backgrounds: { value: "currentTheme" },
    },
    globalTypes: {
      ...requiredGlobalType,
    },
    decorators: [withRequired],
    parameters: {
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/i,
        },
        sort: "requiredFirst",
        // needed to also show props/events descriptions etc. when opening a single story
        expanded: true,
        exclude: ["ref", "ref_for", "ref_key", "class", "style", "key", "$slots"],
      },
      docs: {
        // see: https://github.com/hipstersmoothie/storybook-dark-mode/issues/127#issuecomment-840701971
        get theme(): ThemeVars {
          const isDark = parent.document.body.classList.contains("dark");

          if (isDark) {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
          } else {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
          }

          return isDark ? themes.dark : themes.light;
        },
        source: {
          language: "html",
          /**
           * Use a custom transformer for the story source code to better fit to our
           * Vue.js code because storybook per default does not render it exactly how
           * we want it to look.
           * @see https://storybook.js.org/docs/react/api/doc-block-source
           */
          transform: sourceCodeTransformer,
        },
      },
      darkMode: {
        stylePreview: true,
        light: themes.light,
        dark: themes.dark,
      },
      backgrounds: {
        options: {
          currentTheme: { name: "Dynamic", value: "var(--onyx-color-base-background-tinted)" },
        },
      },
      viewport: {
        options: ONYX_BREAKPOINTS,
      },
    },
  } satisfies Preview;

  const channel = addons.getChannel();

  // our "workaround" above for dynamically setting the docs theme needs a page-reload after
  // the theme has changed to take effect:
  channel.once(DOCS_RENDERED, () => {
    // the DARK_MODE_EVENT_NAME is emitted once after the docs have been rendered for the initial theme.
    // We only want to reload the page on theme changes, that's why we use .once() to add the event listener
    // only after the initial dark mode change event has been fired. Otherwise we would get an infinite loop.
    channel.once(DARK_MODE_EVENT_NAME, () => {
      channel.on(DARK_MODE_EVENT_NAME, () => {
        window.location.reload();
      });
    });
  });

  return deepmerge<[T, typeof defaultPreview]>(overrides ?? ({} as T), defaultPreview);
};

/**
 * Custom transformer for the story source code to support improved source code generation.
 * and add imports for all used onyx icons so icon imports are displayed in the source code
 * instead of the the raw SVG content.
 *
 * @see https://storybook.js.org/docs/react/api/doc-block-source
 */
export const sourceCodeTransformer = (originalSourceCode: string): string => {
  const RAW_ICONS = import.meta.glob("../node_modules/@sit-onyx/icons/src/assets/*.svg", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  let code = originalSourceCode;

  /**
   * Mapping between icon SVG content (key) and icon name (value).
   * Needed to display a labelled dropdown list of all available icons.
   */
  const ALL_ICONS = Object.entries(RAW_ICONS).reduce<Record<string, string>>(
    (obj, [filePath, content]) => {
      obj[filePath.split("/").at(-1)!.replace(".svg", "")] = content as string;
      return obj;
    },
    {},
  );

  const additionalImports: string[] = [];

  // add icon imports to the source code for all used onyx icons
  Object.entries(ALL_ICONS).forEach(([iconName, iconContent]) => {
    const importName = getIconImportName(iconName);
    const singleQuotedIconContent = `'${replaceAll(iconContent, '"', "\\'")}'`;
    const escapedIconContent = `"${replaceAll(iconContent, '"', '\\"')}"`;

    if (code.includes(iconContent)) {
      code = code.replace(
        new RegExp(` (\\S+)=['"]${escapeRegExp(iconContent)}['"]`),
        ` :$1="${importName}"`,
      );
      additionalImports.push(`import ${importName} from "@sit-onyx/icons/${iconName}.svg?raw";`);
    } else if (code.includes(singleQuotedIconContent)) {
      // support icons inside objects
      code = code.replace(singleQuotedIconContent, importName);
      additionalImports.push(`import ${importName} from "@sit-onyx/icons/${iconName}.svg?raw";`);
    } else if (code.includes(escapedIconContent)) {
      // support icons inside objects
      code = code.replace(escapedIconContent, importName);
      additionalImports.push(`import ${importName} from "@sit-onyx/icons/${iconName}.svg?raw";`);
    }
  });

  // add imports for all used onyx components
  // Set is used here to only include unique components if they are used multiple times
  const usedOnyxComponents = [
    ...new Set(Array.from(code.matchAll(/<(Onyx\w+)(?:\s*\/?)/g)).map((match) => match[1])),
  ].sort();

  if (usedOnyxComponents.length > 0) {
    additionalImports.unshift(`import { ${usedOnyxComponents.join(", ")} } from "sit-onyx";`);
  }

  if (additionalImports.length === 0) return code;

  if (code.startsWith("<script")) {
    const index = code.indexOf("\n");
    const hasOtherImports = code.includes("import {");
    return (
      code.slice(0, index) +
      additionalImports.join("\n") +
      (!hasOtherImports ? "\n" : "") +
      code.slice(index)
    );
  }

  return `<script lang="ts" setup>
${additionalImports.join("\n")}
</script>

${code}`;
};

/**
 * Custom String.replaceAll implementation using a RegExp
 * because String.replaceAll() is not available in our specified EcmaScript target in tsconfig.json
 */
export const replaceAll = (value: string, searchValue: string | RegExp, replaceValue: string) => {
  return value.replace(new RegExp(searchValue, "gi"), replaceValue);
};

/**
 * Escapes the given string value to be used in `new RegExp()`.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
 */
export const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};
