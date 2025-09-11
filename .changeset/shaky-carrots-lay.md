---
"@sit-onyx/playwright-utils": major
"@sit-onyx/storybook-utils": major
"@sit-onyx/vitepress-theme": major
"@sit-onyx/chartjs-plugin": major
"@sit-onyx/figma-utils": major
"@sit-onyx/nuxt-docs": major
"@sit-onyx/headless": major
"@sit-onyx/shared": major
"@sit-onyx/flags": major
"@sit-onyx/icons": major
"@sit-onyx/nuxt": major
---

feat(dist)!: Removed commonjs builds

- **BREAKING CHANGE:** We dropped commonjs (cjs) builds and packages are now shipped as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.
