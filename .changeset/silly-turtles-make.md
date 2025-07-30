---
"@sit-onyx/icons": major
---

feat: export all icons also as JavaScript constants

All icons are now also offered as JavaScript exports instead of only providing the raw SVG files.
This enables a better developer experience, IDE intellisense and easier import handling.
The SVG imports are still available. However, it is recommended to use the JavaScript exports for a better developer experience if possible.

When using the JavaScript exports, the icon names are prefixed with "icon", followed by the pascal case icon name.
This ensures there are no conflicts with native JavaScript keywords and also makes it clearer that you are working with an icon.

Option 1: JavaScript exports (recommended)

```ts
import { iconFileArchive, iconFileCsv, iconFilePdf } from "@sit-onyx/icons";

// to import all icons:
// import * as ALL_ICONS from "@sit-onyx/icons";
```

Option 2: import SVG files directly

```ts
import fileArchive from "@sit-onyx/icons/file-archive.svg?raw";
import fileCsv from "@sit-onyx/icons/file-csv.svg?raw";
import filePdf from "@sit-onyx/icons/file-pdf.svg?raw";
```

#### Breaking changes

- utility functions and types are moved from `@sit-onyx/icons` to `@sit-onyx/icons/utils` so the root path only includes icons
- removed import `@sit-onyx/icons/metadata.json`, use `import { ICON_METADATA } from "@sit-onyx/icons/utils";` instead
