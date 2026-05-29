---
"@sit-onyx/tiptap": patch
---

fix: do not bundle any Tiptap dependencies

Previously some `@tiptap/` dependencies were bundled inline into the `@sit-onyx/tiptap` package which might have caused issues when additional Tiptap dependencies are installed in the project. This fix also reduces the bundles size of `@sit-onyx/tiptap` by ~85%.
