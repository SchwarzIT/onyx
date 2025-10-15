# Patterns

This page explains which common patterns we follow when developing onyx and how to use them.
These patterns are implemented through [**composables**](https://vuejs.org/guide/reusability/composables.html) and enforced through [**linting rules**](https://eslint.org/docs/latest/extend/custom-rules), where possible.

## Root Attribute Forwarding

For implementing necessary layout, styling and ARIA requirements, it is often necessary to wrap interactive HTML elements.
To enable the developers to be able to set custom attributes and event-listeners on these, we forward most attributes to the relevant (e.g. input or button) element.
The only attributes that are not forwarded are `style` and `class` with the assumption being, that these are only useful and intended to be set on the root element of the component.

<<< ../../../../../packages/sit-onyx/src/utils/attrs.ts#docs

## (Shared) Child Props Forwarding

When a parent component is a wrapper for another (support) component, the parent usually extends all or a subset of the child's properties.
The relevant child props need then to be forwarded to the child component.
This can easily be achieved by using [`v-bind`](https://vuejs.org/api/built-in-directives.html#v-bind), e.g.

```vue [ParentComponent.vue]
<script setup lang="ts">
const props = defineProps<ParentProps & ChildProps>();
</script>
<template>
  <!-- ⚠️ Don't do this -->
  <ChildComponent v-bind="props" />
</template>
```

Unfortunately this has the unwanted side-effect of all extraneous props being applied as attributes.
So when the parent defines props which do not exist on the child component, they are treated as _[fallthrough attributes](https://vuejs.org/guide/components/attrs.html#fallthrough-attributes)_.
Besides cluttering the HTML with irrelevant attributes this also can have disruptive side-effects when the prop name accidentally matches a valid html attribute (e.g. [inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert) or [hidden](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/hidden)).

Which might look like this in the DOM tree:

```html
<div class="child-component" parent-prop-1="parent-prop-value-1" parent-prop-2="[object Object]">
  <!-- ... -->
</div>
```

To avoid this, our `useForwardProps` composable can be used:

<<< ../../../../../packages/sit-onyx/src/utils/props.ts#docs

## State Control

We want to give the user maximum control of component state, which is achieved by providing props with _two-way binding_ support via Vue's [`v-model`](https://vuejs.org/guide/components/v-model.html#basic-usage).
To not require the developer to declare `ref`s for state they do not care about, the state will be stored internally if left undefined by the user.

Unfortunately the Vue native [`defineModel`](https://vuejs.org/api/sfc-script-setup.html#definemodel) compiler macro behaves not as expected, as it will prefer internal state updates over external, unchanged state (e.g. `<Comp :open="true" />` will not be considered anymore after an `update:open` with value `false`).

Therefore we created a custom composable `useVModel`, which will prefer the external state:

<<< ../../../../../packages/sit-onyx/src/composables/useVModel.ts#docs
