---
name: onyx-foundation
description: Styling foundations, CSS variables, layout grid, breakpoints, and responsive mixins for Onyx. Use when writing custom CSS, designing layouts, or ensuring theme compliance.
license: Apache-2.0
---

# Onyx Foundation & Theming

Apply Onyx styling foundations, CSS variables, responsive grid, and layout rules.

## Theming & Colors

Onyx supports light and dark themes out-of-the-box. Theme switching is handled automatically.

### Rule: CSS Variables Only

**NEVER hardcode hex, rgb, or hsl color values.** Always use semantic Onyx CSS variables (prefixed with `--onyx-`).

- **Base backgrounds:** `var(--onyx-color-base-background-tinted)`, `var(--onyx-color-base-background-blank)`
- **Primary brand:** `var(--onyx-color-base-primary-500)`, `var(--onyx-color-base-primary-100)`
- **Text & icons:** `var(--onyx-color-text-icons-primary-soft)`, `var(--onyx-color-text-icons-primary-medium)`, `var(--onyx-color-text-icons-primary-intense)`
- **Component states:** `var(--onyx-color-component-cta-default)`, `var(--onyx-color-component-border-primary)`, `var(--onyx-color-component-focus-primary)`

_Note: Access ONLY Semantic variables. Do NOT use global or component variables directly in applications._

## Density

Density levels control the vertical white space and heights (base heights: Compact = 32px, Default = 40px, Cozy = 48px).
Apply density via properties on supported components or by adding these CSS classes to any element:

- `.onyx-density-compact`
- `.onyx-density-default`
- `.onyx-density-cozy`

## Breakpoints

The design system defines six standard breakpoints:

- `2xs`: `320px` to `576px` (Max 4 columns)
- `xs`: `577px` to `768px` (Max 8 columns)
- `sm`: `769px` to `992px` (Max 8 columns)
- `md`: `993px` to `1440px` (Max 12 columns)
- `lg`: `1441px` to `1920px` (Max 12 or 16 columns)
- `xl`: `1921px` and beyond (Max 12, 16, or 20 columns)

### Responsive SCSS Mixins

Import `"sit-onyx/breakpoints.scss"` to apply media or container queries:

```scss
@use "sit-onyx/breakpoints.scss";

// Media queries (compares against whole screen width)
.my-screen-class {
  @include breakpoints.screen(max, sm) {
    /* styles for sm and smaller */
  }
  @include breakpoints.screen(min, md) {
    /* styles for md and larger */
  }
}

// Container queries (compares against nearest container width)
// MUST set container-type on the parent element
.my-container-class {
  container-type: inline-size;

  @include breakpoints.container(max, md) {
    /* styles for md container and smaller */
  }
  @include breakpoints.container(min, lg) {
    /* styles for lg container and larger */
  }
}
```

## Grid System

Onyx uses container-query-based grids. The nearest parent component with `container-type: inline-size;` (automatically set by `OnyxPageLayout`, `OnyxAppLayout`, `OnyxSidebar`) determines the active grid width.

### Grid Classes

- **Container:** `.onyx-grid` (Defines a grid container)
- **Spanning Columns:** `.onyx-grid-span-<number>` (Define exact span from 1 to 12)
- **Full Width:** `.onyx-grid-span-full` (Span all available columns)
- **Breakpoint-Specific Span:** `.onyx-grid-<breakpoint>-span-<number>` (Define column span for a specific breakpoint **and larger**)

### Grid Margin

Apply `.onyx-grid-layout` manually to wrap page contents and add outer page margins if not using `OnyxPageLayout`.

```vue
<template>
  <div class="onyx-grid">
    <!-- Spans 4 cols on smaller screens, 6 on md and larger -->
    <OnyxCard class="onyx-grid-span-4 onyx-grid-md-span-6">Content</OnyxCard>

    <!-- Spans full width always -->
    <OnyxCard class="onyx-grid-span-full">Footer / Hero</OnyxCard>
  </div>
</template>
```

### Grid Customization

Set these CSS classes on the root element of your application (e.g. `OnyxAppLayout`):

- **Limit Max Width:** `onyx-grid-max-md` (max 1440px) or `onyx-grid-max-lg` (max 1920px)
- **Alignment:** `onyx-grid-center` (Centers the layout when screen size exceeds max width)
- **Max Columns (lg and beyond):** `onyx-grid-lg-16` (16 columns) or `onyx-grid-xl-20` (20 columns)

## Page Layout (`OnyxPageLayout`)

Implement the `OnyxPageLayout` component as the root element on every individual page/view to ensure standardized paddings, page-level scroll behavior, and unified outer page margins.

```vue
<template>
  <OnyxPageLayout>
    <OnyxHeadline is="h1">Page Title</OnyxHeadline>
  </OnyxPageLayout>
</template>
```

For recurring page elements (like sidebars, footers, or sub-navigation), wrap the `OnyxPageLayout` in a reusable component or a Nuxt layout.

## Layout Principles & Page Anatomy

All custom layout constructions must align with the core Onyx layout guidelines:

### Core Principles

- **Responsive:** Layouts must fluidly adapt to maintain usability and visual hierarchy across all device sizes.
- **Content-Driven:** Prioritize structural layout decisions based on the content's hierarchy and user needs, not vice versa.

### The Four Page Anatomy Regions

1. **Main Navigation (`OnyxNavBar`):** Persistent top/left area independent of scroll containers, providing access to top-level views.
2. **Sidebar (`OnyxSidebar`):** Persistent left/right sidebar used for secondary navigation or master-detail detail panels.
3. **Page Content (`OnyxPageLayout`):** The flexible central area governed by the grid system and acting as the primary scroll container.
4. **Bottom Bar (`OnyxBottomBar`):** Scroll-independent sticky bar at the bottom for status confirmations or primary page-level triggers.

### Component Alignment Rule

- **STRICT Left-Alignment:** All internal component layout structures must be left-aligned to preserve scannability.
- **Exception:** Tables and data grids may utilize center/right alignment within specific columns depending on data type formats (e.g. numeric currencies).

### Visual Rhythm & Grouping

- **Spatial Grouping:** Group functionally related components together using generous empty space (white space), typography, or dividers to minimize cognitive load. Ensure balanced proportions across all section distributions.

---

## Validation & Quality Check

After writing custom layouts or styling overrides, you **MUST** run the following verification steps:

1. **CSS Variables Audit:** Scan your stylesheets for any hardcoded hex, rgb, or hsl values, or direct global/component variable usages. Replace them with proper `--onyx-` semantic variables.
2. **Layout Alignment Check:** Verify all custom component interiors are left-aligned (with the exception of specific table/data grid columns).
3. **Responsive Verification:** Verify your CSS container-query selectors are properly paired with a parent `container-type: inline-size;`. Ensure no breakpoint styles break responsive fluidity.
