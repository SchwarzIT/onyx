import type { DensityProp } from "../../styles/density";
import type { ButtonType, ButtonVariation } from "../OnyxButton/types";
import type { IconSize } from "../OnyxIcon/types";

export type OnyxIconButtonProps = {
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
  variation?: ButtonVariation;
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
   * Icon size. Pixel values will be translated to the according `rem` value by the base of `16px`=`1rem`.
   * @default 24px
   */
  size?: IconSize;
} & DensityProp;
