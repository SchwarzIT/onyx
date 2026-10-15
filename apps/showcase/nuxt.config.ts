import { Features } from "lightningcss";
import type { NuxtConfig } from "nuxt/schema";
import { getSupportedOnyxBrowsers } from "./scripts/browserslistrc.js";

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
    domain: "https://onyx-showcase-dev.apps.01.cf.eu01.stackit.cloud",
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

function getLegacyRedirects(): NuxtConfig["routeRules"] {
  const getRedirect = (to: string): NonNullable<NuxtConfig["routeRules"]>[string] => {
    return {
      redirect: {
        to,
        // 307 = temporary redirect, 301 = permanent redirect
        statusCode: to.startsWith("https://") ? 307 : 301,
      },
    };
  };

  // TODO: also support ".html" prefixes for all routes
  return {
    "/basics/accessibility": getRedirect("/docs/foundation/accessibility"),
    "/basics/breakpoints-grid": getRedirect("/docs/foundation/breakpoints-and-grid"),
    "/basics/colors": getRedirect("/docs/foundation/colors"),
    "/basics/density": getRedirect("/docs/foundation/density"),
    "/basics/iconography": getRedirect("/components/basic/icon"),
    "/basics/images": getRedirect("/docs/foundation/images"),
    "/basics/infographics": getRedirect("/components/data/chart"),
    "/basics/layout": getRedirect("/docs/foundation/layouts"),
    "/basics/motion": getRedirect("/docs/foundation/animations"),
    "/basics/truncation": getRedirect("/docs/foundation/typography"),
    "/basics/typography": getRedirect("/docs/foundation/typography"),
    "/variables/colors": getRedirect("/docs/foundation/colors"),
    "/variables/spacings": getRedirect("/docs/foundation/density"),
    "/variables/fonts": getRedirect("/docs/foundation/typography"),
    // "/variables/borders": getRedirect("/docs/foundation/TODO"),
    // "/variables/shadows": getRedirect("/docs/foundation/TODO"),
    "/icons": getRedirect("/components/basic/icon"),
    "/flags": getRedirect("/components/basic/flag"),
    "/development": getRedirect("/docs/getting-started/installation"),
    "/development/theming": getRedirect("/docs/foundation/colors"),
    "/development/i18n": getRedirect("/docs/foundation/i18n"),
    "/development/grid": getRedirect("/docs/foundation/breakpoints-and-grid"),
    "/development/breakpoints": getRedirect("/docs/foundation/breakpoints-and-grid"),
    "/development/density": getRedirect("/docs/foundation/density"),
    "/development/typography": getRedirect("/docs/foundation/typography"),
    "/development/changelog": getRedirect("/docs/getting-started/changelog"),
    "/development/packages/chartjs-plugin": getRedirect("/components/data/chart"),
    "/development/packages/figma-utils": getRedirect(
      "https://www.npmjs.com/package/@sit-onyx/figma-utils",
    ),
    "/development/packages/flags": getRedirect("/components/basic/flag"),
    "/development/packages/github-metrics": getRedirect(
      "https://www.npmjs.com/package/@sit-onyx/github-metrics",
    ),
    "/development/packages/headless": getRedirect(
      "https://www.npmjs.com/package/@sit-onyx/headless",
    ),
    "/development/packages/icons": getRedirect("/components/basic/icon"),
    "/development/packages/mcp": getRedirect(
      "https://www.npmjs.com/package/@sit-onyx/modelcontextprotocol",
    ),
    "/development/packages/nuxt": getRedirect("/docs/getting-started/installation"),
    "/development/packages/nuxt-docs": getRedirect(
      "https://www.npmjs.com/package/@sit-onyx/nuxt-docs",
    ),
    "/development/packages/playwright-utils": getRedirect(
      "https://www.npmjs.com/package/@sit-onyx/playwright-utils",
    ),
    "/development/packages/storybook-utils": getRedirect(
      "https://www.npmjs.com/package/@sit-onyx/storybook-utils",
    ),
    "/development/packages/tiptap": getRedirect("/components/form-elements/text-editor"),
    "/development/packages/vitepress-theme": getRedirect(
      "https://www.npmjs.com/package/@sit-onyx/vitepress-theme",
    ),
    "/about/team": getRedirect("/"),
  };
}
