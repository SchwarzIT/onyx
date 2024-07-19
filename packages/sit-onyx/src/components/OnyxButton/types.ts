import type { DensityProp } from "../../composables/density";
import type { AutofocusProp } from "../../types";

export type OnyxButtonProps = DensityProp &
  AutofocusProp & {
    /**
     * The text content of the button.
     */
    label: string;
    /**
     * If the button should be disabled or not.
     */
    disabled?: boolean;
    /**
     * Shows a loading indicator.
     */
    loading?: boolean;
    /**
     * The button type.
     */
    type?: ButtonType;
    /**
     * The color of the button.
     */
    color?: ButtonColor;
    /**
     * The style of the button.
     */
    mode?: ButtonMode;
    /**
     * An icon which will be displayed on the left side of the label.
     */
    icon?: string;
    /**
     * Whether to show a skeleton button.
     */
    skeleton?: boolean;
    /**
     * Whether to enable ripples on interaction
     */
    rippleAnimation?: boolean;
  };

export const BUTTON_TYPES = ["button", "submit", "reset"] as const;
export type ButtonType = (typeof BUTTON_TYPES)[number];

export const BUTTON_COLORS = ["primary", "neutral", "danger"] as const;
export type ButtonColor = (typeof BUTTON_COLORS)[number];

export const BUTTON_MODES = ["default", "outline", "plain"] as const;
export type ButtonMode = (typeof BUTTON_MODES)[number];
