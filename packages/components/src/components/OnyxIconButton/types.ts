import type { DensityProp } from "../../composables/density";
import type { AutofocusProp } from "../../types";
import type { ButtonColor, ButtonType } from "../OnyxButton/types";

export type OnyxIconButtonProps = DensityProp &
  AutofocusProp & {
    /**
     * The aria-label of the button.
     */
    label: string;
    /**
     * If the button should be disabled or not.
     */
    disabled?: boolean;
    /**
     * The button type.
     */
    type?: ButtonType;
    /**
     * The color of the button.
     */
    color?: ButtonColor;
    /**
     * When `true` shows an loading indicator instead of the actual icon.
     * The button is disabled while loading is `true`.
     */
    loading?: boolean;
    /**
     * The icon which will be displayed. The custom content in the `default` won't have an effect if the `icon` property is set.
     */
    icon?: string;
    /**
     * Whether to show a skeleton button.
     */
    skeleton?: boolean;
  };
