---
"@sit-onyx/figma-utils": patch
---

fix: parse 0 as 0rem

Usually in CSS, zero can be used without a unit. However, this breaks styles when using together with `calc()`, e.g. `calc(var(--my-zero-variable) + 1rem)`.
Therefore, zero will now also be parsed as `0rem`.
