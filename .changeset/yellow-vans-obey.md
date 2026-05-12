---
"sit-onyx": minor
---

feat(OnyxInput): Added support for custom error messages in OnyxInput pattern validation. The pattern prop now accepts an object structure { value: string | RegExp; errorMessage: string }, allowing developers to display a specific error message when the input value does not match the provided pattern.
