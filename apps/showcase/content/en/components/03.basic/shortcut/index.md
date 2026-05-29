---
title: Shortcut
componentName: OnyxShortcut
status: experimental
---

The shortcut component offers a visual representation of a shortcut sequence. It supports multi-step sequences and operating system-specific symbols for macOS and Windows. It can also highlight pressed keys interactively.

## Examples

### Basic

A basic shortcut consists out of one or multiple keys. Optionally, the `highlight` property can be set to `auto` to visually highlight pressed keys of the shortcut.

The following shortcut is executed when pressing `Control` and `C` at the same time.

:component-example{name="Basic"}

### Multiple steps

The shortcut can also contain multiple steps that the user must press in a specific order. Each step can define keys where either **all** of them must be pressed at the same time or **any** (at least one) of them must be pressed.

The following shortcut is executed when pressing `Control` and `Key` at the same time **first**, **then** releasing both keys and **finally** pressing only either `A` or `B`.

:component-example{name="MultipleSteps"}

### Nested steps

Shortcut steps can also be nested for both single and multi step shortcuts.

The following shortcut is executed when pressing `Control`, `K` and either `A` or `B` together at the same time.

:component-example{name="NestedSteps"}

### Composable

We also offer a composable (which is also used internally by our shortcut component) for reacting to shortcut sequences. It can be used independently from the shortcut component.

:component-example{name="Composable"}

### Operating system

The users operating system is detected automatically by default to show OS-specific key symbols such as "Command" on macOS or the "Windows" key on Windows. If necessary, the operating system can be explicitly defined using the `os` property or be set to `generic` to use OS-independent symbols.

:component-example{name="OS" layout="fullWidth"}

### Disabled

The disabled state can be used to prevent listening to keyboard events so the shortcut is not executed when pressing the defined keys. This can be useful when the shortcut should only be displayed visually but should not actually be listened for to improve performance.

:component-example{name="Disabled"}

### Skeleton

The skeleton can be used on initial page load when the data for the page / shortcut is initially loaded.

:component-example{name="Skeleton"}
