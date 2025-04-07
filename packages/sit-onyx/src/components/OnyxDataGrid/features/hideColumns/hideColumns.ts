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

    const hiddenColumns = ref([]) as Ref<(keyof TEntry)[]>;
    const revealedHiddenColumns = ref([]) as Ref<(keyof TEntry)[]>;
    watchEffect(() => {
      // sync hidden columns with user provided options
      hiddenColumns.value = Object.entries(unref(options?.columns) ?? {})
        .filter(([_, value]) => value?.hidden)
        .map(([key]) => key);
    });

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
            return hiddenColumns.value
              .slice()
              .sort()
              .map((column) =>
                h(
                  OnyxMenuItem,
                  {
                    onClick: () => {
                      if (!revealedHiddenColumns.value.includes(column)) {
                        revealedHiddenColumns.value.push(column);
                      }

                      hiddenColumns.value = hiddenColumns.value.filter(
                        (hiddenColumn) => hiddenColumn !== column,
                      );
                    },
                  },
                  () => [column],
                ),
              );
          },
        } satisfies ComponentSlots<typeof OnyxFlyoutMenu>,
      );

    const getMenuItem = (column: keyof TEntry) =>
      h(
        OnyxMenuItem,
        {
          onClick: () => {
            if (hiddenColumns.value.includes(column)) return;
            hiddenColumns.value.push(column);
            revealedHiddenColumns.value = revealedHiddenColumns.value.filter(
              (revealColumn) => revealColumn !== column,
            );
          },
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
            (column) => !hiddenColumns.value.includes(column.key),
          );

          filteredColumns.sort((a, b) => {
            const indexA = revealedHiddenColumns.value.indexOf(a.key);
            const indexB = revealedHiddenColumns.value.indexOf(b.key);
            return indexA - indexB;
          });

          return hiddenColumns.value.length > 0
            ? [...filteredColumns, { key: HIDDEN_COLUMN, type: HIDDEN_COLUMN, width: "2.5rem", label: "" }]
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
