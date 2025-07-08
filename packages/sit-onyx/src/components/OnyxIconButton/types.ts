import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { AutofocusProp } from "../../types/index.js";
import type { ButtonColor, ButtonType, OnyxButtonProps } from "../OnyxButton/types.js";
import type { FormInjected } from "../OnyxForm/OnyxForm.core.js";

export type OnyxIconButtonProps = DensityProp &
  AutofocusProp &
  Pick<OnyxButtonProps, "link"> & {
    /**
     * The aria-label of the button.
     */
    label: string;
    /**
     * If the button should be disabled or not.
     */
    disabled?: FormInjected<boolean>;
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
    skeleton?: SkeletonInjected;
  };
