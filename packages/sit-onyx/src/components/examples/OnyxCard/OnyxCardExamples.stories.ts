import type { Meta, StoryObj } from "@storybook/vue3";
import type { Component } from "vue";
import OnyxCard from "../../OnyxCard/OnyxCard.vue";

const meta: Meta<typeof OnyxCard> = {
  title: "Basic/Card/Examples",
  component: OnyxCard,
  tags: ["!autodocs"],
  argTypes: {
    style: { table: { disable: true } },
    default: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxCard>;

export const HeadlineAndText = await createExampleStory("HeadlineCardExample");

export const ImageCard = await createExampleStory("ImageCardExample");

export const IconCard = await createExampleStory("IconCardExample");

export const DetailsCard = await createExampleStory("DetailsCardExample");

export const KPICard = await createExampleStory("KPICardExample");

/**
 * Utility to create a story for a given example component. Will render the example and set the source code accordingly.
 *
 * @param exampleName Base name of the example file, e.g. for "MyExample.vue", pass "MyExample"
 */
async function createExampleStory(exampleName: string) {
  const components = import.meta.glob<Component>("./*.vue", { import: "default" });
  const componentCodes = import.meta.glob<string>("./*.vue", { import: "default", query: "?raw" });

  const exampleFileName = `./${exampleName}.vue`;
  const ExampleComponent = await components[exampleFileName]();
  const sourceCode = await componentCodes[exampleFileName]();

  return {
    render: () => ({
      components: { ExampleComponent },
      template: `<ExampleComponent />`,
    }),
    parameters: {
      docs: {
        source: {
          // Removes the comment enclosed block to simplify the source example
          code: sourceCode.replaceAll('from "../../.."', 'from "sit-onyx"'),
        },
      },
    },
  } satisfies Story;
}
