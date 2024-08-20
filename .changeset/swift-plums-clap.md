---
"@sit-onyx/storybook-utils": major
---

- `defineStorybookActionsAndVModels` was deprecated: Replace by using the `withVModelDecorator` as a global decorator and the `enhanceEventArgTypes` global argTypesEnhancer.
- `withVModelDecorator` with event array arguments was deprecated: It is not necessary anymore to define the events manually.
