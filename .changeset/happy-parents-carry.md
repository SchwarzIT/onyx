---
"@sit-onyx/storybook-utils": patch
---

fix: prevent duplicated imports for generated code snippets

Previously the generated Storybook code snippets on the "Docs" page contained duplicated imports of used onyx components.
