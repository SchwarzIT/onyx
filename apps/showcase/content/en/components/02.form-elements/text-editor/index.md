---
title: Text editor
componentName: OnyxTextEditor
package: @sit-onyx/tiptap
status: experimental
---

The text editor supports entering text with additional formatting such as inserting links, headlines and more and is therefore ideal for comments, descriptions and more. For simple text-only data, please use the [textarea](/components/form-elements/textarea) instead.

## Installation

Our text editor is based on the [Tiptap editor](https://tiptap.dev/docs/editor/getting-started/overview). Follow the steps below to get started:

<steps>

::step
#headline
Install dependencies

#default
Install the npm package into your project:

:npm-install-code-tabs{packages="@sit-onyx/tiptap"}
::

::step
#headline
Import styles

#default
Next, import the editor styles. We recommend to import them globally in the root of your application:

  ::content-tabs
  #vue
  Import the styles in your `main.ts` file. Make sure to import them **after** the regular `sit-onyx/style.css` styles and **before** any of your components (usually the `App.vue` file).

  ```ts [main.ts]
  // make sure to import the Tiptap styles AFTER the general "sit-onyx" styles
  // import "sit-onyx/style.css";
  import "@sit-onyx/tiptap/style.css";
  ```

  #nuxt
  Import the styles in your Nuxt config:

  ```ts [nuxt.config.ts]
  export default defineNuxtConfig({
    css: ["@sit-onyx/tiptap/style.css"],
  });
  ```
  ::

::

</steps>

## Examples

### Basic

The basic text editor includes standard formatting extensions. The editor height expands dynamically as content grows until reaching its maximum threshold. Configure rows via `autosize` or allow unbounded vertical expansion.

_Type multiple rows in the example below to test automatic height expansion._

Users can also manually resize the editor by dragging the bottom-right corner, unless `disableManualResize` is set.

<<< ./examples/Basic.example.vue preview=true  layout="grow" style="--preview-max-width: 34rem"

### Toolbar position

The toolbar can be docked at the top or bottom of the editor.

<<< ./examples/BottomToolbar.example.vue preview=true  layout="grow" style="--preview-max-width: 34rem"

### Extensions

The toolbar automatically adapts to enabled extensions (e.g. hiding heading pickers if headings are disabled):

<steps>

::step
#headline
Configure starter kit

#default
The editor uses `OnyxStarterKit` by default, extending the [Tiptap starter kit](https://tiptap.dev/docs/editor/extensions/functionality/starterkit) with enterprise formatting presets.

Pass custom extensions to the `extensions` property to reconfigure defaults or supply an alternative set of plugins.

<<< ./examples/StarterKit.example.vue preview=true  layout="grow" style="--preview-max-width: 34rem"
::

::step
#headline
Custom extensions

#default
Extend the editor with third-party Tiptap plugins and append custom toolbar buttons to the end of the action row. See the full catalog of Tiptap extensions:

<div class="onyx-grid">
<link-card class="onyx-grid-span-4" headline="Tiptap extensions overview" link="https://tiptap.dev/docs/editor/extensions/overview" />
</div>

<br />

<<< ./examples/CustomActions.example.vue preview=true  layout="grow" style="--preview-max-width: 42rem"
::

</steps>


### Disabled

Renders the editor in a disabled, non-editable state.

<<< ./examples/Disabled.example.vue preview=true  layout="grow" style="--preview-max-width: 34rem"

### Min and max length

Enforce character limits using `min` and `max` constraints. Displays an optional character counter powered by Tiptap's [CharacterCount extension](https://tiptap.dev/docs/editor/extensions/functionality/character-count).

<<< ./examples/MinMaxLength.example.vue preview=true  layout="grow" style="--preview-max-width: 34rem"

### Loading & skeleton

The `loading` state indicates asynchronous operations following interaction, while `skeleton` renders a loading placeholder on initial page load.

<<< ./examples/Loading.example.vue preview=true  layout="grow" orientation="vertical" style="--preview-max-width: 34rem"

### Message

Supports hint, error, and success messages with optional tooltip context. When multiple states apply, errors take precedence.

<<< ./examples/Message.example.vue preview=true  layout="grow" orientation="vertical" style="--preview-max-width: 34rem"

### Label positions

Labels can be aligned top, left, or floating to match form layouts.

<<< ./examples/LabelPositions.example.vue preview=true  layout="grow" orientation="vertical" style="--preview-max-width: 34rem"
