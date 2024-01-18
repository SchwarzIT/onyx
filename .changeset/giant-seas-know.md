---
"@sit-onyx/figma-utils": minor
---

feat: sort variables when parsing

**old**:

```json
{
  "variable-200": "42rem",
  "variable-1000": "42rem",
  "variable-100": "42rem"
}
```

**new**:

```json
{
  "variable-100": "42rem",
  "variable-200": "42rem",
  "variable-1000": "42rem"
}
```
