import type { OperatingSystem } from "../../composables/useOperatingSystem.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { KeyboardKey } from "../../utils/keyboard.js";

export type OnyxKeyProps = {
  /**
   * The keyboard key.
   */
  name: KeyboardKey;
  /**
   * Which operating system to use for displaying the key.
   * When set to "auto", the OS will be detected automatically.
   *
   * @default "auto"
   */
  os?: OperatingSystem | "auto";
  /**
   * Whether the key is currently (visually) highlighted.
   * When set to "auto", it is automatically highlighted when pressed.
   *
   * Key highlight state (for visual effect)
   *
   * @default false
   */
  highlighted?: boolean | "auto";
  /**
   * Whether to show a skeleton key.
   */
  skeleton?: SkeletonInjected;
};
