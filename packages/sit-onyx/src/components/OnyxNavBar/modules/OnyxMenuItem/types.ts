import type { OnyxColor } from "../../../../types";
import type { OnyxLinkProps } from "../../../OnyxLink/types";

export type OnyxMenuItemProps = Pick<OnyxLinkProps, "target"> &
  Partial<Pick<OnyxLinkProps, "href">> & {
    /**
     * Whether the menu item is currently active.
     * This is the case if the given link is currently opened.
     */
    active?: boolean;
    /**
     * Whether the menu item is disabled.
     */
    disabled?: boolean;
    /**
     * Main color of the item content.
     */
    color?: Extract<OnyxColor, "primary" | "danger">;
  };
