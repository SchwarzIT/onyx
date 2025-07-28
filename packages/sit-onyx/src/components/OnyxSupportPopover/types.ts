import type { Nullable } from "../../types/index.js";

export type OnyxSupportPopoverProps = {
  /**
   * Aria label of the popover. Should indicate what the popover is used for.
   */
  label: string;
  /**
   * How to position the popover relative to the trigger element.
   *
   * - when defining two values: place the element exactly in the specific grid square
   * - when defining row/column value + span: place the element in the specific row/column and spans the amount of columns defined by span
   *    - span-left: left and center area
   *    - span-x-end: center and right area
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using#setting_a_position-area
   * @see Position guide: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using#setting_a_position-area
   */
  position?: PopoverPosition;
  /**
   * Whether the popover is open/visible.
   * If unset, the open state is managed internally.
   */
  open?: Nullable<boolean>;
};

type PositionAreaRow = "top" | "center" | "bottom";
type PositionAreaRowSpan = "span-left" | "span-x-end" | "span-all";

type PositionAreaColumn = "left" | "center" | "right";
type PositionAreaColumnSpan = "span-top" | "span-bottom" | "span-all";

export type PopoverPosition =
  | `${PositionAreaRow} ${PositionAreaColumn}`
  | `${PositionAreaRow} ${PositionAreaRowSpan}`
  | `${PositionAreaColumn} ${PositionAreaColumnSpan}`;
