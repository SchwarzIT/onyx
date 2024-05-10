# Nuxt 3 Template

Build upon the official [Nuxt 3 starter application](https://nuxt.com/docs/getting-started/introduction).

Additional features:

- [nuxt i18n](https://nuxt.com/modules/i18n)
- [eslint](https://nuxt.com/modules/eslint) and [prettier](https://prettier.io/) setup (also runs pre-commit)
- Testing using [Vitest](https://vitest.dev) and [Playwright](https://playwright.dev)
- [Docker](https://www.docker.com) setup
- GitHub action to check and build code in CI

## Prerequisites

- [Node.js](https://nodejs.org/en) version as specified in [.node-version](./.node-version) file
- [pnpm](https://pnpm.io/) version as specified in [`package.json`](./package.json) field `packageManager`

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

## Unit tests

Run unit tests using [Vitest](https://vitest.dev):

```bash
pnpm run test
```

## Playwright tests

Run component/integration/e2e tests using [Playwright](https://playwright.dev):

```bash
pnpm run build
pnpm run test:components
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
