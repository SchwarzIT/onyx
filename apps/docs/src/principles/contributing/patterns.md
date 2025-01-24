# Patterns

This page explains which common patterns we follow when developing onyx and how to use them.
These patterns are implemented through [**composables**](https://vuejs.org/guide/reusability/composables.html) and enforced through [**linting rules**](https://eslint.org/docs/latest/extend/custom-rules), where possible.

## Root Attribute Forwarding

For implementing necessary layout, styling and ARIA requirements, it is often necessary to wrap interactive HTML elements.
To enable the developers to be able to set custom attributes and event-listeners on these, we forward most attributes to the relevant (e.g. input or button) element.
The only attributes that are not forwarded are `style` and `class` with the assumption being, that these are only useful and intended to be set on the root element of the component.

<<< ../../../../../packages/sit-onyx/src/utils/attrs.ts#docs

::: info
Your use-case is not covered? Head over to our GitHub [discussion page](https://github.com/SchwarzIT/onyx/discussions) to make suggestions or ask questions!
:::
