import type { OperatingSystem } from "../../composables/useOperatingSystem.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { ShortcutStep } from "../../utils/keyboard.js";

export type ShortcutSequenceStep = ShortcutStep & {
  /**
   * Whether to hide the separator (`/` or `+`) used to concatenate keys in this step.
   * Useful when you e.g. want to display `↑↓` instead of `↑/↓`.
   */
  hideSeparator?: boolean;
};

export type OnyxShortcutProps = {
  /**
   * Sequence of shortcut steps.
   *
   * @example `[{ all: ["Control", "C"] }, { any: ["V", "Insert"] }]`
   */
  sequence: ShortcutSequenceStep[];
  /**
   * Which operating system to use for displaying the key.
   * When set to "auto", the OS will be detected automatically.
   */
  os?: OperatingSystem | "auto";
  /**
   * Whether to (visually) highlight pressed keys.
   *
   * @default false
   */
  highlight?: boolean;
  /**
   * Whether to show a skeleton shortcut.
   */
  skeleton?: SkeletonInjected;
  /**
   * Delay in milliseconds before cleaning up the pressed keys after inactivity.
   *
   * @default 5000
   */
  cleanupDelay?: number;
  /**
   * Element on which to listen for the shortcut events.
   * If not provided, the events are listened on the global window object.
   */
  element?: HTMLElement;
  /**
   * Whether the shortcut handling is disabled.
   */
  disabled?: boolean;
  /**
   * Whether to listen to repeated keydown events.
   *
   * @default false
   */
  listenOnRepeat?: boolean;
};
