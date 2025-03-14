---
"sit-onyx": patch
---

fix(OnyxDataGrid): improve string, number and fallback formatters

- string/fallback formatter now renders "-" if undefined/null is passed. Also arrays are separated with comma and the array values are recursively formatted (undefined/null values are filtered out). Objects are formatted with `JSON.stringify()` instead of showing "[object Object]"
- number formatter: null, true and false are not correctly formatted as fallback value "-".
