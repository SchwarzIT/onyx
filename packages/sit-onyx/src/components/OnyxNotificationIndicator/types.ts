import type { OnyxColor } from "../../types";

interface Position {
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
}

export interface OnyxNotificationIndicatorProps {
  /**
   * Use this property to set a specific position of the indicator (working with position: "absolute")
   */
  position?: Position;
  /**
   * Use this property to set the color of the indicator.
   */
  color?: Extract<
    OnyxColor,
    "primary" | "secondary" | "neutral" | "danger" | "warning" | "success" | "info"
  >;
  /**
   * Use this property to make the indicator pulsing. The default value is false.
   */
  pulsing?: boolean;
  /**
   * Use this property to make the indicator bouncing. The default value is false.
   */
  bouncing?: boolean;
  /**
   * Use this property to make the indicator visible. The default value is false.
   */
  visible?: boolean;
}
