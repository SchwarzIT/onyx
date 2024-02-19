# Motion

Microanimations bring a user interface to life. However, careful handling is necessary here, because the minimalistic motto is:

::: tip Less is more!
The user should not be distracted by elaborate animations. Instead, they should support the user in his workflow, provide feedback and make the entire application easier to understand.
:::

For this reason, onyx provides a selected set of transitions and animations that fulfills these requirements. Default transitions/animations are already part of the components.

## Types of motions

::: details Don't use animations, if it doesn't make sense!
If the performance of your application is low or you just don't want to use any kind of animation, you don't have to use it. They are a feature for a better user experience but it is not mandatory to implement. You can always switch it off.
:::

| Motion name | Definition                                   | Example                                                                 |
| ----------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `slide`     | Object slides from position x to position y. | Notification messages slide from outside the screen to their positions. |
| `bounce`    | Object "jumps" into its position.            | Toast message appears for giving the user feedback.                     |
| `fade`      | Object appears/disappears with opacity.      | Notification messages are fading out when they disappear.               |
| `expand`    | Object gets larger.                          | Flyout appears in combo box.                                            |
| `collapse`  | Object gets smaller.                         | Flyout disappears in combo box.                                         |
| `rearrange` | Objects are filling the empty space.         | Cards replace another card that was deleted previously.                 |

## Duration

Every transition/animation that is applied to a component uses a recommended duration by default. Although you are free to customize it with the durations that are provided by onyx.

| Duration name | Duration |
| ------------- | -------: |
| `sm`          |    400ms |
| `md`          |    700ms |
| `lg`          |   1000ms |
