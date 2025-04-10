import type { ArgTypes, Decorator, StoryObj } from "@storybook/vue3";
import type { DefineComponent } from "vue";
import OnyxToast from "../components/OnyxToast/OnyxToast.vue";

/**
 * Defines the control for a Storybook argType to be a select/dropdown of
 * all available onyx icons.
 *
 * @example
 * ```ts
 * {
 *   argTypes: {
 *     icon: defineIconSelectArgType(),
 *   }
 * }
 * ```
 */
export const defineIconSelectArgType = () => {
  const ALL_ICONS = import.meta.glob("../../node_modules/@sit-onyx/icons/src/assets/*.svg", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  /**
   * Mapping between icon SVG content (key) and icon name (value).
   * Needed to display a labelled dropdown list of all available icons.
   */
  const iconLabels = Object.entries(ALL_ICONS).reduce<Record<string, string>>(
    (labels, [filePath, content]) => {
      labels[content as string] = filePath.split("/").at(-1)!.replace(".svg", "");
      return labels;
    },
    {},
  );

  return {
    options: Object.keys(iconLabels),
    control: {
      type: "select",
      labels: iconLabels,
    },
  } satisfies ArgTypes[number];
};

/**
 * Storybook decorator that wraps the story with a <div> that sets the text color
 * to neutral intense.
 * Useful if the component uses "currentColor" in its CSS.
 */
export const textColorDecorator: Decorator = (story) => ({
  components: { story },
  template: `
  <div style="color: var(--onyx-color-text-icons-neutral-intense)">
    <story />
  </div>`,
});

/**
 * Utility for creating a Storybook example/story where the example uses a dedicated .vue file (useful for advanced examples).
 * The example must be put inside e.g. "src/components/{componentName}/examples/{exampleName}".
 *
 * Make sure to import all onyx components, types etc. from the index file "../../../" so its replaced correctly in the code snippet.
 * Will also make the OnyxToast available to be used inside the example.
 *
 * **Note** The "Controls" and "Actions" panel/tab will be disabled for this story since they will probably be mostly unusable due to the custom example.
 */
export function createAdvancedStoryExample(componentName: string, exampleName: string) {
  const allExamples: Record<string, DefineComponent> = import.meta.glob(
    "../components/*/examples/*.vue",
    {
      eager: true,
      import: "default",
    },
  );
  const allCodeSnippets: Record<string, string> = import.meta.glob(
    "../components/*/examples/*.vue",
    {
      eager: true,
      query: "?raw",
      import: "default",
    },
  );

  const path = `../components/${componentName}/examples/${exampleName}.vue`;
  const Component = allExamples[path];
  const codeSnippet = allCodeSnippets[path];

  return {
    render: (args) => ({
      components: { Component, OnyxToast },
      setup: () => ({ args }),
      template: `<OnyxToast /> <Component />`,
    }),
    parameters: {
      docs: {
        source: {
          code: codeSnippet.replace('from "../../.."', 'from "sit-onyx"'),
        },
      },
      controls: {
        disable: true,
      },
      actions: {
        disable: true,
      },
    },
  } satisfies StoryObj;
}
