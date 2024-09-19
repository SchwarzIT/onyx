---
"@sit-onyx/figma-utils": major
---

refactor(icon-import): change alias separator to comma

To use the previous behavior, change the alias separator to `|`:

- if using CLI: add flag `-s "|"`
- if using function: `parseComponentsToIcons({ aliasSeparator: "|" })`
