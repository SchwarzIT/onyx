export type OnyxFlyoutProps = {
  open?: FlyoutOpen;
  position?: FlyoutPosition;
  /**
   * Aria label for the flyout.
   */
  label: string;
};

export type FlyoutPosition =
  | "auto"
  | "top"
  | "top right"
  | "top left"
  | "right"
  | "bottom"
  | "bottom right"
  | "bottom left"
  | "left";

export type FlyoutOpen =
  | "hover"
  | "click"
  | boolean
  | ({
      type: "hover";
    } & Partial<OnyxFlyoutProps>)
  | ({
      type: "click";
    } & Partial<OnyxFlyoutProps>);
