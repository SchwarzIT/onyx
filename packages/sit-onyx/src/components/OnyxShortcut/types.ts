import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { ShortcutStep } from "../../utils/keyboard.js";
import type { OnyxKeyProps } from "../OnyxKey/types.js";

export type ShortcutSequenceStep = ShortcutStep & {
  /**
   * Whether to hide the separator (`/` or `+`) used to concatenate keys in this step.
   * Useful when you e.g. want to display `↑↓` instead of `↑/↓`.
   */
  hideSeparator?: boolean;
};

export type OnyxShortcutProps = Pick<OnyxKeyProps, "highlight" | "os"> & {
  /**
   * Sequence of shortcut steps.
   *
   * @example `[{ all: ["Control", "C"] }, { any: ["V", "Insert"] }]`
   */
  sequence: ShortcutSequenceStep[];
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
};
