import { defineConfig } from "vitepress";
import packageJson from "../../../../packages/sit-onyx/package.json";
import { getComponents } from "./utils";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "onyx",
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
      { text: "Brand", link: "/brand/team" },
      { text: "Basics", link: "/basics/" },
      { text: "Tokens", link: "/tokens/" },
      { text: "Development", link: "/development/getting-started" },
      { text: "Report a bug", link: packageJson.bugs.url },
      { text: "Q&A", link: "https://github.com/schwarzit/onyx/discussions/categories/q-a" },
    ],
    socialLinks: [{ icon: "github", link: packageJson.repository.url }],
    sidebar: {
      "/brand": [
        {
          items: [{ text: "The Team", link: "/brand/team" }],
        },
      ],
      "/basics": [
        {
          text: "Foundations",
          collapsed: false,
          base: "/basics",
          items: [{ text: "Introduction", link: "/" }],
        },
        {
          text: "Patterns",
          collapsed: false,
          base: "/basics",
          items: [],
        },
      ],
      "/tokens": [
        {
          items: [{ text: "Introduction", link: "/tokens/" }],
        },
      ],
      "/development": [
        {
          text: "Introduction",
          collapsed: false,
          base: "/development",
          items: [
            { text: "Getting Started", link: "/getting-started" },
            { text: "i18n", link: "/i18n" },
            { text: "Typography", link: "/typography" },
          ],
        },
        {
          text: "Components",
          base: "/development",
          collapsed: false,
          items: getComponents().map((name) => ({ text: name, link: `/${name}` })),
        },
        {
          text: "Other onyx npm packages",
          base: "/development/packages",
          collapsed: false,
          items: [
            { text: "Figma utilities", link: "/figma-utils" },
            { text: "Headless composables", link: "/headless" },
            { text: "Storybook utilities", link: "/storybook-utils" },
            { text: "VitePress theme", link: "/vitepress-theme" },
          ],
        },
      ],
    },
  },
});
