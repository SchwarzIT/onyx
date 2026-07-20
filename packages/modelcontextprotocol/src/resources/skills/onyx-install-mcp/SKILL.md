---
name: onyx-install-mcp
description: Installation and setup instructions for the local onyx MCP server
license: Apache-2.0
---

# Onyx MCP Server Installation & Setup

To allow coding-agents to dynamically query component API specifications and icons, install and configure the official Onyx Model Context Protocol (MCP) server.

### 1. Global Installation

Install the package globally using your package manager:

```bash
# Using npm
npm install -g @sit-onyx/modelcontextprotocol

# Using pnpm
pnpm install -g @sit-onyx/modelcontextprotocol
```

Verify the installation is successful:

```bash
onyx-mcp -h
```

### 2. General MCP Client Configuration

Configure the server in your preferred MCP-compliant client (such as Cursor, Claude Desktop, VS Code plugins, or general command-line utilities) using these standard parameters:

- **Command:** `onyx-mcp`
- **Arguments:** `["-r"]` (Optional: Use the `--resourcesAsTools` flag if the coding-assistant is not able to to use MCP resources. This setting makes resources also available as MCP tools to support these Coding Assistants.)
- **Description:** `"Provides necessary details about working with the onyx UI component library, e.g. components and their APIs, setup instructions and best practices"`

### Step 1: Version Autodiscovery

Before querying the MCP server, you **MUST** discover the exact Onyx version used in the project:

1. Open and read the root `package.json`.
2. Find the version defined under `dependencies` or `devDependencies` for `sit-onyx`.
3. Use this parsed version number (e.g. `"1.2.3"`) as the required `version` parameter for all subsequent MCP tool calls.

### Step 2: Query the MCP Server

Use the connected `onyx-mcp` tools using your discovered version.
