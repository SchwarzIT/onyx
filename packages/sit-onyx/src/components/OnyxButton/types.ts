export type ButtonProps = {
  /**
   * The text content of the button.
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
   * The style of the button.
   */
  mode?: ButtonMode;
  /**
   * An icon which will be displayed on the left side of the label.
   */
  icon?: string;
};

export const BUTTON_TYPES = ["button", "submit", "reset"] as const;
export type ButtonType = (typeof BUTTON_TYPES)[number];

export const BUTTON_VARIATIONS = ["primary", "secondary", "danger"] as const;
export type ButtonVariation = (typeof BUTTON_VARIATIONS)[number];

export const BUTTON_MODES = ["default", "outline", "plain"] as const;
export type ButtonMode = (typeof BUTTON_MODES)[number];
