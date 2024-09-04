---
"@sit-onyx/storybook-utils": major
---

- **BREAKING CHANGE**: `defineStorybookActionsAndVModels` and `defineActions` was removed: Replace by using the `withVModelDecorator` as a global decorator and the `enhanceEventArgTypes` global argTypesEnhancer.
- **BREAKING CHANGE**: `withVModelDecorator`: the event array parameter was removed: It is not necessary anymore to define the events manually.
