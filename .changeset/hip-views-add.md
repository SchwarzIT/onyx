---
"sit-onyx": minor
---

feat: support custom label content for OnyxProgressSteps and OnyxProgressItem

- OnyxProgressSteps: add new `step` slot to provide custom label content for each step
- OnyxProgressItem: add new `default` slot to provide custom label content
- OnyxProgressItem: render white-space in label to support multiline text when passing strings
