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
    sidebar: {
      // default sidebar items
      "/": [
        {
          text: "Introduction",
          collapsed: false,
          items: [
            { text: "Getting Started", link: "/getting-started" },
            { text: "The Team", link: "/team" },
          ],
        },
        {
          text: "Advanced",
          collapsed: false,
          items: [
            {
              text: "Additional packages",
              link: "/packages/",
            },
          ],
        },
        {
          text: "Components",
          base: "/components",
          collapsed: false,
          items: getComponents().map((name) => ({ text: name, link: `/${name}` })),
        },
      ],
      // standalone sidebar for documentation about our additional packages
      "/packages/": [
        {
          text: "Introduction",
          items: [
            { text: "Back to Onyx", link: "/getting-started" },
            { text: "About", link: "/packages/" },
          ],
        },
        {
          text: "Additional packages",
          base: "/packages",
          items: [
            {
              text: "@sit-onyx/figma-utils",
              link: "/figma-utils",
            },
            {
              text: "@sit-onyx/headless",
              link: "/headless",
            },
            {
              text: "@sit-onyx/storybook-utils",
              link: "/storybook-utils",
            },
          ],
        },
      ],
    },
  },
});
