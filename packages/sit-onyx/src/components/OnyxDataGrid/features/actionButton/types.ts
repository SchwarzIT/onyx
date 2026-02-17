import type { MoreListInjectionKey } from "../../../../composables/useMoreList.js";
import type { OnyxButtonProps } from "../../../OnyxButton/types.js";
import type { OnyxIconButtonProps } from "../../../OnyxIconButton/types.js";
import type { ColumnConfig } from "../index.js";

export type ActionsBase = {
  /**
   * label for the action.
   */
  label: string;
  /**
   * The group this action belongs to.
   * Actions with the same group name will be visually separated from other groups.
   */
  group?: ActionGroup;
  /**
   * order inside the group.
   * @default 0
   */
  order?: number;
  /**
   * callback function to execute when the action is clicked.
   * @param config
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: add proper Types
  onClick: (config: ColumnConfig<any, any, any>[]) => void;
};

export type ActionProps = ActionsButton | ActionsIconButton;

type ActionsButton = ActionsBase &
  Omit<OnyxButtonProps, "label"> & {
    displayAs: "button";
  };

type ActionsIconButton = ActionsBase &
  Omit<OnyxIconButtonProps, "label"> & {
    displayAs?: "iconButton";
    /**
     * Icon for the iconButton.
     */
    icon: string;
  };

export type ActionGroup =
  /**
   * Unique identifier/name of the group.
   */
  | string
  | {
      /**
       * Unique identifier/name of the group.
       */
      name: string;
      /**
       * Order of the entire group.
       * @default 0
       */
      order: number;
    };

export const DATA_GRID_ACTIONS_INJECTION_KEY = Symbol() as MoreListInjectionKey;
