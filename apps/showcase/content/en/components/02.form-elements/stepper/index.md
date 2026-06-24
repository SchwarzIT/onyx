---
title: Stepper
componentName: OnyxStepper
---

The stepper component lets users input numerical values and adjust them incrementally via plus and minus buttons, making it ideal for setting quantities or values in small, controlled steps.

## Examples

### Basic

The stepper includes a increase/decrease button by default that can optionally be hidden. The step size defaults to 1 but can be customized using the `stepSize` property.

:component-example{name="Basic" layout="grow" orientation="vertical"}

### Precision

You can use the `precision` property to restrict how many decimal places are shown. The entered value is rounded if needed. A precision of `2` means that only two decimal places are allowed, e.g. `1.00`. To only allow "full" numbers, set the precision to `0`. A negative value can also be used to specify the places of the integer part so e.g. `precision="-1"` only allows multiples of 10, `precision="-2"` multiples of 100 and so on.

The `stepSize` must be compatible with the defined precision.

:component-example{name="Precision" layout="grow"}

### Formatting

In addition to specifying a [precision](#precision), custom formatting can be applied to the value to display any text. Since the formatted text might not always be a valid number, it is only displayed when the stepper is **not** focused / actively edited. While editing the value, the default formatting is used.

There are multiple options available:

<steps>

::step
#headline
Locale formatting

#default
When simply enabling the `formatNumber` property, the value will be formatted depending on the current locale / language of the application. This means e.g. a dot is used to separate the integer and fractional part in Englisch while a comma is used in German.

:component-example{name="Formatting" layout="grow"}
::

::step
#headline
Custom formatting

#default
Alternatively, a full custom formatter can be defined that returns a custom text for the current value.

:component-example{name="CustomFormatter" layout="grow"}
::

::step
#headline
Alignment

#default
The value is centered by default but can optionally be left or right aligned. All alignment options can be used in combination with custom formatting.

:component-example{name="Alignment" layout="grow" orientation="vertical"}
::

</steps>

<br />

### Readonly & Disabled

Readonly and disabled are used to indicate that the stepper is currently not editable.

:component-example{name="Readonly" layout="grow"}

The loading state is used after a user interaction to indicate that the triggered action is currently loading / in progress. On the other hand, the skeleton should be used on initial page load when the data for the page / stepper is initially loaded.

:component-example{name="Loading" layout="grow"}

### Message

An optional message, error or success message can be displayed. Each message supports showing an info tooltip with further information.
When multiple message types are defined at once, only the most relevant will be displayed (e.g. error message takes precedent over the regular message).

:component-example{name="Message" layout="grow" orientation="vertical"}

### Slots

Multiple slots are supported to pass in custom content if needed. Note that the default increment and decrement button will be hidden if a custom leading or trailing slot is passed.

:component-example{name="Slots" layout="grow"}

### Label positions

The stepper label can be positioned in several ways to support a wide variety of layouts.

:component-example{name="LabelPositions" layout="grow" orientation="vertical"}
