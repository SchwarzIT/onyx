import type { Nullable, OnyxTextareaProps } from "sit-onyx";

// TODO: consider the following features if possible:
// placeholder, required, readonly, min/max length, custom errors, autocapitalize
export type OnyxTiptapEditorProps = Pick<
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
};

export type ToolbarOptions = {
  /**
   * How to position the toolbar.
   *
   * @default "top"
   */
  position?: "top" | "bottom";
};
