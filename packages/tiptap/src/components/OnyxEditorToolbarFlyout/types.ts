export type OnyxEditorToolbarFlyoutProps = {
  /**
   * Label for the flyout button.
   */
  label: string;
  /**
   * Icon for the flyout button.
   */
  icon: string;
  /**
   * List of available options.
   */
  options: EditorToolbarFlyoutOption[];
};

export type EditorToolbarFlyoutOption = {
  /**
   * Option label.
   */
  label: string;
  /**
   * Optional icon.
   */
  icon?: string;
  /**
   * Whether the option is currently active.
   */
  active?: boolean;
  /**
   * Callback when the option is clicked.
   */
  onClick?: () => void;
};
