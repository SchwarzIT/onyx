# @sit-onyx/figma-utils

## 1.0.0-beta.5

### Major Changes

- dfe66db: bump minimum required Node version to 20

## 1.0.0-beta.4

### Major Changes

- 33700f9: refactor(icon-import): change alias separator to comma

  To use the previous behavior, change the alias separator to `|`:

  - if using CLI: add flag `-s "|"`
  - if using function: `parseComponentsToIcons({ aliasSeparator: "|" })`

## 1.0.0-beta.3

### Patch Changes

- 188c94d: fix(icons): prevent empty string aliases

## 1.0.0-beta.2

### Minor Changes

- b525ca5: feat: add `import-icons` CLI command

  Add new command to import SVG icons from Figma.
  For further information, see [our docs](https://onyx.schwarz/development/packages/figma-utils.html#import-icons)

## 1.0.0-beta.1

### Patch Changes

- 258c3ec: fix: parse 0 as 0rem

  Usually in CSS, zero can be used without a unit. However, this breaks styles when using together with `calc()`, e.g. `calc(var(--my-zero-variable) + 1rem)`.
  Therefore, zero will now also be parsed as `0rem`.

## 1.0.0-beta.0

### Major Changes

- bf3ea0a: release beta version

  🎉 onyx is now beta! There are no breaking changes to the last `1.0.0.-alpha.*` version

## 1.0.0-alpha.5

### Major Changes

- 48b24d2: refactor(CLI): remove default value for `--filename` / `-n` CLI flag

  If you want to keep the previous behavior, add a `--filename variables-` flag

## 1.0.0-alpha.4

### Patch Changes

- a190f80: fix: prevent type error when importing as library

## 1.0.0-alpha.3

### Major Changes

- d1fe8e3: feat: support {mode} placeholder for CSS selector

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

## 1.0.0-alpha.2

### Minor Changes

- a63446f: feat: sort variables when parsing

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

## 1.0.0-alpha.1

### Minor Changes

- abaefa6: feat: support JSON format
- abaefa6: feat: support multiple formats

## 1.0.0-alpha.0

### Major Changes

- 0211e6e: fix(scss): remove `:root` selector

  When importing Figma variables with format `SCSS`, the resulting `.scss` file will put the variables
  directly in the root of the file instead of nesting them inside a `:root` selector.

  The reason for this is that the variables must be importable / usable into other `.scss` files but nesting
  them inside a selector will make them unusable.

  **old:**

  ```scss
  // variables.scss
  :root {
    $some-variable: 42;
  }
  ```

  **new:**

  ```scss
  // variables.scss
  $some-variable: 42;
  ```

### Minor Changes

- 0211e6e: feat(css): add CLI option `selector`

### Patch Changes

- eebf509: fix(parse): remove mode name if its the default Figma mode name "Mode 1"
