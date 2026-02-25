// extensions/OnyxStarterKit.js
import TextAlign, { type TextAlignOptions } from "@tiptap/extension-text-align";
import StarterKit, { type StarterKitOptions } from "@tiptap/starter-kit";
import { Extension, type Extensions } from "@tiptap/vue-3";
import { OnyxHeadingExtension } from "./heading.js";

export type OnyxStarterKitOptions = Partial<
  StarterKitOptions & { textAlign: Partial<TextAlignOptions> | false }
>;

/**
 * Custom onyx starter kit for tiptap intended to be used with the `OnyxTextEditor` component.
 * Includes basic and commonly used extensions / options.
 */
export const OnyxStarterKit = Extension.create<OnyxStarterKitOptions>({
  name: "onyxStarterKit",
  addOptions() {
    return {
      link: {
        openOnClick: false,
        defaultProtocol: "https",
        autolink: true,
        enableClickSelection: true,
        HTMLAttributes: {
          class: "onyx-link",
        },
      },
      heading: {
        levels: [1, 2, 3, 4], // we do not want to support h5 and h6 by default
      },
      textAlign: {
        types: ["heading", "paragraph"],
      },
    };
  },

  // This method tells Tiptap which extensions this one includes
  addExtensions() {
    const extensions: Extensions = [
      StarterKit.configure({
        ...this.options,
        heading: false, // false needed here because we add our custom options below
      }),
    ];

    if (this.options.heading !== false) {
      extensions.push(OnyxHeadingExtension.configure(this.options.heading));
    }
    if (this.options.textAlign !== false) {
      extensions.push(TextAlign.configure(this.options.textAlign));
    }

    return extensions;
  },
});
