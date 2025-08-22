---
"sit-onyx": patch
---

refactor: revert workaround for boolean casting

The issue described [here](https://github.com/SchwarzIT/onyx/issues/3958) that boolean shorthands / boolean casting is not working for some properties has been officially fixed with Vue 3.5.19.

We removed the onyx internal workarounds in this version which were originally implemented in onyx version [1.0.0-beta.301](https://onyx.schwarz/development/packages/changelogs/sit-onyx.html#_1-0-0-beta-301).

Note: You can use a Vue version <= 3.5.19 in your project. The fix will still be included because onyx itself is build with the correct >= 3.5.19 version since its a compile-time fix.
