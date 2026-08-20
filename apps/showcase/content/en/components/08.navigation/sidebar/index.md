---
title: Sidebar
componentName: OnyxSidebar
---

A sidebar is displayed either on the left or right edge of the application to show additional information. It can shown either permanently or only temporarily after user interaction.

## Examples

### Alignments

A basic sidebar is shown permanently on the left or right side of the application. It can contain up to three sections: header, body and footer. The header and footer are sticky while the body becomes scrollable if the content is too large for the available screen height.

The sidebar can manually be resized by the user by dragging the border. Double clicking the border will reset the width to the default. Resizing can be disabling using the `resizable` property.

<steps>

::step
#headline
Left

#default
:component-example{name="Left" layout="fullWidth"}
::

::step
#headline
Right

#default
:component-example{name="Right" layout="fullWidth"}
::

</steps>

<br />

### Temporary

Use a temporary sidebar to show the additional content only after user interaction, e.g. when clicking a row inside a [data grid](/components/data/data-grid).

:component-example{name="Temporary" layout="fullWidth"}

### Tree view

To display hierarchical data, use a [tree view](/components/navigation/tree-view) component inside the sidebar.

:component-example{name="TreeView" layout="fullWidth"}

### Grid

The sidebar also supports using our grid system to easy build responsive layouts. For further information, please refer to our [grid documentation](/introduction/foundation/breakpoints-and-grid).

<p style="color: var(--onyx-color-text-icons-info-intense)">Resize the sidebar by dragging the border to see the grid in action.</p>

:component-example{name="Grid" layout="fullWidth"}
