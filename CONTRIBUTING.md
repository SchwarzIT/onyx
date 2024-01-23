# onyx Contributing Guide

When contributing to onyx, please respect the [Schwarz IT Code of Conduct](https://github.com/SchwarzIT/.github/blob/main/CODE_OF_CONDUCT.md).

## Prerequisites / Technical setup

- Use Node.js with version as defined in the [`.node-version`](.node-version) file. We recommend using [fnm](https://github.com/Schniz/fnm) for managing your node versions
- Use pnpm with version as defined in the `packageManager` field of the [`package.json`](package.json)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default. In VSCode, make sure to enable Volar's [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) the first time you work with this repository by following the below steps:

1. Disable the built-in TypeScript Extension

   1. Open the extensions tab and search for `@builtin typescript`
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`

2. Restart VSCode.

<br />

## Creating a Pull Request

Pull Requests are very welcome!
Please consider our [Technical Guidelines](https://github.com/SchwarzIT/onyx/wiki/Technical-Vision-&-Guidelines) when contributing to onyx.

1. You will need to [create a fork](https://github.com/SchwarzIT/onyx/fork) to commit and push your changes to.
2. When your changes affect the user, you need to [add a changeset](./.changeset/README.md).
3. Then [create a PR](https://github.com/SchwarzIT/onyx/compare) to merge your changes back into our repository.

When your PR gets accepted, you can expect an alpha release immediately after it is merged. Production releases are planned to be published every 2 weeks after the release of 1.0.0.

## Scripts

### Monorepo root

The following scripts are available inside the monorepo root:

#### Install dependencies

```sh
pnpm install
```

#### Lint with [ESLint](https://eslint.org)

```sh
pnpm run lint:fix:all
```

#### Format with [Prettier](https://prettier.io)

```sh
pnpm run format:all
```

<br />

### onyx

The following scripts are available inside [`packages/sit-onyx`](packages/sit-onyx):

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
pnpm run test
# Runs unit tests with coverage
pnpm run test:coverage
```

#### Run component tests with [Playwright](https://playwright.dev)

```sh
# Runs the component tests
pnpm run test:components
# Runs the tests only on Chromium
pnpm run test:components --project=chromium
# Runs the tests of a specific file
pnpm run test:components tests/example.ct.ts
# Runs the tests in debug mode
pnpm run test:components --debug
```

_Info: Screenshot tests will only be performed in our Workflows to ensure consistency of the resulting images which vary on different operating systems. You can use [this Workflow](https://github.com/SchwarzIT/onyx/actions/workflows/playwright-screenshots.yml) to update the screenshots._

<br />

### Documentation

The following scripts are available inside [`apps/docs`](apps/docs):

#### Build

```sh
pnpm run build
```

#### Run in dev mode

```sh
pnpm run dev
```

#### Preview (prod mode)

The build command needs to be run first.

```sh
pnpm run preview
```
