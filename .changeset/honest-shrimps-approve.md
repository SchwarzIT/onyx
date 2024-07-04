---
"sit-onyx": patch
---

fix(typings): incorrect or outdated type definitions

- The `vite-plugin-dts` was removed and instead we use `vue-tsc` for the generation of the type definitions.
- The plugin used an outdated version of the [`@vue/language-core`](https://www.npmjs.com/package/%40vue%2Flanguage-core) package
