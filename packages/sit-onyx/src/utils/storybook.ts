import type { ArgTypes, Decorator } from "@storybook/vue3";

/**
 * Defines the control for a Storybook argType to be a select/dropdown of
 * all available onyx icons.
 *
 * @example
 * ```ts
 * {
 *   argTypes: {
 *     icon: defineIconSelectArgType(),
 *   }
 * }
 * ```
 */
export const defineIconSelectArgType = () => {
  const ALL_ICONS = import.meta.glob("../../node_modules/@sit-onyx/icons/src/assets/*.svg", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  /**
   * Mapping between icon SVG content (key) and icon name (value).
   * Needed to display a labelled dropdown list of all available icons.
   */
  const iconLabels = Object.entries(ALL_ICONS).reduce<Record<string, string>>(
    (labels, [filePath, content]) => {
      labels[content as string] = filePath.split("/").at(-1)!.replace(".svg", "");
      return labels;
    },
    {},
  );

  return {
    options: Object.keys(iconLabels),
    control: {
      type: "select",
      labels: iconLabels,
    },
  } satisfies ArgTypes[number];
};

/**
 * Storybook decorator that wraps the story with a <div> that sets the text color
 * to neutral intense.
 * Useful if the component uses "currentColor" in its CSS.
 */
export const textColorDecorator: Decorator = (story) => ({
  components: { story },
  template: `
  <div style="color: var(--onyx-color-text-icons-neutral-intense)">
    <story />
  </div>`,
});
