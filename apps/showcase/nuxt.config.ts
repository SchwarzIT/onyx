import { Features } from "lightningcss";
import type { NuxtConfig } from "nuxt/schema";
import { getSupportedOnyxBrowsers } from "./scripts/browserslistrc.js";

const DEPLOYMENT_DOMAIN = "https://onyx-showcase-dev.apps.01.cf.eu01.stackit.cloud";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  extends: ["@sit-onyx/nuxt-docs"],
  modules: ["nuxt-auth-utils", "@vueuse/nuxt", "nuxt-llms"],
  css: ["@sit-onyx/tiptap/style.css", "@sit-onyx/comark/style.css"],
  app: {
    head: {
      link: [{ rel: "icon", href: "/favicon.svg" }],
    },
  },
  routeRules: getLegacyRedirects(),
  i18n: {
    defaultLocale: "en",
    locales: [{ code: "en", language: "en-US", file: "en-US.json", name: "English" }],
  },
  components: [
    {
      path: "~/components",
    },
    {
      path: "~/components/prose",
      global: true,
      pathPrefix: false,
      priority: 2, // needed to override default prose components
    },
  ],
  content: {
    experimental: {
      // use native Node sqlite so we don't need "better-sqlite3" dependency
      sqliteConnector: "native",
    },
  },
  llms: {
    domain: DEPLOYMENT_DOMAIN,
  },
  vite: {
    css: {
      lightningcss: {
        // see: https://github.com/parcel-bundler/lightningcss/issues/873
        exclude: Features.LightDark,
      },
    },
  },
  runtimeConfig: {
    public: {
      // parse ".browserslistrc" at build time so they are available in the client app (since parsing requires Node runtime)
      browsers: getSupportedOnyxBrowsers(),
      domain: DEPLOYMENT_DOMAIN,
    },
  },
  imports: {
    transform: {
      // fix "Identifier 'h' has already been declared" error which occurs only inside this monorepo
      // see: https://github.com/nuxt/nuxt/issues/18823#issuecomment-1419704343
      exclude: [/\bpackages\/flags\b/, /\bpackages\/icons\b/],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
});

/**
 * Gets redirects from the legacy (VitePress) documentation to the new showcase to still support old
 * URLs.
 */
export function getLegacyRedirects(): NuxtConfig["routeRules"] {
  const mapping: Record<string, string> = {
    "/basics/accessibility": "/docs/foundation/accessibility",
    "/basics/breakpoints-grid": "/docs/foundation/breakpoints-and-grid",
    "/basics/colors": "/docs/foundation/colors",
    "/basics/density": "/docs/foundation/density",
    "/basics/iconography": "/components/basic/icon",
    "/basics/images": "/docs/foundation/images",
    "/basics/infographics": "/components/data/chart",
    "/basics/layout": "/docs/foundation/layouts",
    "/basics/motion": "/docs/foundation/animations",
    "/basics/truncation": "/docs/foundation/typography",
    "/basics/typography": "/docs/foundation/typography",
    "/variables/colors": "/docs/foundation/colors",
    "/variables/spacings": "/docs/foundation/density",
    "/variables/fonts": "/docs/foundation/typography",
    "/variables/borders": "/docs/foundation/borders-and-shadows",
    "/variables/shadows": "/docs/foundation/borders-and-shadows",
    "/icons": "/components/basic/icon",
    "/flags": "/components/basic/flag",
    "/development": "/docs/getting-started/installation",
    "/development/theming": "/docs/foundation/colors",
    "/development/i18n": "/docs/foundation/i18n",
    "/development/grid": "/docs/foundation/breakpoints-and-grid",
    "/development/breakpoints": "/docs/foundation/breakpoints-and-grid",
    "/development/density": "/docs/foundation/density",
    "/development/typography": "/docs/foundation/typography",
    "/development/changelog": "/docs/getting-started/changelog",
    "/development/packages/chartjs-plugin": "/components/data/chart",
    "/development/packages/figma-utils": "https://www.npmjs.com/package/@sit-onyx/figma-utils",
    "/development/packages/flags": "/components/basic/flag",
    "/development/packages/github-metrics":
      "https://www.npmjs.com/package/@sit-onyx/github-metrics",
    "/development/packages/headless": "https://www.npmjs.com/package/@sit-onyx/headless",
    "/development/packages/icons": "/components/basic/icon",
    "/development/packages/mcp": "https://www.npmjs.com/package/@sit-onyx/modelcontextprotocol",
    "/development/packages/nuxt": "/docs/getting-started/installation",
    "/development/packages/nuxt-docs": "https://www.npmjs.com/package/@sit-onyx/nuxt-docs",
    "/development/packages/playwright-utils":
      "https://www.npmjs.com/package/@sit-onyx/playwright-utils",
    "/development/packages/storybook-utils":
      "https://www.npmjs.com/package/@sit-onyx/storybook-utils",
    "/development/packages/tiptap": "/components/form-elements/text-editor",
    "/development/packages/vitepress-theme":
      "https://www.npmjs.com/package/@sit-onyx/vitepress-theme",
    "/about/team": "/",
  };

  return Object.entries(mapping).reduce(
    (routeRules, [from, to]) => {
      // generate both exact and .html rules for each entry
      const rule: NonNullable<NuxtConfig["routeRules"]>[string] = {
        redirect: {
          to,
          // 307 = temporary redirect, 301 = permanent redirect
          statusCode: to.startsWith("https://") ? 307 : 301,
        },
      };

      routeRules[from] = rule;
      routeRules[`${from}.html`] = rule;
      return routeRules;
    },
    {} as NonNullable<NuxtConfig["routeRules"]>,
  );
}
