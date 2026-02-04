---
"@sit-onyx/playwright-utils": patch
---

fix(screenshot-matrix): support using UTF-16 characters for rows and columns

You can now use UTF-16 characters for row and column names when capturing screenshot matrix tests since they will now be escaped with `String.codePointAt()` so the resulting CSS grid layout areas have valid values in such cases.
