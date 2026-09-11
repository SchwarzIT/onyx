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

The basic text editor includes a pre-defined set of extensions to support common functionalities. See the [extensions](#extensions) section below for customization options. The height of the editor is sized automatically by default which ensures that there is a minimum height which grows as the user types in until the maximum height is reached. You can customize the minimum and maximum number of rows using the `autosize` property or disable the maximum height completely so the textarea grows infinitely.

_Type in multiple rows in the example below to see the autosize in action._

Additionally, the user can resize the editor manually by dragging the bottom right corner vertically. You can disable this feature using the `disableManualResize` property.

:component-example{name="Basic" layout="grow" style="--preview-max-width: 34rem"}

### Toolbar position

The toolbar can optionally be positioned at the bottom.

:component-example{name="BottomToolbar" layout="grow" style="--preview-max-width: 34rem"}

### Extensions

The editor adapts automatically depending on your configuration. E.g. if you disable specific extensions or options (e.g. heading levels), the displayed editor toolbar will adapt accordingly. The editor extensions can be customized in several ways:

<steps>

::step
#headline
Configure starter kit

#default
The editor uses a custom `OnyxStarterKit` by default which is based on the [Tiptap starter kit](https://tiptap.dev/docs/editor/extensions/functionality/starterkit) but includes additional commonly used extensions and options.

To override / customize the extensions used by the editor, use the `extensions` property to pass in custom extensions which will fully replace the default config. You can either re-use and configure the default `OnyxStarterKit` here or use your own starter kits / extensions.

:component-example{name="StarterKit" layout="grow" style="--preview-max-width: 34rem"}
::

::step
#headline
Custom extensions

#default
Additionally, the editor can be extended with custom extensions and actions which are displayed at the end of the toolbar. Browse the Tiptap extensions overview for a full list iof extensions.

<div class="onyx-grid">
<link-card class="onyx-grid-span-4" headline="Tiptap extensions overview" link="https://tiptap.dev/docs/editor/extensions/overview" />
</div>

<br />

:component-example{name="CustomActions" layout="grow" style="--preview-max-width: 42rem"}
::

</steps>


### Disabled

The editor can be disabled to indicate that it is currently not editable.

:component-example{name="Disabled" layout="grow" style="--preview-max-width: 34rem"}

### Min and max length

When a min or maxlength is defined, the user must enter at least `min` and at most `max` characters before the value is valid. Otherwise the editor is invalid and a proper error message is displayed. Optionally, a character counter can be displayed.

Tiptap's [CharacterCount extension](https://tiptap.dev/docs/editor/extensions/functionality/character-count) is used to determine the character count.

:component-example{name="MinMaxLength" layout="grow" style="--preview-max-width: 34rem"}

### Loading & Skeleton

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. On the other hand, the skeleton should be used on initial page load when the data for the page / editor is initially loaded.

:component-example{name="Loading" layout="grow" orientation="vertical" style="--preview-max-width: 34rem"}

### Message

An optional message, error or success message can be displayed. Each message supports showing an info tooltip with further information.
When multiple message types are defined at once, only the most relevant will be displayed (e.g. error is preferred over the regular message).

:component-example{name="Message" layout="grow" orientation="vertical" style="--preview-max-width: 34rem"}

### Label positions

The editor label can be positioned in several ways to support a wide variety of layouts.

:component-example{name="LabelPositions" layout="grow" orientation="vertical" style="--preview-max-width: 34rem"}
