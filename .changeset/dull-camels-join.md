---
"@sit-onyx/nuxt-docs": minor
---

perf(nuxt-docs): remove `@nuxt/image` due to performance issues

We've experienced performance issues / "out of memory" issues for some deployment providers when using `@nuxt/image`.
The `@nuxt/image` module and `ProseImg` was now removed by default so images are no longer automatically optimized.
Also, you now no longer need to include the `sharp` onlyBuiltDependencies in your `pnpm-workspace.yaml`.

If you still want to use `@nuxt/image`, simply install the module in your project and create a `app/components/content/ProseImg.vue` file where you are using the `<NuxtImg />` component.
