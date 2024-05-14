import { sourceCodeTransformer } from "@sit-onyx/storybook-utils";
import type { Decorator, StoryContext } from "@storybook/vue3";

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
  } as const;
};

export const createIconSourceCodeTransformer = (propertyName: string) => {
  const iconArgType = defineIconSelectArgType();

  return (sourceCode: string, ctx: Pick<StoryContext, "args">) => {
    // using this custom transformer would override the default one
    // so we are calling the default transformer here
    const code = sourceCodeTransformer(sourceCode);
    if (!ctx.args[propertyName] || typeof ctx.args[propertyName] !== "string") return code;

    const iconName = iconArgType.control.labels[ctx.args[propertyName] as string];

    return `<script lang="ts" setup>
import icon from "@sit-onyx/icons/${iconName}.svg?raw";
</script>
${code
  // replace code when using regular properties, e.g. :icon="icon"
  .replace(
    new RegExp(` ${propertyName}=['"]${ctx.args[propertyName]}['"]`),
    ` :${propertyName}="icon"`,
  )
  // replace code when using v-bind (e.g. with render function), e.g. v-bind="{icon}"
  .replace(
    new RegExp(`${propertyName}:['"]${ctx.args[propertyName]}['"]`),
    propertyName === "icon" ? "icon" : `${propertyName}:icon`,
  )}`;
  };
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

/**
 * Storybook decorator that limits the width of the component to showcase truncation behavior.
 */
export const createTruncationDecorator = (maxWidth: string): Decorator => {
  return (story) => ({
    components: { story },
    template: `
    <div style="max-width: ${maxWidth};">
      <story />
    </div>`,
  });
};
