---
title: File upload
componentName: OnyxFileUpload
---

The file upload component is used to support selecting / uploading one or multiple files with drag-and-drop support.

## Examples

### Single

A single file can be selected by default. You can optionally define which file types should be accepted and which max. file size to use.

:component-example{name="Basic" layout="grow"}

### Multiple

The file upload also supports selecting multiple files. You can optionally restrict how many total files can be selected and which max. total file size to use across all selected files.

When selecting files multiple times, they will be added to the selection by default. Use the `replace` property to replace the current selection with the new files.

:component-example{name="Multiple" layout="grow"}

### Sizes

The file upload supports several visual sizes so it can be used for different use cases / layouts.

:component-example{name="Sizes" layout="grow" orientation="vertical"}

### Custom file actions

The card displayed for every file can be customized if needed to e.g. support additional file actions.

:component-example{name="CustomActions" layout="grow"}

### List types

The list of selected files can be customized using the `listType` property to e.g. define a max. height or use a show/hide button.
This examples shows a custom visualization using a modal.

:component-example{name="Modal" layout="grow"}
