import eyeDisabled from "@sit-onyx/icons/eye-disabled.svg?raw";
import plusSmall from "@sit-onyx/icons/plus-small.svg?raw";
import { h, toRef } from "vue";
import type { ComponentSlots } from "vue-component-type-helpers";
import { createFeature, type ModifyColumns } from "..";
import { injectI18n } from "../../../../i18n";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxFlyoutMenu from "../../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import type { DataGridEntry } from "../../types";
import "./hideColumns.scss";
import type { HideColumnsOptions } from "./types";

export const HIDECOLUMNS_FEATURE = Symbol("HideColumnsFeature");
export const HIDDEN_COLUMN = Symbol("HiddenColumn");

export const useHideColumns = createFeature(
  <TEntry extends DataGridEntry>(options?: HideColumnsOptions) => {
    const { t } = injectI18n();
    const hiddenColumns = toRef(options?.columns ?? []);

    const flyoutMenu = h(
      OnyxFlyoutMenu,
      {
        label: t.value("dataGrid.head.hideColumns.revealFlyout"),
        trigger: "click",
      },
      {
        button: ({ trigger }) =>
          h(OnyxSystemButton, {
            class: "",
            label: t.value("dataGrid.head.hideColumns.revealTrigger"),
            color: "medium",
            icon: plusSmall,
            ...trigger,
          }),
        options: () => {
          return hiddenColumns.value
            .filter((col) => col.hidden)
            .map((column) =>
              h(
                OnyxMenuItem,
                {
                  onClick: () => {
                    hiddenColumns.value = hiddenColumns.value.map((col) =>
                      col.name === column.name ? { ...col, hidden: false } : col,
                    );
                  },
                },
                () => [column.name],
              ),
            );
        },
      } satisfies ComponentSlots<typeof OnyxFlyoutMenu>,
    );

    const getMenuItem = (column: keyof DataGridEntry) =>
      h(
        OnyxMenuItem,
        {
          onClick: () => {
            hiddenColumns.value = hiddenColumns.value.map((col) =>
              col.name === column.toString() ? { ...col, hidden: true } : col,
            );
          },
        },
        () => [
          h(OnyxIcon, { icon: eyeDisabled }),
          t.value("dataGrid.head.hideColumns.menu.hideButton"),
        ],
      );

    return {
      name: HIDECOLUMNS_FEATURE,
      watch: [hiddenColumns],
      modifyColumns: {
        func: (columnConfig) => {
          if (hiddenColumns.value.length === 0) {
            hiddenColumns.value = columnConfig.map((col) => ({
              name: String(col.key),
              hidden: false,
            }));
          }
          const filteredColumns = columnConfig.filter(
            (col) =>
              !hiddenColumns.value.some(
                (hiddenCol) => hiddenCol.hidden && hiddenCol.name === col.key,
              ),
          );
          return hiddenColumns.value.some((col) => col.hidden)
            ? [...filteredColumns, { key: HIDDEN_COLUMN, type: HIDDEN_COLUMN }]
            : filteredColumns;
        },
      } satisfies ModifyColumns<TEntry>,

      typeRenderer: {
        [HIDDEN_COLUMN]: {
          header: {
            thAttributes: { class: "onyx-data-grid-hide-columns-cell" },
            component: () => flyoutMenu,
          },
          cell: {
            component: () => null,
          },
        },
      },
      header: {
        actions: ({ key: column }) => {
          if (!hiddenColumns.value.some((col) => col.name === String(column))) return [];
          return [
            {
              menuItems: [getMenuItem(column)],
              showFlyoutMenu: true,
            },
          ];
        },
      },
    };
  },
);
