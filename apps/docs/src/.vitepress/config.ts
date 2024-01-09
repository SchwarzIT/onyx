import { defineConfig } from "vitepress";
import packageJson from "../../../../packages/sit-onyx/package.json";
import { getComponents } from "./utils";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Onyx",
  description: "Vue.js component library and design system",
  themeConfig: {
    externalLinkIcon: true,
    logo: {
      light: "/logo-light.svg",
      dark: "/logo-dark.svg",
    },
    footer: {
      message: "Released under the Apache-2.0 License.",
      copyright: "Copyright © 2023-present Schwarz IT KG",
    },
    search: {
      provider: "local",
    },
    editLink: {
      pattern: `${packageJson.repository.url}/edit/main/apps/docs/src/:path`,
    },
    lastUpdated: {}, // needed to show the last updated text with default settings
    nav: [
      { text: "Getting Started", link: "/getting-started" },
      { text: "Report a bug", link: packageJson.bugs.url },
      { text: "Q&A", link: "https://github.com/schwarzit/onyx/discussions/categories/q-a" },
    ],
    socialLinks: [{ icon: "github", link: packageJson.repository.url }],
    sidebar: [
      {
        text: "Introduction",
        collapsed: false,
        items: [
          { text: "Getting Started", link: "/getting-started" },
          { text: "The Team", link: "/team" },
        ],
      },
      {
        text: "Components",
        base: "/components",
        collapsed: false,
        items: getComponents().map((name) => ({ text: name, link: `/${name}` })),
      },
      {
        text: "Other npm packages",
        base: "/packages",
        collapsed: false,
        items: [
          { text: "Figma utilities", link: "/figma-utils" },
          { text: "Headless composables", link: "/headless" },
          { text: "Storybook utilities", link: "/storybook-utils" },
        ],
      },
    ],
  },
});
