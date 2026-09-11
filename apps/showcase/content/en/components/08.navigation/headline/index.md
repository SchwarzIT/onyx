---
title: Headline
componentName: OnyxHeadline
---

Headlines organize and structure content, guiding the user through different sections and conveying the hierarchy of information.
For all information about our typography system, please refer to:

<div class="onyx-grid">
<link-card class="onyx-grid-span-4" headline="Typography documentation" link="/introduction/foundation/typography#usage"></link-card>
</div>

## Examples

### Types

The headline supports six semantical types (h1 to h6) which should match the page hierarchy and should not skip levels. Visually, only h1 to h4 are supported so h5 and h6 will have the same styles as h4. The visual size can be changed independently from the semantic type using the `showAs` property.

:component-example{name="Types" orientation="vertical" }

### Hash

Mostly known from documentations, the headline can optionally define a "hash". This way, the headline can be clicked to automatically copy the headline link to the users clipboard. The page will also automatically scroll to the headline when clicked. The "hash" is the part at the end of the link after the `#` (e.g. `about-us` for `https://example.com#about-us`) and must be unique on the current page. You can also pass a regular text as hash, it will then be formatter automatically.

<p style="color: var(--onyx-color-text-icons-info-intense)">Hover over and click the headline to copy the link to it.</p>

:component-example{name="Hash"}

### Skeleton

Use the skeleton on initial page load while the data for the headline is currently loading.

:component-example{name="Skeleton"}
