import Heading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/vue-3";

/**
 * Custom heading extension that adds onyx-specific CSS classes to the headline levels.
 */
export const OnyxHeadingExtension = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level: number = node.attrs.level;

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: ["onyx-headline", `onyx-headline--h${level}`].join(" "),
      }),
      0, // This '0' represents the content hole where text goes
    ];
  },
});
