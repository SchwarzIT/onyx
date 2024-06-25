import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";
import packageJson from "../../../../packages/sit-onyx/package.json";

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
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "en" }],
    [
      "meta",
      { property: "og:title", content: "onyx | Design system and Vue.js component library" },
    ],
    [
      "meta",
      {
        property: "og:description",
        content: "Enterprise design system and Vue.js component library by Schwarz IT",
      },
    ],
    ["meta", { property: "og:site_name", content: "onyx" }],
    ["meta", { property: "og:image", content: "https://onyx.schwarz/images/og-logo.jpg" }],
    ["meta", { property: "og:image:type", content: "image/jpeg" }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { property: "og:url", content: "https://onyx.schwarz" }],
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
      {
        text: "Docs",
        items: [
          { text: "Basics", link: "/basics/", activeMatch: "/basics/" },
          { text: "Tokens", link: "/tokens/colors", activeMatch: "/tokens/" },
          { text: "Development", link: "/development/", activeMatch: "/development/" },
        ],
      },
      { text: "Components", link: "https://storybook.onyx.schwarz" },
      { text: "Icons", link: "/icons" },
      {
        text: "Resources",
        items: [
          { text: "About", link: "/about/team", activeMatch: "/about/" },
          { text: "Playground", link: "https://playground.onyx.schwarz" },
          { text: "Report a bug", link: packageJson.bugs.url },
          { text: "Q&A", link: "https://github.com/SchwarzIT/onyx/discussions/categories/q-a" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: packageJson.repository.url }],
    sidebar: {
      "/about": [
        {
          text: "About",
          items: [
            { text: "The Team", link: "/about/team" },
            { text: "Philosophy", link: "/about/philosophy" },
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
          ].sort((a, b) => a.text.localeCompare(b.text)),
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
