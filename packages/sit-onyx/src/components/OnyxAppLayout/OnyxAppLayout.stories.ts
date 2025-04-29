import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../utils/storybook";
import OnyxAppLayout from "./OnyxAppLayout.vue";

/**
 * Layout component that structures your application. Will define scroll containers correctly, so e.g. the nav bar is excluded in the page scroll.
 * Supports slots for common global app elements, e.g. the nav bar and page content.
 * Recommended to be used once in the root of your application (typically the App.vue file).
 */
const meta: Meta<typeof OnyxAppLayout> = {
  title: "Layout/AppLayout",
  component: OnyxAppLayout,
  argTypes: {
    default: { control: { disable: true } },
    nav: { control: { disable: true } },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div style="font-family: var(--onyx-font-family); color: var(--onyx-color-text-icons-neutral-intense);" >
          <story />
        </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxAppLayout>;

export const Default = createAdvancedStoryExample(
  "OnyxAppLayout",
  "DefaultExample",
) satisfies Story;

export const LeftNav = createAdvancedStoryExample(
  "OnyxAppLayout",
  "LeftNavExample",
) satisfies Story;
