---
"sit-onyx": major
---

refactor(OnyxSelect):

- remove redundant `manualSearch` property in favor of inferring the managed state of searchTerm
- omit `showfocus` which is only used to control OnyxSelectInput
