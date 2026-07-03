---
name: onyx-components
description: Best practices and dynamic API lookup instructions for Onyx UI components. Use when implementing UI features, forms, or building Vue templates.
license: Apache-2.0
---

# Onyx Components

Implement and configure Onyx Vue 3 UI components using authoritative API definitions.

## Rule: Mandatory Dynamic API Lookups (MCP)

Onyx component APIs are dynamic and change across versions. **NEVER guess or assume props, events, or slots.**

## Onyx MCP Server Installation & Setup

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
- **Arguments:** `["-r"]` (Optional: Use the recursive flag depending on environment)
- **Description:** `"Information about components of the onyx UI component library"`

### Step 1: Version Autodiscovery

Before querying the MCP server, you **MUST** discover the exact Onyx version used in the project:

1. Open and parse the root `package.json`.
2. Find the version defined under `dependencies` or `devDependencies` for `sit-onyx`.
3. Use this parsed version number (e.g. `"1.2.3"`) as the required `version` parameter for all subsequent MCP tool calls.

### Step 2: Query the MCP Server

Use the connected `onyx-mcp` tools using your discovered version:

- `mcp_onyx-mcp_list-components`: Discover the exact names of available components in this version.
- `mcp_onyx-mcp_get-component-api`: Retrieve authoritative props, events, and slots for a specific component before writing code.
- `mcp_onyx-mcp_list-icons`: Retrieve available icon names when implementing components with icon properties.

---

## Component Implementation Rules

### Action Components (Buttons & Links)

- **Props-based Links:** Components like `OnyxButton`, `OnyxIconButton`, `OnyxSystemButton`, `OnyxMenuItem`, and `OnyxNavItem` support a `link` prop. Do not wrap these components in raw `<a>` tags; pass the URL to the `link` prop.
- **Headless Links:** Use the `useLink` composable (`const { navigate, isActive } = useLink()`) or `OnyxRouterLink` for custom unstyled navigation components.

### Form Elements

- **Labels & Messages:** Always configure standard `Message` and `LabelPositions` properties consistently.
- **Loading State:** Implement built-in `Skeleton` loading states when loading form data.
- **Accessibility:** Use proper labels and fieldsets for complex multi-input forms (`date-picker`, `radio-group`, `checkbox-group`).

### Cards & Layout Structure

- Nest and structure basic components (`Accordion`, `Cards`, `Badge`, `Tag`) inside the Onyx grid layout (see `onyx-foundation`) to prevent layout breaking.

---

## Validation & Quality Check

After writing or updating components, you **MUST** run the following verification steps:

1. **Type Check:** Run TypeScript verification (e.g., `npx vue-tsc --noEmit` or `npm run type-check`) to confirm no invalid props or event bindings exist.
2. **Linter Check:** Run standard project linters (e.g., `npm run lint` or `eslint .`) to confirm code style and rules are respected.
3. **Manual Verification:** Confirm all slots and custom events mapped conform to the authoritative API fetched from the MCP.
