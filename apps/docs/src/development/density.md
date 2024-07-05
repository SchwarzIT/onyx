# Density System

Density refers to the amount of vertical white space a component has, as well as the height of the main (interactive) element of a component.
You can find more details about the design perspective in the [density design documentation](../basics/density.md).

The density can be set for the whole app, part of the app or a single component using the following CSS classes:

- `onyx-density-compact`
- `onyx-density-default`
- `onyx-density-cozy`

For convenience, the respective components also allow setting the density level via a `density` property.
This will set the density class on the component accordingly:

```vue
<OnyxComponent density="compact" />
<!-- is equivalent to -->
<OnyxComponent class="onyx-density-compact" />

<OnyxComponent density="default" />
<!-- is equivalent to -->
<OnyxComponent class="onyx-density-default" />

<OnyxComponent density="cozy" />
<!-- is equivalent to -->
<OnyxComponent class="onyx-density-cozy" />
```
