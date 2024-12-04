# Styling

We use [SCSS](https://sass-lang.com/documentation/syntax/#scss) as CSS preprocessor.
Any valid CSS is also valid SCSS, that should make it easy to get started.

All our design variables are provided as [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).
An overview can be found [here](/variables/introduction.html).

For a general overview of our (S)CSS guidelines refer to our [CSS Principles](/principles/technical-vision.html#css).

## CSS Layers

We make use of [Cascade Layers](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers) to simplify how different style sources are combined.
By putting all our styles into layers they can also be easily overwritten by users.

Therefore, the `@include layers.component()` mixin must be used.
It will put the contained rules into the `onyx.component` layer and normalize stylings.

<<< ./styling-example.vue#screenshot-testing {scss}

## Custom density styles

For most cases, the [CSS variables for densities](/variables/spacings) will already support that the component adjusts its spacings based on the current density.
In exceptional cases it might be necessary to apply special style rules for the densities, for which the default spacings do not work.

You can use our density mixins in this case:

<<< ./styling-example.vue#densities {scss}
