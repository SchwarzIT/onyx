# @sit-onyx/modelcontextprotocol

## 0.4.0

### Minor Changes

- 666498e: feat: Add '--exclude' flag for disabling specific resources

### Patch Changes

- 666498e: fix(sit-onyx://skill/\*): Refined and improved existing skills

## 0.3.0

### Minor Changes

- 077680e: feat: Add `onyx-install-mcp` skill

### Patch Changes

- 077680e: fix(list-components): Ignore and don't list pre-release versions anymore
- 077680e: fix(get-component-api): Add hint when no `events`, `slots`, `props` or `exposed` are defined

## 0.2.0

### Minor Changes

- ef69ed2: feat: Implement support for providing and writing skills via onyx-mcp CLI
- ef69ed2: feat: Implement `list-css-design-tokens` resource

### Patch Changes

- ff6379e: fix: http transport (server) only accepting the very first connection

## 0.1.0

### Minor Changes

- 947ef1d: feat: Initial setup and implementation

Can be run as a http or stdio server using the CLI.

Currently provides the following:

- Resources:
  - `get-component-api`: Lists all components for a specific version of `sit-onyx`
  - `list-component`: Gets the component and description API for a specific component and version of `sit-onyx`
  - `list-icons`: Lists all icons available in a specific version of `@sit-onyx/icons`

To learn more about installation and usage, see [https://www.npmjs.com/package/@sit-onyx/modelcontextprotocol](https://www.npmjs.com/package/@sit-onyx/modelcontextprotocol).
For more details regarding MCPs see [https://modelcontextprotocol.io/docs/learn/architecture](https://modelcontextprotocol.io/docs/learn/architecture).
