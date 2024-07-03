<div style="text-align: center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/SchwarzIT/onyx/main/.github/onyx-logo-light.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/SchwarzIT/onyx/main/.github/onyx-logo-dark.svg">
    <img alt="onyx logo" src="https://raw.githubusercontent.com/SchwarzIT/onyx/main/.github/onyx-logo-dark.svg" width="160px">
  </picture>
</div>

<br>

# onyx icons

SVG icons for the onyx design system created by [Schwarz IT](https://it.schwarz).

## Contribute new icons

If you want to contribute a new icon, please follow the steps below:

1. place the SVG file inside the [`src/assets`](./src/assets/) folder.
2. run the script `pnpm optimize` to optimize the SVG content
3. Add an entry inside [`src/metadata.ts`](./src/metadata.ts) to specify the icon category and other metadata
