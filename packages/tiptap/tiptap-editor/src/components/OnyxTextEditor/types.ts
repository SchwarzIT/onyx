import type { Extensions } from "@tiptap/vue-3";
import type { Nullable, OnyxTextareaProps } from "sit-onyx";

// TODO: consider the following features if possible:
// placeholder, required, readonly, min/max length, custom errors, autocapitalize
export type OnyxTextEditorProps = Pick<
  OnyxTextareaProps,
  | "label"
  | "disableManualResize"
  | "disabled"
  | "hideLabel"
  | "autosize"
  | "autofocus"
  | "message"
  | "success"
> & {
  /**
   * Current editor value.
   */
  modelValue?: Nullable<string>;
  /**
   * Toolbar config.
   */
  toolbar?: ToolbarOptions;
  /**
   * Tiptap extensions to use. Should not be changed dynamically.
   * If set, default extensions will be overridden. Use or configure the OnyxStarterKit in this case.
   */
  extensions?: Extensions;
};

export type ToolbarOptions = {
  /**
   * How to position the toolbar.
   *
   * @default "top"
   */
  position?: "top" | "bottom";
};
