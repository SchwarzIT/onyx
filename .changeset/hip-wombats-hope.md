---
"sit-onyx": patch
---

fix(OnyxDatePickerV2): Synchronize hoverDate and viewMonth state for calenders in multi-view mode

- Calendars will change in unison if either of them switches the month
- When selecting a range, the hover state is synced between both
