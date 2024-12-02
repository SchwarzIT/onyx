---
"@sit-onyx/storybook-utils": major
---

fix(createPreview): revert unintentional breaking change

We unintentionally introduced a breaking change in version `@sit-onyx/storybook-utils@1.0.0.beta.71` that forced you to pass a required first parameter with brand details when calling `createPreview()`.

This was reverted now. The brand details are optional and can be passed as second parameter to `createPreview`.
