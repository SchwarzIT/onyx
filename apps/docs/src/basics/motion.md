# Motion

Microanimations bring a user interface to life. However, careful handling is necessary here, because the minimalistic motto is

::: tip Less is more!
The user should not be distracted by elaborate animations. Instead, they should support the user in his workflow, provide feedback and make the entire application easier to understand.
:::

For this reason, onyx provides a selected set of animations that fullfills these requirements. Default animations are already part of the components.

## Types of animations

| Token name  | Definition                                   | Example                                                                 |
| ----------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `slide`     | Object slides from position x to position y. | Notification messages slide from outside the screen to their positions. |
| `bounce`    | Object "jumps" into its position.            | Toast message appears for giving the iser feedback.                     |
| `fade`      | Object appears/disappears with opacity.      | Notification messages are fading out when they disappear.               |
| `expand`    | Object gets larger.                          | Flyout appears in combo box.                                            |
| `collapse`  | Object gets smaller.                         | Flyout disappears in combo box.                                         |
| `rearrange` | Objects are filling the empty space.         | Cards replace another card that was deleted previously.                 |
