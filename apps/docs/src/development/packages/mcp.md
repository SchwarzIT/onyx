---
outline: [2, 3]
---

# @sit-onyx/modelcontextprotocol

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/@sit-onyx%2Fmodelcontextprotocol.svg)](https://www.npmjs.com/package/@sit-onyx/modelcontextprotocol)

</div>

This is the official onyx Model Context Protocol (or "MCP" for short) server.

## Changelog

A full changelog can be found [here](/development/packages/changelogs/modelcontextprotocol).

## Prerequisites

- [Node.js](https://nodejs.org/en) version as specified in [.node-version](https://github.com/SchwarzIT/onyx/blob/main/.node-version) file

## Getting started

Install the CLI globally:

:::code-group

```shell [pnpm]
pnpm install -g [@sit-onyx](https://github.com/sit-onyx)/modelcontextprotocol
```

```shell [npm]
npm install -g [@sit-onyx](https://github.com/sit-onyx)/modelcontextprotocol
```

:::

Now you can run the `onyx-mcp` command:

```shell
onyx-mcp -h
```

### Using with the Gemini CLI

Add this entry to your Gemini settings (in `~/.gemini/settings.json`):

```json
{
  "$schema": "https://raw.githubusercontent.com/google-gemini/gemini-cli/main/schemas/settings.schema.json",
  "mcp": {
    "allowed": ["onyx-mcp"]
  },
  "mcpServers": {
    "onyx-mcp": {
      "description": "Information about components of the onyx UI component library",
      "command": "onyx-mcp",
      "args": ["-r"]
    }
  }
}
```

Save the file and confirm that the MCP has been set up correctly:

```shell
gemini mcp list
```

## Development

Run this command in the monorepo root:

```shell
pnpm run dev modelcontextprotocol
```

This starts the "build" watcher and the [`@modelcontextprotocol/inspector`](https://github.com/modelcontextprotocol/inspector) locally.

You must reload the inspector browser website after changes to the `@sit-onyx/modelcontextprotocol` source code.
**Using the "Reconnect" button does not suffice!**
