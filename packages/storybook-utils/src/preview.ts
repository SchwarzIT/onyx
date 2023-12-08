import type { Preview } from "@storybook/vue3";
import { deepmerge } from "deepmerge-ts";

/**
 * Creates a default Storybook preview configuration for NUI with the following features:
 * - Improved controls (sorting and expanded controls so descriptions etc. are also shown in a single story)
 * - Improved Vue-specific code highlighting (e.g. using `@` instead of `v-on:`)
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
    },
  } satisfies Preview;

  return deepmerge<[T, typeof defaultPreview]>(overrides ?? ({} as T), defaultPreview);
};
