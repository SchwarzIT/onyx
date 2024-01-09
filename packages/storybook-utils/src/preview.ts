import { DOCS_RENDERED } from "@storybook/core-events";
import { addons } from "@storybook/preview-api";
import { type ThemeVars } from "@storybook/theming";
import { type Preview } from "@storybook/vue3";
import { deepmerge } from "deepmerge-ts";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { ONYX_BREAKPOINTS, themes } from "./theme";

/**
 * Creates a default Storybook preview configuration for 'Onyx' with the following features:
 * - Improved controls (sorting and expanded controls so descriptions etc. are also shown in a single story)
 * - Improved Vue-specific code highlighting (e.g. using `@` instead of `v-on:`)
 * - Setup for dark mode (including docs page). Requires addon `storybook-dark-mode` to be enabled in .storybook/main.ts file
 * - Support for setting the light/dark mode when Storybook is embedded as an iframe (via query parameter, e.g. `?theme=dark`)
 * - Configure viewports / breakpoints as defined by Onyx
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
          // support setting the theme via query parameters, useful if docs are embedded via an iframe
          const params = new URLSearchParams(window.location.search);
          const themeParam = params.get("theme");

          const isDark = themeParam
            ? themeParam === "dark"
            : parent.document.body.classList.contains("dark");
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
          transform: (sourceCode: string): string => {
            return (
              sourceCode
                // replace event bindings with shortcut
                .replaceAll("v-on:", "@")
                // remove empty event handlers, e.g. @click="()=>({})" will be removed
                .replaceAll(/ @.*['"]\(\)=>\({}\)['"]/g, "")
                // remove empty v-binds, e.g. v-bind="{}" will be removed
                .replaceAll(/ v-bind=['"]{}['"]/g, "")
                // replace boolean shortcuts for true, e.g. disabled="true" will be changed to just disabled
                .replaceAll(/:(.*)=['"]true['"]/g, "$1")
            );
          },
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
