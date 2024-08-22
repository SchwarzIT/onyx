---
"@sit-onyx/storybook-utils": major
---

- `defineStorybookActionsAndVModels` and `defineActions` was removed: Replace by using the `withVModelDecorator` as a global decorator and the `enhanceEventArgTypes` global argTypesEnhancer.
- `withVModelDecorator` with event array removed was deprecated: It is not necessary anymore to define the events manually.
