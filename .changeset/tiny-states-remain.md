---
"sit-onyx": major
---

fix(OnyxDialog): correctly detect outside clicks

This also fixes the issue that the dialog is closed when e.g. clicking inside an OnyxSelect to select an option

**Breaking change:**

We added a new `<div class="onyx-dialog__content">` container inside the dialog. If you are applying custom styles to the dialog (padding etc.), make sure to take a look at those that they are still applied correctly. For changing the dialog padding, we recommend using the new `--onyx-dialog-padding` CSS variable.
