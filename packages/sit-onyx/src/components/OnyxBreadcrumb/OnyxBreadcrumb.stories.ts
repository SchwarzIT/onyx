import type { Meta, StoryObj } from "@storybook/vue3";
import { h, provide, ref } from "vue";
import { ROUTER_INJECTION_KEY } from "../../composables/useLink";
import OnyxBreadcrumbItem from "../OnyxBreadcrumbItem/OnyxBreadcrumbItem.vue";
import OnyxBreadcrumb from "./OnyxBreadcrumb.vue";

const meta: Meta<typeof OnyxBreadcrumb> = {
  title: "Navigation/Breadcrumb",
  component: OnyxBreadcrumb,
  argTypes: {
    default: { control: { disable: true } },
  },
  decorators: [
    (story) => ({
      components: { story },
      setup: () => {
        // mock current route here for demonstration purposes
        provide(ROUTER_INJECTION_KEY, {
          currentRoute: ref("/foo/bar/baz"),
          push: () => ({}), // disable navigation inside the Story iframe
        });
      },
      template: `<div> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxBreadcrumb>;

export const Default = {
  args: {
    default: () => [
      h(OnyxBreadcrumbItem, { href: "/foo" }, () => "Foo"),
      h(OnyxBreadcrumbItem, { href: "/foo/bar" }, () => "Bar"),
      h(OnyxBreadcrumbItem, { href: "/foo/bar/baz" }, () => "Baz"),
    ],
  },
} satisfies Story;

export const Container = {
  args: {
    ...Default.args,
    container: true,
  },
} satisfies Story;

export const CustomHome = {
  args: {
    ...Default.args,
    home: {
      link: "#custom-link",
      label: "Custom home",
    },
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
