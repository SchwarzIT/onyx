---
"sit-onyx": major
---

feat(dist)!: add dedicated entrypoint for bundlers

- **BREAKING CHANGE:** We dropped commonjs (cjs) support and ship `sit-onyx` now as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.
- We now publish two entrypoints for `sit-onyx`, if you are using a bundler like `vite` you don't need to change anything:
  1. `./dist/index.esm-bundler.js`: _(Default)_ Non-minified build intended to be used with an bundler. Comes with source-maps and additional logging for an improved developer experience.
  2. `./dist/index.js`: Already bundled, minified and optimized production build.
