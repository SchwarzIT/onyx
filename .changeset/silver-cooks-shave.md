---
"@sit-onyx/headless": major
---

- Replaced incorrect `HtmlHTMLAttributes` with the correct supertype `HTMLAttributes`
- implemented `createElRef`, which creates a special writeable computed that references a DOM Element and unwraps components.
  - `createElRef` returns a `HeadlessElRef`, which is a special subtype of `WritableComputedRef`. It uses a type differentiator, so no other `Ref` types can be assigned to it.
- updated `createBuilder` `HeadlessElement` typings to only accept `HeadlessElRef` for `ref` keys. So `createElRef` must be used to create these.
