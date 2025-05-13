import eyeDisabled from "@sit-onyx/icons/eye-disabled.svg?raw";
import plusSmall from "@sit-onyx/icons/plus-small.svg?raw";
import { h, ref, unref, watchEffect, type Ref } from "vue";
import type { ComponentSlots } from "vue-component-type-helpers";
import { createFeature, useIsFeatureEnabled, type ModifyColumns } from "..";
import { injectI18n } from "../../../../i18n";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxFlyoutMenu from "../../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import type { DataGridEntry } from "../../types";
import "./hideColumns.scss";
import type { HideColumnsOptions } from "./types";

export const HIDE_COLUMNS_FEATURE = Symbol("HideColumnsFeature");
export const HIDDEN_COLUMN = Symbol("HiddenColumn");

export const useHideColumns = createFeature(
  <TEntry extends DataGridEntry>(options?: HideColumnsOptions<TEntry>) => {
    const { t } = injectI18n();
    const { isEnabled } = useIsFeatureEnabled(options);

    const hiddenColumns = ref(new Set()) as Ref<Set<keyof TEntry>>;

    watchEffect(() => {
      // sync hidden columns with user provided options
      Object.entries(unref(options?.columns) ?? {}).forEach(([key, value]) => {
        if (value?.hidden) {
          hiddenColumns.value.add(key);
        } else {
          hiddenColumns.value.delete(key);
        }
      });
    });

    const locale = injectI18n().locale;

    const flyoutMenu = () =>
      h(
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
            return Array.from(hiddenColumns.value)
              .sort(
                Intl.Collator(locale.value).compare as (a: keyof TEntry, b: keyof TEntry) => number,
              )
              .map((column) =>
                h(
                  OnyxMenuItem,
                  {
                    onClick: () => {
                      hiddenColumns.value.delete(column);
                    },
                  },
                  () => column,
                ),
              );
          },
        } satisfies ComponentSlots<typeof OnyxFlyoutMenu>,
      );

    const getMenuItem = (column: keyof TEntry) =>
      h(
        OnyxMenuItem,
        {
          onClick: () => hiddenColumns.value.add(column),
        },
        () => [
          h(OnyxIcon, { icon: eyeDisabled }),
          t.value("dataGrid.head.hideColumns.menu.hideButton"),
        ],
      );

    return {
      name: HIDE_COLUMNS_FEATURE,
      watch: [hiddenColumns],
      modifyColumns: {
        func: (columnConfig) => {
          const filteredColumns = columnConfig.filter(
            (column) => !hiddenColumns.value.has(column.key),
          );

          return hiddenColumns.value.size > 0
            ? [
                ...filteredColumns,
                { key: HIDDEN_COLUMN, type: HIDDEN_COLUMN, width: "2.5rem", label: "" },
              ]
            : filteredColumns;
        },
      } satisfies ModifyColumns<TEntry>,

      typeRenderer: {
        [HIDDEN_COLUMN]: {
          header: {
            thAttributes: { class: "onyx-data-grid-hide-columns-cell" },
            component: flyoutMenu,
          },
          cell: {
            tdAttributes: { class: "onyx-data-grid-hide-columns-cell" },
            component: () => null,
          },
        },
      },
      header: {
        actions: ({ key: column }) => {
          if (!isEnabled.value(column)) return [];
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
