---
"@sit-onyx/flags": major
---

feat: export all flags also as JavaScript constants

All flags are now also offered as JavaScript exports instead of only providing the raw SVG files.
This enables a better developer experience, IDE intellisense and easier import handling.
The SVG imports are still available. However, it is recommended to use the JavaScript exports for a better developer experience if possible.

When using the JavaScript exports, the flag names are prefixed with "flag", followed by the upper case flag name.
This ensures there are no naming conflicts and also makes it clearer that you are working with a flag.

Option 1: JavaScript exports (recommended)

```ts
import { flagDE, flagGB } from "@sit-onyx/flags";

// to import all flags:
// import * as ALL_FLAGS from "@sit-onyx/flags";
```

Option 2: import SVG files directly

```ts
import DE from "@sit-onyx/flags/DE.svg?raw";
import GB from "@sit-onyx/flags/GB.svg?raw";
```

#### Breaking changes

- utility functions and types are moved from `@sit-onyx/flags` to `@sit-onyx/flags/utils` so the root path only includes flags
- removed import `@sit-onyx/flags/metadata.json`, use `import { FLAG_METADATA } from "@sit-onyx/flags/utils";` instead
