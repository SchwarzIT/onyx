import { Features } from "lightningcss";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  extends: ["@sit-onyx/nuxt-docs"],
  modules: ["nuxt-studio", "nuxt-auth-utils", "@vueuse/nuxt"],
  app: {
    head: {
      link: [{ rel: "icon", href: "/onyx-logo.svg" }],
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [{ code: "en", language: "en-US", file: "en-US.json", name: "English" }],
  },
  studio: {
    dev: process.env.NUXT_STUDIO_DEV_DISABLED !== "true",
    // git repository configuration
    repository: {
      provider: "github",
      owner: "SchwarzIT",
      repo: "onyx",
      rootDir: "apps/showcase",
      private: false,
      // Nuxt Studio does not yet support creating Pull Requests. Since our main branch is protected, we use a
      // different branch here so Nuxt Studio can push the changes there directly and we can create the PR manually for now
      branch: "nuxt-studio",
    },
    meta: {
      // see: https://nuxt.studio/setup#components-meta
      components: {
        exclude: ["Prose*"],
      },
    },
  },
  vite: {
    css: {
      lightningcss: {
        // see: https://github.com/parcel-bundler/lightningcss/issues/873
        exclude: Features.LightDark,
      },
    },
  },
  imports: {
    transform: {
      // fix "Identifier 'h' has already been declared" error which occurs only inside this monorepo
      // see: https://github.com/nuxt/nuxt/issues/18823#issuecomment-1419704343
      exclude: [/\bpackages\/flags\b/, /\bpackages\/icons\b/],
    },
  },
});
