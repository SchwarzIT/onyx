---
"@sit-onyx/nuxt-docs": minor
---

feat: support icon for folders and files

The sidebar layout now supports showing an icon for content folders and pages in the sidebar. Use the "icon" property in the `.navigation.yml` file of a folder or the `navigation.item` frontmatter in your `*.md` files to specify the icon name.

You can browse all available icons in our [icon library](https://onyx.schwarz/icons.html). Important: You need the define the icon name in kebab-case, so e.g. for the "User Settings" icon, use "user-settings".

Other changes:

- remove default back button from the nav bar. If needed, you can re-add it by [customizing the nav bar](https://onyx.schwarz/development/packages/nuxt-docs.html#customization)
- sidebar items that are new sidebar roots now show an arrow icon to indicate that there is nested content
