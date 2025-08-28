# onyx demo app

This is a demonstration application that can be used to showcase onyx features.

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
# run this command in the monorepo root, not in the demo app folder
pnpm run dev demo-app
```

## Production

Build the application for production:

```bash
# run this command in the monorepo root, not in the demo app folder
pnpm run build:all --filter demo-app
```

Locally preview production build:

```bash
pnpm run preview
```
