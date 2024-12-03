---
"sit-onyx": major
---

feat(OnyxMoreList): support more indicator

Also changed the underlying logic to calculate the component visibility which is now based on component widths instead of using IntersectionObservers.

- OnyxMoreList: removed `disabled` property
- useMoreList: removed `disabled` and `componentRefs` option, added required `listRef` and `moreIndicatorRef` option
- OnyxNavButton: prevent warning for missing injection key
