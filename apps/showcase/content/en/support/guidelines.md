---
title: Guidelines
description: Our technical guidelines describes the goals and rules that contributors and we (the development team of onyx) must adhere to.
---

# Technical guidelines

Our technical guidelines describes the goals and rules that contributors and we (the development team of **onyx**) must adhere to.

## Global Architecture

1. 📜 **onyx**does not have direct dependencies, only a limited amount of peer- and dev-dependencies.
   - peer-dependencies: we allow a wide range of versions (e.g. `>= 3`).
   - We use third-party dependencies sparingly. The need for each dependency must be well justified and documented in this wiki.
2. 📜 We rely on browser / native features as much as possible.
3. 📜 Frequently used code is extracted into utils / composables.
4. 📜 We provide custom eslint rules for principles and best practices where needed.

## Pull Requests

1. 📜 Every PR that affects the public API of any published npm libraries must include a [changeset](https://github.com/changesets/changesets).
2. 📜 A PR must consist of one (preferable) or multiple self-contained changes.
3. 📜 An "Implement" ticket can and will usually be split up over multiple PRs, so a single PR doesn't have to include all feature facets.
   1. ❗️ These PRs should be sliced reasonably, as a set of changes that belong together.
   2. This enables us to do faster Code Reviews.

## Documentation

1. 📜 Everything we publish (features, packages, ...) must be documented
2. 📜 The documentation explains everything the users need to know and do not expect implicit knowledge. E.g. all variants that a component offers are showcased and explained when they are used
3. 📜 We have a well written changelog which includes all relevant information on the usage of the changes

## Usability

1. 📜 The DX _(Developer Experience)_ of our users is our top priority
2. 📜 We offer excellent typing support
3. 📜 We only support modern technologies [(ES202x)](https://tc39.es/ecma262/)/ESM
4. 📜 **onyx**components must work in the three big browser (engines): Chromium, Firefox and Safari
   - Support is limited to versions up to one year old
5. 📜 We only use Web APIs that match our [browserlist](/development/#browser-support)

## Component Interface

1. 📜 Component variants that differ in regards to their [aria pattern](https://www.w3.org/WAI/ARIA/apg/patterns) are separate components
2. 📜 When Prop/Attr names of the (wrapped) native element are being used for component properties,
   - they must mirror or extend the expected behavior of the native attribute
   - they may limit the natives attribute accepted values (e.g. `type` property of the input could be limited to only support type `text` and `password`)
3. 📜 [Fallthrough attributes](https://vuejs.org/guide/components/attrs.html) should be passed to the relevant (interactive) native element of the component. (See [Root Attribute Forwarding documentation](/principles/contributing/patterns.html#root-attribute-forwarding))
   - we use the `useRootAttrs` composable
4. 📜 All boolean properties default to `false` (falsy)
5. 📜 We prevent complex conditions due to big union modelValue types.
   - We either offer specialized components (e.g. separating a number input from a text input)
   - Alternatively, we can make use of [generic components](https://vuejs.org/api/sfc-script-setup.html#generics)
6. 📜 We provide translations for standard texts inside components, e.g. "OK", "Cancel" etc. and allow to override them.
   - Community contributions to our translations are most welcome!
7. 📜 We support common navigation patterns, e.g. keyboard shortcuts
8. 📜 We strife to keep the parity between Figma and the implementation as high as possible.
   - We use a shared domain language between UX and DEV.
9. 📜 All components can be used standalone in a project without affecting styles of the whole application (so they can be used together with other component libraries). Therefore, we provide two CSS files:
   - Component styles: Required. Defines the styles of the components, no side effects on globals.
   - Global styles: Optional. Applies global styles to the whole application (e.g. color / background color on `body`, `<a>` etc.)

### Naming conventions

1. 📜 All (public) components are prefixed with `Onyx`, e.g. `OnyxButton`
2. 📜 We use [v-model](https://vuejs.org/guide/components/v-model.html) for two-way-data-binding wherever possible
3. 📜 Component variants are named after what they are, not where they are used (e.g. a link variant "fullWidth" instead of "sideBar")
4. 📜 All CSS class names are prefixed with `onyx-`
5. 📜 All CSS variables are prefixed with `--onyx-`

## Component Implementation

1. 📜 We don't clone DOM nodes. Instead, we can place slots in different places depending on the breakpoint
2. 📜 We only use as much JavaScript as necessary (e.g. prefer CSS solutions over JavaScript)
3. 📜 Property types are declared and exported as standalone type and referenced in the `defineProps`
   - the property type can still be declared (and exported) inside the component file to which it belongs
4. 📜 We always use the notation `props.foo` instead of accessing `foo` directly in the `<template>` section
5. 📜 We structure the component code in the following manner:
   1. types
   2. props
   3. emits
   4. slots
   5. _... everything else grouped by responsibility_
   6. defineExpose

### A11y (Accessibility)

1. 📜 We use [semantic HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
2. 📜 We keep the DOM tree as flat as possible
3. 📜 We follow [A11y best practices](https://www.w3.org/WAI/fundamentals/accessibility-principles/) (level AA)
4. 📜 We define aria relevant properties as **required**
   - e.g. the `alt` property of the `OnyxImage` component is required

### Typescript

1. 📜 We use `type`s instead of `interface`s
2. 📜 We **don't** use [typescript enums](https://www.typescriptlang.org/docs/handbook/enums.html)
3. 📜 We use strict undefined/null checks when implementing the **onyx** ecosystem

### CSS

1. 📜 Instead of using `scoped`/`module` for `<style>`, we rely on meaningful class structures
   - we use [BEM](https://getbem.com/naming/) to provide semantic and structured class names
   - all styles related to a component are bundled inside one component class,
     e.g. the component `OnyxInput` has one class `onyx-input` which groups all styles of that component
2. 📜 We don't use `!important`
3. 📜 We define only as little style as needed
   - Instead of copying Figma styles, we evaluate what is needed
4. 📜 Component styles are limited to the component internals
   - We don't set opinionated margins on the components that define how they are spaced in the page layout.
5. 📜 We avoid writing styles on a parent component that are applied to children that are placed in a slot
   - _Exception: When the alternative would over-complicate the interface, e.g. by requiring extra properties_
6. 📜 We prefer styles that don't rely on `:not()`
7. 📜 We use [`rem`](https://developer.mozilla.org/en-US/docs/Web/CSS/length#rem) for **everything**. This includes borders, font-sizes etc.

### Testing

1. 📜 Each (public) component is covered by at least 1 screenshot test (via Playwright)
2. 📜 All defined component behavior is covered by a playwright test (`.ct.tsx` file)
3. 📜 Utils and composables are covered by Vitest tests (`.spec.ts` file)
4. 📜 We structure our tests by using the [arrange-act-assert pattern](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/):br
   ```ts
   // ARRANGE
   // ACT
   // ASSERT
   ```
