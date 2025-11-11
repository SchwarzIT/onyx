import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { OperatingSystem } from "../../types/index.js";
import type { ShortcutStep } from "../../utils/shortcut.js";

export type OnyxShortcutProps = {
  /**
   * Sequence of shortcut steps.
   *
   * @example
   * [{ all: ["ctrl", "c"] }, { any: ["v", "insert"] }]
   */
  sequence: ShortcutStep[];
  /**
   * Operating system variant for key rendering.
   *
   * - `auto` (default): detect OS from user agent.
   * - `macos`: use macOS-style keys.
   * - `windows`: use Windows-style keys.
   * - `general`: use general key styles.
   */
  variant?: OperatingSystem | "auto";
  /**
   * If `true`, pressed keys in the sequence are visually highlighted.
   *
   * @default false
   */
  highlightPressed?: boolean;
  /**
   * Whether to show a skeleton shortcut.
   */
  skeleton?: SkeletonInjected;
};
