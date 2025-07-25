import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { DARK_MODE_EVENT_NAME, UPDATE_DARK_MODE_EVENT_NAME } from "@vueless/storybook-dark-mode";
import { addons } from "storybook/internal/preview-api";
import { ref, watch } from "vue";
import ComponentShowcase from "./ComponentShowcase.vue";

const channel = addons.getChannel();

const meta: Meta<typeof ComponentShowcase> = {
  title: "Examples/Component Showcase",
  component: ComponentShowcase,
  tags: ["!autodocs"],
  /**
   * Custom rendered to update the Storybook light/dark mode when the switch inside the component showcase is changed.
   */
  render: (args) => ({
    setup: () => {
      const isDark = ref();
      channel.on(DARK_MODE_EVENT_NAME, (darkMode: boolean) => {
        isDark.value = darkMode;
      });

      watch(isDark, (newDark, oldDark) => {
        if (oldDark == undefined) return; // prevent infinity re-rendering loop
        channel.emit(UPDATE_DARK_MODE_EVENT_NAME, newDark ? "dark" : "light");
      });

      return { isDark, args };
    },
    components: { ComponentShowcase },
    template: `<ComponentShowcase v-bind="args" v-model:dark="isDark" />`,
  }),
};

export default meta;
type Story = StoryObj<typeof ComponentShowcase>;

export const Default = { args: {} } satisfies Story;
