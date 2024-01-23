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
      { text: "Brand", link: "/brand/" },
      { text: "Basics", link: "/basics/" },
      { text: "Tokens", link: "/tokens/" },
      { text: "Components", link: "/components/" },
      { text: "Resources", link: "/resources/" },
      { text: "Report a bug", link: packageJson.bugs.url },
      { text: "Q&A", link: "https://github.com/schwarzit/onyx/discussions/categories/q-a" },
    ],
    socialLinks: [{ icon: "github", link: packageJson.repository.url }],
    sidebar: {
      "/brand": [
        {
          items: [
            { text: "The Team", link: "/brand/team" },
            { text: "Ideology", link: "/brand/ideology" },
            { text: "Principles", link: "/brand/principles" },
            { text: "Dependencies", link: "/brand/dependencies" },
            { text: "Roadmap", link: "/brand/roadmap" },
            { text: "Changelog", link: "/brand/changelog" },
          ],
        },
      ],
      "/components": [
        {
          text: "Introduction",
          collapsed: false,
          base: "/components",
          items: [
            { text: "Getting Started", link: "/" },
            { text: "i18n", link: "/i18n/" },
            { text: "Typography", link: "/typography" },
          ],
        },
        {
          text: "Components",
          base: "/components",
          collapsed: false,
          items: getComponents().map((name) => ({ text: name, link: `/${name}` })),
        },
      ],
      "/basics": [
        {
          text: "Foundations",
          collapsed: false,
          base: "/basics",
          items: [
            { text: "Cheatsheet", link: "/cheatsheet" },
            { text: "Colors", link: "/colors" },
            { text: "Breakpoints & Grid", link: "/breakpoints_grid" },
            { text: "Layout", link: "/layout" },
            { text: "Appearance", link: "/appearance" },
            { text: "Motion", link: "/motion" },
            //{ text: "Component states", link: "/states" },
            { text: "Density", link: "/density" },
            { text: "Truncation", link: "/truncation" },
            { text: "Elevation", link: "/elevation" },
            { text: "Iconography", link: "/iconography" },
            { text: "Typography", link: "/typography" },
            { text: "Images", link: "/images" },
            { text: "Accessibility", link: "/accessibility" },
            { text: "Infographics", link: "/infographics" },
          ].sort((a, b) => a.text.localeCompare(b.text)),
        },
        {
          text: "Patterns",
          collapsed: false,
          base: "/basics",
          items: [
            { text: "Navigation", link: "/navigation" },
            { text: "Notifications", link: "/notification" },
            { text: "Search behavior", link: "/searchbehavior" },
            { text: "Dialogs", link: "/dialogs" },
          ].sort((a, b) => a.text.localeCompare(b.text)),
        },
      ],
      "/resources": [
        {
          items: [{ text: "test", link: "/resources" }],
        },
      ],
      "/tokens": [
        {
          items: [{ text: "Introduction", link: "/tokens/introduction" }],
        },
      ],
      // default sidebar
      "/": [
        {
          text: "Other Onyx npm packages",
          base: "/packages",
          collapsed: false,
          items: [
            { text: "Figma utilities", link: "/figma-utils" },
            { text: "Headless composables", link: "/headless" },
            { text: "Storybook utilities", link: "/storybook-utils" },
            { text: "VitePress theme", link: "/vitepress-theme" },
          ],
        },
      ],
      // sidebar for UX content
      "/design": [],
    },
  },
});
