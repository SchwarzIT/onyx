import type { OnyxInputProps } from "../OnyxInput/types.js";
import type { OnyxShortcutProps } from "../OnyxShortcut/types.js";

export type OnyxSearchProps = Pick<
  OnyxInputProps,
  | "message"
  | "maxlength"
  | "error"
  | "readonly"
  | "disabled"
  | "density"
  | "id"
  | "name"
  | "skeleton"
  | "modelValue"
  | "autofocus"
  | "loading"
> &
  Pick<OnyxShortcutProps, "sequence"> & {
    /**
     * The component is available in two color modes: blank and tinted.
     * Use the color that is opposite to the tinted or blank color of the underlying canvas.
     *
     * @default "blank"
     */
    label: string;
    color?: SearchColor;
    /**
     * Set the size of the corner radii.
     *
     * @default "blank"
     */
    cornerRadius?: SearchCornerRadius;
    showFilter?: boolean;
    showPersonalFilter?: boolean;
    shortcut?: Pick<OnyxShortcutProps, "sequence" | "cleanupDelay" | "os" | "element">;
  };

export const SEARCH_COLORS = ["blank", "tinted"] as const;
export type SearchColor = (typeof SEARCH_COLORS)[number];

export const SEARCH_CORNER_RADII = ["soft", "strong"] as const;
export type SearchCornerRadius = (typeof SEARCH_CORNER_RADII)[number];
