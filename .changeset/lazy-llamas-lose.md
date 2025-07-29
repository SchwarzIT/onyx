---
"@sit-onyx/figma-utils": patch
---

fix(import-variables): correctly get theme name when combinesDarkLight is enabled

Previously the mode name was determined by using the part before the first "-" character which does not work correctly if the theme/mode name itself contains dashes.
