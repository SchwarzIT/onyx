# Nuxt 3 Template

Build upon the official [Nuxt 3 starter application](https://nuxt.com/docs/getting-started/introduction).

Additional features:

- [nuxt i18n](https://nuxt.com/modules/i18n)
- [eslint](https://nuxt.com/modules/eslint) and [prettier](https://prettier.io/) setup (also runs pre-commit)

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

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
