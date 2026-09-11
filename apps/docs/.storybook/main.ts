import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["../src/.vitepress/**/*.stories.ts"],
  addons: ["@storybook/addon-docs", "@vueless/storybook-dark-mode"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      docgen: {
        plugin: "vue-component-meta",
        tsconfig: "tsconfig.app.json",
      },
    },
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
