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

## State Control

We want to give the user maximum control of component state, which is achieved by providing props with _two-way binding_ support via Vue's [`v-model`](https://vuejs.org/guide/components/v-model.html#basic-usage).
To not require the developer to declare `ref`s for state they do not care about, the state will be stored internally if left undefined by the user.

Unfortunately the Vue native [`defineModel`](https://vuejs.org/api/sfc-script-setup.html#definemodel) compiler macro behaves not as expected, as it will prefer internal state updates over external, unchanged state (e.g. `<Comp :open="true" />` will not be considered anymore after an `update:open` with value `false`).

Therefore we created a custom composable `useVModel`, which will prefer the external state:

<<< ../../../../../packages/sit-onyx/src/composables/useVModel.ts#docs
