---
"sit-onyx": patch
---

fix(OnyxFormElementV2): correctly set popover trigger

- set popover trigger correctly on the `<input />` element instead of the input wrapper
- correctly show error state when "touched" and a popover is used
- also support passing `popoverOptions.label` to correctly define a different label for the popover than for the input itself
- fix: truncate input value if its too long
- fix: prevent popover from overlapping label if opened to the top
- fix: use correct label gap when using skeleton in compact density
