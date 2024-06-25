import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: ["./pages/*.mdx", "../src/**/*.stories.ts"],
  addons: ["@storybook/addon-essentials", "storybook-dark-mode"],
  staticDirs: ["./public"],
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
  managerHead: (head) => `
    ${head}
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en">
    <meta property="og:title" content="onyx | Storybook">
    <meta property="og:description" content="Component overview and API documentation for onyx">
    <meta property="og:site_name" content="onyx Storybook">
    <meta property="og:image" content="https://storybook.onyx.schwarz/og-storybook-logo.jpg">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://storybook.onyx.schwarz">
  `,
};

export default config;
