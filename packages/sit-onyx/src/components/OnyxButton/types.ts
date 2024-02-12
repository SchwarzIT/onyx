export type ButtonProps = {
  /**
   * The text content of the button.
   */
  label: string;
  /**
   * If the button should be disabled or not.
   */
  isDisabled?: boolean;
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
  variant?: ButtonVariant;
};

export const BUTTON_TYPES = ["button", "submit", "reset"] as const;
export type ButtonType = (typeof BUTTON_TYPES)[number];

export const BUTTON_COLORS = ["primary", "secondary", "danger"] as const;
export type ButtonColor = (typeof BUTTON_COLORS)[number];

export const BUTTON_VARIANTS = ["default", "outline", "plain"] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
