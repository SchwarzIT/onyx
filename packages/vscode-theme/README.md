# Onyx — VSCode Theme

Dark and light VSCode themes derived from the [sit-onyx](https://onyx.schwarz) design tokens.

Colors are resolved from [`packages/sit-onyx/src/styles/variables/themes/onyx.css`](../sit-onyx/src/styles/variables/themes/onyx.css) (semantic tokens) and [`value.css`](../sit-onyx/src/styles/variables/themes/value.css) (concrete palette):

- **Onyx Dark** — `--onyx-color-neutral-steel-1100` (`#081723`) background, cyan/teal accents from the `--onyx-color-onyx-*` scale.
- **Onyx Light** — `--onyx-color-neutral-grayscale-white` (`#ffffff`) background, matching teal accents.

## Install locally

From the repo root:

```sh
# Package it (requires @vscode/vsce)
npx @vscode/vsce package --no-dependencies --out onyx.vsix

# Install into your VSCode
code --install-extension onyx.vsix
```

Then pick a theme via **Preferences → Theme → Color Theme** → `Onyx Dark` or `Onyx Light`.

## Develop

Open this folder in VSCode and press `F5` to launch an Extension Development Host with the theme loaded, then switch to `Onyx Dark` / `Onyx Light`.

## Files

- [package.json](package.json) — extension manifest and theme contributions.
- [themes/onyx-dark-color-theme.json](themes/onyx-dark-color-theme.json)
- [themes/onyx-light-color-theme.json](themes/onyx-light-color-theme.json)
