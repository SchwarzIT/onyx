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
export const sourceCodeTransformer = async (originalSourceCode: string): Promise<string> => {
  let code = originalSourceCode;

  /**
   * A list of additional JavaScript imports to be added at the top of the source code.
   *
   * key = module/package name to import from, value: set of imports to import from the package
   */
  const additionalImports = new Map<string, Set<string>>();

  // add imports for all used onyx components
  // Set is used here to only include unique components if they are used multiple times
  const usedOnyxComponents = new Set(
    Array.from(code.matchAll(/<(Onyx\w+)(?:\s*\/?)/g)).map((match) => match[1]),
  );
  additionalImports.set("sit-onyx", usedOnyxComponents);

  /**
   * List of npm packages to replace the source code with.
   * The source code will be checked for any import of the package and (if its used), the code will be replaced by the corresponding import.
   */
  const packagesToReplace = [
    { name: "@sit-onyx/icons", data: await import("@sit-onyx/icons") },
    { name: "@sit-onyx/flags", data: await import("@sit-onyx/flags") },
  ];

  packagesToReplace.forEach((_package) => {
    Object.entries(_package.data).forEach(([name, content]) => {
      const singleQuotedContent = `'${replaceAll(content, '"', "\\'")}'`;
      const escapedContent = `"${replaceAll(content, '"', '\\"')}"`;

      const imports = additionalImports.get(_package.name) ?? new Set<string>();

      if (code.includes(content)) {
        imports.add(name);

        code = code.replace(
          new RegExp(` (\\S+)=['"]${escapeRegExp(content)}['"]`),
          ` :$1="${name}"`,
        );
      } else if (code.includes(singleQuotedContent)) {
        // support values inside objects
        imports.add(name);
        code = code.replace(singleQuotedContent, name);
      } else if (code.includes(escapedContent)) {
        // support values inside objects
        imports.add(name);
        code = code.replace(escapedContent, name);
      }

      additionalImports.set(_package.name, imports);
    });
  });

  // remove imports without any data so we don't add empty imports
  additionalImports.forEach((value, key) => {
    if (!value.size) additionalImports.delete(key);
  });

  // generate the source code for the additional imports and add them to the top of the code snippet
  if (additionalImports.size > 0) {
    const additionalImportsCode = Array.from(additionalImports.entries()).reduce(
      (code, [packageName, imports]) => {
        if (imports.size) {
          code.push(
            `import { ${Array.from(imports.values()).sort().join(", ")} } from "${packageName}";`,
          );
        }
        return code;
      },
      [] as string[],
    );

    if (code.startsWith("<script")) {
      const index = code.indexOf("\n");
      const hasOtherImports = code.includes("import {");
      code =
        code.slice(0, index) +
        additionalImportsCode.join("\n") +
        (!hasOtherImports ? "\n" : "") +
        code.slice(index);
    } else {
      code = `<script lang="ts" setup>
${additionalImportsCode.join("\n")}
</script>

${code}`;
    }
  }

  try {
    const { format } = await import("prettier/standalone");
    const parserHtml = await import("prettier/parser-html");

    code = await format(code, {
      parser: "vue",
      plugins: [parserHtml],
      htmlWhitespaceSensitivity: "ignore",
    });

    // trim code to remove trailing newlines that are added by prettier
    code = code.trim();
  } catch (e) {
    // eslint-disable-next-line no-console -- if the formatting fails, there is usually an issue with our code so we want to inform the user that the formatting failed
    console.error("Error while formatting Storybook code snippet:", e);
  }

  return code;
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
