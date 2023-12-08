# NUI Contributing Guide

## Prerequisites / Technical setup

- Node.js with version as defined in [`.node-version`](.node-version) file. We recommend using [fnm](https://github.com/Schniz/fnm) for managing your node versions
- pnpm with version as defined in `packageManager` field of the [`package.json`](package.json)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default. In VS Code, make sure to enable Volar's [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) the first time you work with this repository by following the below steps:

1. Disable the built-in TypeScript Extension

   1. Open the extensions tab and search for `@builtin typescript`
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`

2. Restart VS Code.

<br />

## Scripts

### Monorepo root

The following scripts are available inside the monorepo root:

#### Install dependencies

```sh
pnpm install
```

#### Lint with [ESLint](https://eslint.org)

```sh
pnpm run lint:fix
```

#### Format with [Prettier](https://prettier.io)

```sh
pnpm run format
```

<br />

### NUI

The following scripts are available inside [`packages/nui`](packages/nui):

#### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```

#### Run Storybook in dev mode

```sh
pnpm run dev
```

#### Build Storybook

```sh
pnpm run build:storybook
```

#### Preview Storybook (prod mode)

The Storybook build command needs to be run first.

```sh
pnpm run preview
```

#### Run Unit Tests with [Vitest](https://vitest.dev)

```sh
pnpm run test:unit
# Runs unit tests with coverage
pnpm run test:unit:coverage
```

#### Run component tests with [Playwright](https://playwright.dev)

```sh
# Runs the component tests
pnpm run test:components
# Runs the tests only on Chromium
pnpm run test:components --project=chromium
# Runs the tests of a specific file
pnpm run test:components tests/example.spec.ts
# Runs the tests in debug mode
pnpm run test:components --debug
```
