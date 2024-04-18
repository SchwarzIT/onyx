import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["./pages/*.mdx", "../src/**/*.stories.ts"],
  addons: ["@storybook/addon-essentials", "storybook-dark-mode"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      docgen: "vue-component-meta",
    },
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: true,
  },
};

export default config;
