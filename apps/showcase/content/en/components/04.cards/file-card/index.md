---
title: File card
componentName: OnyxFileCard
---

The file card is used to represent a selected or upload file. It is mainly used by the [file upload](/components/form-elements/file-upload) component but can also be used individually.

## Examples

### Basic

The file card shows file metadata such as the file name and size. If set, the filename is clickable and will open a link to the file.

:component-example{name="Basic" layout="grow"}

### Actions

Custom actions can be provided to support additional functionality like deleting, downloading etc.

:component-example{name="Actions" layout="grow"}

### Status

Multiple status can be used to represent states like uploaded, error, warning etc. A optional progress bar can be shown.
See our [color documentation](/introduction/foundation/colors#colors) for when to use which color.

:component-example{name="Status" layout="grow" orientation="vertical"}

### Interactive upload

The file card itself only displays the file but has no actual upload logic since this heavily depends on the backend that is uploaded to. This examples shows how a upload process can look like.

:component-example{name="Upload" layout="grow"}
