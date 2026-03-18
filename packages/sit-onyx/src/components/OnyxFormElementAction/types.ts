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
   * Visual size.
   * - default: Useful for standalone actions, e.g. inside leading/trialing slot of form elements
   * - small: Useful for inline actions, e.g. inside the leadingIcons/trailingIcons slot of form elements (clear button etc.)
   */
  size?: "sm" | "lg";
  /**
   * If the button is currently pressed / active.
   * Only use with `type="toggle"`.
   */
  pressed?: boolean;
  /**
   * If `true`, the button will be only be shown visually if the parent form element has focus.
   */
  showOnFocus?: boolean;
};
