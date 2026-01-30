import type { OperatingSystem } from "../../composables/useOperatingSystem.js";
import type { ShortcutEventTarget } from "../../composables/useShortcut.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { ShortcutStep } from "../../utils/shortcut.js";

export type OnyxShortcutProps = {
  /**
   * Sequence of shortcut steps.
   *
   * @example
   * [{ all: ["Control", "C"] }, { any: ["V", "Insert"] }]
   */
  sequence: (ShortcutStep & {
    /**
     * If `true`, the separator (`/` or `+`) used to concatenate keys in this step is hidden.
     * Could be useful in you have such sequence:
     *
     * `[{ any: ["ArrowDown", "ArrowUp"], separatorHidden: true }]`.
     *
     * So that it will render as `↑↓` instead of `↑/↓`.
     *
     * @default false
     */
    separatorHidden?: boolean;
  })[];
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
   * Targets on which to call `event.preventDefault()` during keydown event.
   *
   * - `sequenceComplete` - prevent default when the full sequence is completed.
   * - `stepComplete` - prevent default when step is completed.
   * - `keydown` - prevent default on every keydown event.
   * - `none` - do not prevent default on any event.
   *
   * @default "stepComplete"
   */
  preventDefaultOn?: ShortcutEventTarget;
  /**
   * Targets on which to call `event.stopPropagation()` during keydown event.
   *
   * - `sequenceComplete` - stop propagation when the full sequence is completed.
   * - `stepComplete` - stop propagation when step is completed.
   * - `keydown` - stop propagation on every keydown event.
   * - `none` - do not stop propagation on any event.
   *
   * @default "stepComplete"
   */
  stopPropagationOn?: ShortcutEventTarget;
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
