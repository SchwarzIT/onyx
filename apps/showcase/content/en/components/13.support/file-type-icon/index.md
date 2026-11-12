---
title: File type icon
componentName: OnyxFileTypeIcon
---

Displays an icon for a file based on its [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types) (technical media type), helping users to quickly identify file types at a glance.

## Examples

For a full list of supported features, check out the icon component:

<div class="onyx-grid">

::component-overview-card
---
path: /components/basic/icon
class: onyx-grid-span-4
---
::

</div>

### Basic

Displays a corresponding icon based on the media type. For unknown types, a default icon is shown.

<<< ./examples/Basic.example.vue preview=true

### Supported types

Find a list of all currently supported media types:

<<< ./examples/AllTypes.example.vue preview=true layout=fullWidth
