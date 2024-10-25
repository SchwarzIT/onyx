---
"@sit-onyx/vitepress-theme": patch
"sit-onyx": patch
---

fix(sass): remove usage of globals

Sass [deprecated the usage of built-in global functions](https://sass-lang.com/documentation/breaking-changes/import/) like `map-get` which might lead to build errors e.g. when using [onyx breakpoint utilities](https://onyx.schwarz/development/breakpoints.html). We removed their usages in favor of importing the corresponding module.
