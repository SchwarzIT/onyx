---
title: Markdown
componentName: OnyxMarkdown
package: @sit-onyx/comark
status: experimental
---

Displays [markdown](https://www.markdownguide.org/) content using onyx components, especially useful when working on documentation applications or displaying responses from AI integrations. Common markdown elements such as headlines, links, tables and more will be replaced with corresponding onyx components and styles.

## Installation

Our markdown component is based on [Comark](https://comark.dev). Follow the steps below to get started:

<steps>

::step
#headline
Install dependencies

#default
Install the npm package into your project:

:npm-install-code-tabs{packages="@sit-onyx/comark"}

::

::step
#headline
Import styles

#default
Next, import the styles. We recommend to import them globally in the root of your application:

    ::content-tabs
    #vue
    Import the styles in your `main.ts` file. Make sure to import them **after** the regular `sit-onyx/style.css` styles and before any of your components (usually the App.vue file).

    ```ts [main.ts]
    // make sure to import the Comark styles AFTER the general "sit-onyx" styles
    // import "sit-onyx/style.css";
    import "@sit-onyx/comark/style.css"
    ```

    #nuxt
    Import the styles in your Nuxt config:

    ```ts [nuxt.config.ts]
    export default defineNuxtConfig({
        css: ["@sit-onyx/comark/style.css"],
    });

    ```
    ::

::

</steps>

<br />

## Examples

### Basic

The component renders the passed markdown which can also be changed dynamically.

For more details, refer to the [Comark documentation](https://comark.dev/rendering/vue#markdown).

<<< ./examples/Basic.example.vue preview=true layout=fullWidth
