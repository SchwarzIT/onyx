import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.ts"],
  addons: ["@storybook/addon-essentials", "storybook-dark-mode"],
  framework: "@storybook/vue3-vite",
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: true,
  },
};

export default config;
