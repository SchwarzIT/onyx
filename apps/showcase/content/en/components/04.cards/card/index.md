---
title: Card
componentName: OnyxCard
---

Cards serve as versatile containers for a few short, related pieces of content. Their primary purpose is to present information in a visually appealing and organized manner, enhancing user experience and content discoverability.


## Examples

Since cards a very flexible and generic components, the content highly depends on the use case and is fully customizable. You can find a few examples below to get started, feel free to copy and adjust them if needed or create your own cards from scratch.

### Basic

:component-example{name="Basic" layout="grow"}

### Clickable

The whole card can be made clickable in two ways: As button or as link.

<steps>

::step
#headline
Button

#default
Set the `clickable` property to use a button card that can be clicked to perform any custom action.

:component-example{name="Clickable" layout="grow"}
::

::step
#headline
Link

#default
Alternatively, use the `link` property to add a link to another page.

:component-example{name="Link" layout="grow"}
::

</steps>

Clickable cards must **NOT** contain any interactive elements inside the content since the whole card is already interactive. If you need to add multiple actions, leave the card non-interactive and add the actions e.g. with multiple buttons inside the card.

### Image card

An image-based card to represent information with additional data such as image, category, tags etc.

:component-example{name="Image" layout="grow"}

### Details card

A details card can be used to represent and focus on data-heavy use cases.

:component-example{name="Details" layout="grow"}

### KPI card

KPI cards can be used to prominently display specific import values.

:component-example{name="KPI" layout="grow"}
