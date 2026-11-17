---
"sit-onyx": patch
---

fix: apply several visual adjustments

- fix the skeleton border radius in several components to match the one of the regular component
- OnyxPagination and OnyxSplitButton: fix border radius to use the correct component variable so they look correctly in different themes
- OnyxNavItem: correctly truncate mobile nav item if label is too long
- OnyxSelectDialog and mobile nav item: update active border color
- OnyxBreadcrumbItem: update font weight for active state to semibold
- OnyxTag: fix skeleton height to match the regular component height
- OnyxFilterTag: fix component height to match the regular OnyxTag
- OnyxCalendar: fix text color for "Today" date when disabled
