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
  const ALL_ICONS = await import("@sit-onyx/icons");

  let code = originalSourceCode;

  const additionalImports: string[] = [];

  // add icon imports to the source code for all used onyx icons
  const usedIcons = new Set<string>();

  Object.entries(ALL_ICONS).forEach(([iconName, iconContent]) => {
    const singleQuotedIconContent = `'${replaceAll(iconContent, '"', "\\'")}'`;
    const escapedIconContent = `"${replaceAll(iconContent, '"', '\\"')}"`;

    if (code.includes(iconContent)) {
      usedIcons.add(iconName);

      code = code.replace(
        new RegExp(` (\\S+)=['"]${escapeRegExp(iconContent)}['"]`),
        ` :$1="${iconName}"`,
      );
    } else if (code.includes(singleQuotedIconContent)) {
      // support icons inside objects
      usedIcons.add(iconName);
      code = code.replace(singleQuotedIconContent, iconName);
    } else if (code.includes(escapedIconContent)) {
      // support icons inside objects
      usedIcons.add(iconName);
      code = code.replace(escapedIconContent, iconName);
    }
  });

  if (usedIcons.size > 0) {
    additionalImports.push(
      `import { ${Array.from(usedIcons.values()).sort().join(", ")} } from "@sit-onyx/icons";`,
    );
  }

  // add imports for all used onyx components
  // Set is used here to only include unique components if they are used multiple times
  const usedOnyxComponents = [
    ...new Set(Array.from(code.matchAll(/<(Onyx\w+)(?:\s*\/?)/g)).map((match) => match[1])),
  ].sort();

  if (usedOnyxComponents.length > 0) {
    additionalImports.unshift(`import { ${usedOnyxComponents.join(", ")} } from "sit-onyx";`);
  }

  if (additionalImports.length > 1) {
    if (code.startsWith("<script")) {
      const index = code.indexOf("\n");
      const hasOtherImports = code.includes("import {");
      code =
        code.slice(0, index) +
        additionalImports.join("\n") +
        (!hasOtherImports ? "\n" : "") +
        code.slice(index);
    } else {
      code = `<script lang="ts" setup>
${additionalImports.join("\n")}
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
    // eslint-disable-next-line no-console -- --if the formatting fails, there is usually an issue with our code so we want to inform the user that the formatting failed
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
