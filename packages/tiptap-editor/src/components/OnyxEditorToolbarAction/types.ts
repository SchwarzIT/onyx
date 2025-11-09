import type { OnyxSystemButtonProps } from "sit-onyx";

export type OnyxEditorToolbarActionProps = Pick<
  OnyxSystemButtonProps,
  "label" | "icon" | "disabled"
> & {
  /**
   * Whether the action is currently active.
   */
  active?: boolean;
};
