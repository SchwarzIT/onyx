---
title: Slider
componentName: OnyxSlider
status: new
---

Sliders allow users to select a value (or a range of two values) inside a given min/max range by dragging a thumb along a track.

## Examples

### Basic

The default slider supports selecting a single value within the given min/max range. The step size can be configured if needed but defaults to 1.

:component-example{name="Basic" layout="grow"}

### Range

The range mode can be used so select a range of two values.

:component-example{name="Range" layout="grow"}

### Marks

Marks can be used to show visual "steps" inside the slider track which can optionally show a label below. They can be auto-generated based on the `step` property which is useful for discrete sliders where the user can only selected specific values (e.g. 0, 25, 50, 75 and 100).

The `mark` slot can be used to provide custom content for each mark such as icons.

:component-example{name="Marks" layout="grow" orientation="vertical"}

### Controls

The slider supports multiple control types that allow the user to change the slider value with an additional action.

<steps>

::step
#headline
Icon control

#default
The icon control shows two additional buttons for increasing and decreasing the value. It is only supported for the single mode.

:component-example{name="IconControl" layout="grow"}
::

::step
#headline
Input control

#default
The input control shows an additional input where the user can type in to change the current value. This control is supported for both the single and the range mode.

:component-example{name="InputControl" layout="grow"}
::

::step
#headline
Value control

#default
The value control is not interactive and shows the min and max value of the slider.

:component-example{name="ValueControl" layout="grow"}
::

</steps>

<br />

### Disabled

The disabled is used to indicate that the slider is currently not editable.

:component-example{name="Disabled" layout="grow"}

### Skeleton

The skeleton should be used on initial page load when the data for the page / slider is initially loaded.

:component-example{name="Skeleton" layout="grow"}

### Message

An optional message, error or success message can be displayed. Each message supports showing an info tooltip with further information.
When multiple message types are defined at once, only the most relevant will be displayed (e.g. error message takes precedent over the regular message).

:component-example{name="Message" layout="grow" orientation="vertical"}
