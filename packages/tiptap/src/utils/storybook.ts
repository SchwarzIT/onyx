import type { StoryObj } from "@storybook/vue3-vite";
import type { DefineComponent } from "vue";

/**
 * Utility for creating a Storybook example/story where the example uses a dedicated .vue file (useful for advanced examples).
 * The example must be put inside e.g. "src/components/{componentName}/examples/{exampleName}".
 *
 * Make sure to import all onyx components, types etc. from the index file "../../../" so its replaced correctly in the code snippet.
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

  if (!Component || !codeSnippet) {
    throw new Error(`Example component ${exampleName} for component ${componentName} not found!`);
  }

  return {
    render: (args) => ({
      components: { Component },
      setup: () => ({ args }),
      template: "<Component />",
    }),
    parameters: {
      docs: {
        source: {
          code: codeSnippet.replace(/from "(\.\.\/)+\w*\.?\w*"/, 'from "@sit-onyx/tiptap"'),
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
