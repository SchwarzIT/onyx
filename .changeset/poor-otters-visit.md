---
"sit-onyx": minor
---

feat(OnyxCheckbox, OnyxSwitch, OnyxRadioButton): show error messages in the title when invalid

For components that don't support an error message footer, we now set the `title` to show the error message info in the default browser tooltip.

- Supports custom errors as well as default errors, e.g. `required`.
- Combines the error message with a hidden label in the `title`.
