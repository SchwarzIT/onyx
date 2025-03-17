import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBreadcrumbItem from "../OnyxBreadcrumbItem/OnyxBreadcrumbItem.vue";
import OnyxBreadcrumb from "./OnyxBreadcrumb.vue";

const meta: Meta<typeof OnyxBreadcrumb> = {
  title: "Navigation/Breadcrumb",
  component: OnyxBreadcrumb,
  tags: ["new:component"],
  argTypes: {
    default: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxBreadcrumb>;

export const Default = {
  args: {
    default: () => [
      h(OnyxBreadcrumbItem, { label: "Foo", link: "/foo" }),
      h(OnyxBreadcrumbItem, { label: "Bar", link: "/foo/bar" }),
      h(OnyxBreadcrumbItem, { label: "Baz", link: "/foo/bar/baz" }),
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
