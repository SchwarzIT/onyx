---
"sit-onyx": minor
---

feat(OnyxSwitch): use OnyxFormElementV2 internally. This now supports: top, left and right aligned label, `message`, `success` and `valueLabel` property

We strongly recommend to switch to a top aligned label (if you are not using a form/layout that requires left/right aligned label) to be consistent with other form elements and simplify the layout/alignment when used together in a form. To avoid a breaking change, the switch still defaults to a right aligned label but we will change this to top aligned in onyx version 2.

To already use the top label, use:

```vue
<OnyxSwitch :label="{ label: 'Example label', position: 'top' }" />
```
