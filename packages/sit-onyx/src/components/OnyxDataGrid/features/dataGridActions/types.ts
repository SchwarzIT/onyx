import type { MoreListInjectionKey } from "../../../../composables/useMoreList.js";
import type { OnyxButtonProps } from "../../../OnyxButton/types.js";
import type { OnyxIconButtonProps } from "../../../OnyxIconButton/types.js";

export type DataGridAction = DataGridActionButton | DataGridActionIconButton;

export type DataGridActionBase = {
  /**
   * Label that describes the action.
   */
  label: string;
  /**
   * The group this action belongs to.
   * Actions with the same group name will be visually separated from other groups.
   */
  group?: string | DataGridActionGroup;
  /**
   * Order inside the group when multiple actions are used (sorted from lowest to highest).
   * @default 0
   */
  order?: number;
  /**
   * Callback function to execute when the action is clicked.
   */
  onClick?: () => void;
};

type DataGridActionButton = DataGridActionBase &
  Omit<OnyxButtonProps, "label"> & {
    displayAs: "button";
  };

type DataGridActionIconButton = DataGridActionBase &
  Omit<OnyxIconButtonProps, "label"> & {
    displayAs?: "iconButton";
    /**
     * Icon to display.
     */
    icon: string;
  };

export type DataGridActionGroup = {
  /**
   * Unique identifier/name of the group.
   */
  name: string;
  /**
   * Order of the entire group when multiple groups are used (sorted from lowest to highest).
   * @default 0
   */
  order: number;
};

export const DATA_GRID_ACTIONS_INJECTION_KEY = Symbol() as MoreListInjectionKey;
