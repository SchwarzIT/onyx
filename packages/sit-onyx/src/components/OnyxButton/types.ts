import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { AutofocusProp } from "../../types/index.js";
import type { FormInjected } from "../OnyxForm/OnyxForm.core.js";
import type { WithLinkProp } from "../OnyxRouterLink/types.js";

export type OnyxButtonProps = DensityProp &
  AutofocusProp & {
    /**
     * The text content of the button.
     */
    label: string;
    /**
     * If the button should be disabled or not.
     */
    disabled?: FormInjected<boolean>;
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
    skeleton?: SkeletonInjected;
    /**
     * If set, the button will be rendered as link.
     * Note that not all button properties are supported when used as link, e.g. `disabled`, `type` and `autofocus` are not supported.
     */
    link?: WithLinkProp["link"];
  };

export const BUTTON_TYPES = ["button", "submit", "reset"] as const;
export type ButtonType = (typeof BUTTON_TYPES)[number];

export const BUTTON_COLORS = ["primary", "neutral", "danger"] as const;
export type ButtonColor = (typeof BUTTON_COLORS)[number];

export const BUTTON_MODES = ["default", "outline", "plain"] as const;
export type ButtonMode = (typeof BUTTON_MODES)[number];
