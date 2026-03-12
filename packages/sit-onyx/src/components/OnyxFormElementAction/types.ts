import type { DensityProp } from "../../composables/density.js";
import type { FormInjected } from "../OnyxForm/OnyxForm.core.js";

export type OnyxFormElementActionProps = DensityProp & {
  /**
   * Icon to display within the button.
   */
  icon: string;
  /**
   * Label describing the button action.
   */
  label: string;
  /**
   * Whether the button is disabled or not.
   */
  disabled?: FormInjected<boolean>;
  /**
   * Which type of button this action is.
   * Should not be changed dynamically.
   */
  type?: "button" | "toggle";
  /**
   * If the button is currently pressed / active.
   * Only use with `type="toggle"`.
   */
  pressed?: boolean;
};
