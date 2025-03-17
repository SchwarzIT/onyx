import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBreadcrumbItem from "../OnyxBreadcrumbItem/OnyxBreadcrumbItem.vue";
import OnyxBreadcrumb from "./OnyxBreadcrumb.vue";

const meta: Meta<typeof OnyxBreadcrumb> = {
  title: "Navigation/Breadcrumb",
  component: OnyxBreadcrumb,
};

export default meta;
type Story = StoryObj<typeof OnyxBreadcrumb>;

export const WithSlot: Story = {
  args: {
    label: "Breadcrumb",
    home: {
      label: "Home",
      link: "/",
    },
    default: [
      h(OnyxBreadcrumbItem, { label: "Foo", link: "/foo" }),
      h(OnyxBreadcrumbItem, { label: "Bar", link: "/foo/bar" }),
      h(OnyxBreadcrumbItem, { label: "Buz", link: "/foo/bar/buz" }),
    ],
  },
};
