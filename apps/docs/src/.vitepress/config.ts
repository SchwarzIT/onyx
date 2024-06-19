import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";
import packageJson from "../../../../packages/sit-onyx/package.json";

const storybookLink = "https://storybook.onyx.schwarz" as const;

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "~components": getFilePath("../../../../packages/sit-onyx/src/components"),
      },
    },
  },
  title: "onyx",
  description: packageJson.description,
  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }],
    ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    ["link", { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#0c1f2d" }],
    ["meta", { name: "msapplication-TileColor", content: "#0c1f2d" }],
    ["meta", { name: "theme-color", content: "#0c1f2d" }],
  ],
  themeConfig: {
    externalLinkIcon: true,
    logo: "/images/logo.svg",
    siteTitle: false,
    search: {
      provider: "local",
    },
    editLink: {
      pattern: `${packageJson.repository.url}/edit/main/apps/docs/src/:path`,
    },
    lastUpdated: {}, // needed to show the last updated text with default settings
    nav: [
      { text: "Brand", link: "/brand/team", activeMatch: "/brand/" },
      { text: "Basics", link: "/basics/", activeMatch: "/basics/" },
      { text: "Tokens", link: "/tokens/introduction", activeMatch: "/tokens/" },
      { text: "Development", link: "/development/", activeMatch: "/development/" },
      {
        text: "Resources",
        activeMatch: "/resources/",
        items: [
          { text: "Icons", link: "/resources/icons" },
          { text: "Storybook", link: storybookLink },
          { text: "Report a bug", link: packageJson.bugs.url },
          { text: "Q&A", link: "https://github.com/SchwarzIT/onyx/discussions/categories/q-a" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: packageJson.repository.url }],
    sidebar: {
      "/brand": [
        {
          text: "Brand",
          items: [
            { text: "The Team", link: "/brand/team" },
            { text: "Philosophy", link: "/brand/philosophy" },
          ],
        },
      ],
      "/basics": [
        {
          text: "Foundations",
          collapsed: false,
          base: "/basics",
          items: [
            { text: "Colors", link: "/colors" },
            { text: "Breakpoints & Grid", link: "/breakpoints-grid" },
            { text: "Layout", link: "/layout" },
            { text: "Units", link: "/units" },
            { text: "Motion", link: "/motion" },
            { text: "States", link: "/states" },
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
            { text: "Notifications", link: "/notifications" },
            { text: "Search behavior", link: "/search-behavior" },
            { text: "Dialogs", link: "/dialogs" },
          ].sort((a, b) => a.text.localeCompare(b.text)),
        },
      ],
      "/tokens": [
        {
          text: "Design Tokens",
          base: "/tokens",
          items: [
            { text: "Introduction", link: "/introduction" },
            { text: "Colors", link: "/colors" },
            { text: "Spacings", link: "/spacings" },
            { text: "Borders", link: "/borders" },
            { text: "Shadows", link: "/shadows" },
          ],
        },
      ],
      "/development": [
        {
          text: "Introduction",
          collapsed: false,
          base: "/development",
          items: [
            { text: "Getting Started", link: "/" },
            { text: "Theming", link: "/theming" },
            { text: "i18n", link: "/i18n" },
            { text: "Grid", link: "/grid" },
            { text: "Breakpoints", link: "/breakpoints" },
            { text: "Density", link: "/density" },
            { text: "Typography", link: "/typography" },
            { text: "Changelog", link: "/packages/changelogs/sit-onyx" },
          ],
        },
        {
          text: "Components",
          items: [{ text: "Storybook", link: storybookLink }],
        },
        {
          text: "Other onyx npm packages",
          base: "/development/packages",
          collapsed: false,
          items: [
            { text: "Chart.js plugin", link: "/chartjs-plugin" },
            { text: "Figma utilities", link: "/figma-utils" },
            { text: "Headless composables", link: "/headless" },
            { text: "Icons", link: "/icons" },
            { text: "Nuxt", link: "/nuxt" },
            { text: "Storybook utilities", link: "/storybook-utils" },
            { text: "VitePress theme", link: "/vitepress-theme" },
          ],
        },
      ],
      "/resources": [
        {
          text: "Resources",
          base: "/resources",
          items: [{ text: "Icons", link: "/icons" }],
        },
      ],
    },
  },
});

/** Gets the given path while ensuring cross-platform and correct decoding */
function getFilePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}
