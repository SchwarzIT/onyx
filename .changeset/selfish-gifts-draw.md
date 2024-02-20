---
"sit-onyx": major
---

refactor(OnyxCheckbox): make `label` property required

Even if the label is visually hidden, it must be provided for accessibility reasons / screen readers.
If you used a checkbox without a label previously, add a descriptive label and use the new `hideLabel`
visually hide the label.
