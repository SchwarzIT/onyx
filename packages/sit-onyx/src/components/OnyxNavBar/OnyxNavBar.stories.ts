import browserTerminal from "@sit-onyx/icons/browser-terminal.svg?raw";
import logout from "@sit-onyx/icons/logout.svg?raw";
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import { defineStorybookActionsAndVModels, sourceCodeTransformer } from "@sit-onyx/storybook-utils";
import type { Decorator, Meta, StoryObj } from "@storybook/vue3";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { ListboxOption } from "../OnyxListbox/types";
import OnyxNavItem from "../OnyxNavItem/OnyxNavItem.vue";
import OnyxNavSeparator from "../OnyxNavSeparator/OnyxNavSeparator.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import OnyxUserMenu from "../OnyxUserMenu/OnyxUserMenu.vue";
import OnyxNavBar from "./OnyxNavBar.vue";

const meta: Meta<typeof OnyxNavBar> = {
  title: "components/NavBar",
  ...defineStorybookActionsAndVModels({
    component: OnyxNavBar,
    events: ["appAreaClick", "backButtonClick"],
    argTypes: {
      default: { control: { disable: true } },
      contextArea: { control: { disable: true } },
      appArea: { control: { type: "text" } },
    },
    render: getRenderFunction(),
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxNavBar>;

export const Default = {
  args: {
    logoUrl: "/onyx-logo.svg",
    appName: "App name",
  },
} satisfies Story;

export const WithBackButton = {
  args: {
    ...Default.args,
    withBackButton: true,
  },
} satisfies Story;

export const WithContextArea = {
  args: {
    ...Default.args,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="margin-bottom: 16rem;"> <story /> </div>`,
    }),
  ] as Decorator[],
  // TODO: add user menu options
  render: getRenderFunction(`
  <template #contextArea>
    <OnyxTag label="QA stage" color="warning" icon='${browserTerminal}' />
    <OnyxNavSeparator />
    <OnyxUserMenu username="Jane Doe" description="Company name" :options='${JSON.stringify([
      { value: "/settings", label: "Settings", icon: settings },
      { value: "logout", label: "Logout", icon: logout, color: "danger" },
    ] satisfies ListboxOption[])}'>
      <template #footer>
        App version <span class="onyx-text--monospace">1.0.0</span>
      </template>
    </OnyxUserMenu>
  </template>
  `),
  parameters: {
    docs: {
      source: {
        // improve code snippet by adding the icon import
        transform: (sourceCode: string) => {
          // using this custom transformer would override the default one
          // so we are calling the default transformer here
          const code = sourceCodeTransformer(sourceCode);

          return `<script lang="ts" setup>
          import browserTerminal from "@sit-onyx/icons/browser-terminal.svg?raw";
          </script>
          ${code.replace(`icon='${browserTerminal}'`, ':icon="browserTerminal"')}`;
        },
      },
    },
  },
} satisfies Story;

/**
 * This example shows a navigation bar with custom app area content.
 */
export const WithCustomAppArea = {
  args: {
    ...Default.args,
  },
  render: getRenderFunction(`
  <template #appArea>
    <OnyxIcon icon='${placeholder}' color="primary" />
    Custom name
  </template>
  `),
  parameters: {
    docs: {
      source: {
        // improve code snippet by adding the icon import
        transform: (sourceCode: string) => {
          // using this custom transformer would override the default one
          // so we are calling the default transformer here
          const code = sourceCodeTransformer(sourceCode);

          return `<script lang="ts" setup>
          import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
          </script>
          ${code.replace(`icon='${placeholder}'`, ':icon="placeholder"')}`;
        },
      },
    },
  },
} satisfies Story;

function getRenderFunction(slots?: string) {
  return (args: Record<string, unknown>) => ({
    setup: () => ({ args }),
    components: {
      OnyxNavBar,
      OnyxNavItem,
      OnyxBadge,
      OnyxIcon,
      OnyxTag,
      OnyxUserMenu,
      OnyxNavSeparator,
    },
    template: `
      <OnyxNavBar v-bind="args">
        <OnyxNavItem label="Item" href="#" active />
        <OnyxNavItem label="Item" href="#">
          Item
          <OnyxBadge color="warning" dot />
        </OnyxNavItem>
        <OnyxNavItem label="Item" href="https://onyx.schwarz" />
        ${slots ?? ""}
      </OnyxNavBar>`,
  });
}
