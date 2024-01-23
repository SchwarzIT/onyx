---
"@sit-onyx/figma-utils": major
---

feat: support {mode} placeholder for CSS selector

Previously the mode name was automatically appended to the selector if the selector was
something other than `:root`. This is no longer the case.
Instead use the more explicit/flexible placeholder `{mode}` for this.

**Old**

```sh
npx @sit-onyx/figma-utils import-variables -k "your-file-key" -t "your-token" -m dark -s html
# resulted in selector "html.dark"
```

**New**

```sh
npx @sit-onyx/figma-utils import-variables -k "your-file-key" -t "your-token" -m dark -s html.{mode}
# results in selector "html.dark"
```
