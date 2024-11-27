# Storybook

For development and API documentation we make use of [Storybook](https://storybook.js.org/).

A **Story** is a specific scenario or state of a component that showcases its functionality, appearance, or behavior. It helps developers and designers visualize and test different variations of a component in isolation.

All stories for a single component are kept in a neighboring `<component>.stories.ts` file.

::: info
The next sections describe the content of a `*.stories.ts` file in more detail.
Feel free to [skip to the end](#tl-dr) to see the complete example and a _TL;DR_.
:::

## Meta section

First off we have the [`Meta`](https://storybook.js.org/docs/writing-stories/typescript#typing-stories-with-meta-and-storyobj) object.
Here the component is described and documented.
Using tsdoc, a general description is added above the `meta` constant.

- The `title` attribute defines where in the storybook the component is placed and what its title is. Categories and the title are separated by slashes ("`/`").
- `component` sets the Component that will be used for all Stories in this file. The documentation for all properties will be extracted from its types and their [tsdoc](https://tsdoc.org/) block.
- With the [`argTypes`](https://storybook.js.org/docs/api/arg-types#manually-specifying-argtypes) attribute the components property documentation can be extended and overwritten.
  Usually this is not necessary as Storybook infers the properties, their types and description from the component types.
  However as shown in the example below, it can be useful to overwrite Storybooks input element using the `control` property.
- To highlight useful native DOM events, the `withNativeEventLogging` utility can be used. It enables logging and documentation for the defined DOM events.

Make sure to export `meta` as default so Storybook can find the Story.

<<< ./stories-example.ts#meta

## Actual Stories

Every non-default export represents a `Story`, where the export name is also the name of the story.
The first story is usually called `Default`.

- The description of the story object is done via [tsdoc](https://tsdoc.org/).
- We use `StoryObj<typeof OnyxComponent>` to enable typed code completion.
- A story must define `args` which represents the props that are passed to component.

To add further stories, add more named exports.
Consider reusing the `Default` stories args.

<<< ./stories-example.ts#story

## Slots

Storybook treats Slots like props, therefore they are also configured via the `args`.
A slot and its content are defined using [Render Functions](https://vuejs.org/guide/extras/render-function.html).
A Render Functions must return a [VNode](https://vuejs.org/api/render-function.html#h) or an array of VNodes.

<<< ./stories-example.ts#slot

## TL;DR

::: tip TL;DR

- Descriptions and types are extracted by Storybook from the components types and [tsdoc](https://tsdoc.org/)
- Meta details are configured via a default export with type `Meta<typeof OnyxComponent>`
- Stories are defined as Named Exports with type `StoryObj<typeof OnyxComponent>`
- Props and slot content for a Story are passed with the `args` property
- Slots are defined using [Render Functions](https://vuejs.org/guide/extras/render-function.html)
  :::

Complete example:

<<< ./stories-example.ts
