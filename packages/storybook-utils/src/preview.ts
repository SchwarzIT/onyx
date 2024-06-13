import { DOCS_RENDERED } from "@storybook/core-events";
import { addons } from "@storybook/preview-api";
import { type ThemeVars } from "@storybook/theming";
import { type Preview, type StoryContext } from "@storybook/vue3";
import { deepmerge } from "deepmerge-ts";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";

import { getIconImportName } from "@sit-onyx/icons";
import { requiredGlobalType, withRequired } from "./required";
import { generateSourceCode } from "./source-code-generator";
import { ONYX_BREAKPOINTS, createTheme } from "./theme";

const themes = {
  light: createTheme(),
  dark: createTheme({ base: "dark" }),
} as const;

/**
 * Creates a default Storybook preview configuration for 'onyx' with the following features:
 * - Improved controls (sorting and expanded controls so descriptions etc. are also shown in a single story)
 * - Improved Vue-specific code highlighting (e.g. using `@` instead of `v-on:`)
 * - Setup for dark mode (including docs page). Requires addon `storybook-dark-mode` to be enabled in .storybook/main.ts file
 * - Custom Storybook theme using onyx colors (light and dark mode)
 * - Configure viewports / breakpoints as defined by onyx
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
export const createPreview = <T extends Preview = Preview>(overrides?: T) => {
  const defaultPreview = {
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
      },
      docs: {
        // see: https://github.com/hipstersmoothie/storybook-dark-mode/issues/127#issuecomment-840701971
        get theme(): ThemeVars {
          const isDark = parent.document.body.classList.contains("dark");

          if (isDark) {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            document.documentElement.style.colorScheme = "dark";
          } else {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            document.documentElement.style.colorScheme = "light";
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
        // backgrounds are not needed because we have configured the darkMode addon/toggle switch
        disable: true,
      },
      viewport: {
        viewports: ONYX_BREAKPOINTS,
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
export const sourceCodeTransformer = (
  sourceCode: string,
  ctx: Pick<StoryContext, "title" | "component" | "args">,
): string => {
  const RAW_ICONS = import.meta.glob("../node_modules/@sit-onyx/icons/src/assets/*.svg", {
    query: "?raw",
    import: "default",
    eager: true,
  });

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

  let code = generateSourceCode(ctx);

  const iconImports: string[] = [];

  // add icon imports to the source code for all used onyx icons
  Object.entries(ALL_ICONS).forEach(([iconName, iconContent]) => {
    const importName = getIconImportName(iconName);
    const singleQuotedIconContent = `'${replaceAll(iconContent, '"', "\\'")}'`;
    const escapedIconContent = `"${replaceAll(iconContent, '"', '\\"')}"`;

    if (code.includes(iconContent)) {
      code = code.replace(new RegExp(` (\\S+)=['"]${iconContent}['"]`), ` :$1="${importName}"`);
      iconImports.push(`import ${importName} from "@sit-onyx/icons/${iconName}.svg?raw";`);
    } else if (code.includes(singleQuotedIconContent)) {
      // support icons inside objects
      code = code.replace(singleQuotedIconContent, importName);
      iconImports.push(`import ${importName} from "@sit-onyx/icons/${iconName}.svg?raw";`);
    } else if (code.includes(escapedIconContent)) {
      // support icons inside objects
      code = code.replace(escapedIconContent, importName);
      iconImports.push(`import ${importName} from "@sit-onyx/icons/${iconName}.svg?raw";`);
    }
  });

  // Set is used here to only include unique components if they are used multiple times
  const usedOnyxComponents = [
    ...new Set(Array.from(code.matchAll(/<Onyx\S+/g)).map((match) => match[0].replace("<", ""))),
  ].sort();

  const additionalImports = iconImports.slice();
  if (usedOnyxComponents.length > 0) {
    additionalImports.unshift(`import { ${usedOnyxComponents.join(", ")} } from "sit-onyx";`);
  }

  if (additionalImports.length === 0) return code;

  if (code.startsWith("<script")) {
    const index = code.indexOf("\n");
    return code.slice(0, index) + additionalImports.join("\n") + "\n" + code.slice(index);
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
