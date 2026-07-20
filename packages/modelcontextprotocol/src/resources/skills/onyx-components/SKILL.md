---
name: onyx-components
description: Best practices and dynamic API lookup instructions for Onyx UI components. Use when implementing UI features, forms, or building Vue templates.
license: Apache-2.0
---

# Onyx Components

Implement and configure Onyx Vue 3 UI components using authoritative API definitions.

## Rule: Mandatory Dynamic API Lookups (MCP)

Onyx component APIs are dynamic and change across versions. **NEVER guess or assume props, events, or slots.**

### Action Components (Buttons & Links)

- **Props-based Links:** Components like `OnyxButton`, `OnyxIconButton`, `OnyxSystemButton`, `OnyxMenuItem`, and `OnyxNavItem` support a `link` prop. Do not wrap these components in raw `<a>` tags; pass the URL to the `link` prop.
- **Headless Links:** Use the `useLink` composable (`const { navigate, isActive } = useLink()`) or `OnyxRouterLink` for custom unstyled navigation components.

### Form Elements

- **Labels & Messages:** Always configure standard `Message` and `LabelPositions` properties consistently.
- **Loading State:** Implement built-in `Skeleton` loading states when loading form data.
- **Accessibility:** Use proper labels and fieldsets for complex multi-input forms (`date-picker`, `radio-group`, `checkbox-group`).

### Cards & Layout Structure

- Nest and structure basic components (`Accordion`, `Cards`, `Badge`, `Tag`) inside the Onyx grid layout (see `onyx-foundation`) to prevent layout breaking.

### Data presentation

- **Tabular data:** Always prefer the use of the `OnyxDataGrid` over the `OnyxTable` component.

---

## Validation & Quality Check

After writing or updating components, you **MUST** run the following verification steps:

1. **Type Check:** Run TypeScript verification (e.g., `npx vue-tsc --noEmit` or `npm run type-check`) to confirm no invalid props or event bindings exist.
2. **Linter Check:** Run standard project linters (e.g., `npm run lint` or `eslint .`) to confirm code style and rules are respected.
3. **Manual Verification:** Confirm all slots and custom events mapped conform to the authoritative API fetched from the MCP.
