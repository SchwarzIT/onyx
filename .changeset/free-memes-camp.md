---
"sit-onyx": patch
---

fix: ensure all component CSS is inside onyx CSS layers

onyx components apply all their styles inside [CSS layers](https://onyx.schwarz/principles/contributing/styling.html#css-layers) so you can easily override them without needing to care about selector specificity. Some components did not define all their styles in a CSS layer which is fixed with this version.
