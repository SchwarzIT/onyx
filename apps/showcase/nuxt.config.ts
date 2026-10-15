import { Features } from "lightningcss";
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
