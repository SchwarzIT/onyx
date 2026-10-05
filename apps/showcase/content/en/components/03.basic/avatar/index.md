---
title: Avatar
componentName: OnyxAvatar
---

Avatars visually represent users with profile images or initials, adding a personal touch to applications by displaying the user’s identity in a compact form.

## Examples

### Basic

The avatar can either be displayed as initials only (based on the username) or with a custom profile image. If the image can not be loaded, the initials are shown automatically. Use the `initials` property to define custom initials to override the default auto-generated ones.

<<< ./examples/Basic.example.vue preview=true 

### Sizes

The avatar can be display in multiple sizes, depending on the layout and use case.

<<< ./examples/Sizes.example.vue preview=true  layout="fullWidth"

### Stack

For displaying multiple grouped users, you can wrap the avatars inside the `OnyxAvatarStack` component.

<<< ./examples/Stack.example.vue preview=true 
