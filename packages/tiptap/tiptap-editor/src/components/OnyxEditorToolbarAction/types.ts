import type { OnyxSystemButtonProps } from "sit-onyx";

export type OnyxEditorToolbarActionProps = Pick<OnyxSystemButtonProps, "label" | "disabled"> &
  Required<Pick<OnyxSystemButtonProps, "icon">> & {
    /**
     * Whether the action is currently active.
     */
    active?: boolean;
  };
