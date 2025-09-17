import { iconEyeDisabled, iconPlusSmall } from "@sit-onyx/icons";
import { computed, h, ref, toRef, type Ref } from "vue";
import type { ComponentSlots } from "vue-component-type-helpers";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxFlyoutMenu from "../../../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import type { DataGridEntry } from "../../types.js";
import {
  createFeature,
  useFeatureContext,
  type InternalColumnConfig,
  type ModifyColumns,
} from "../index.js";
import "./hideColumns.scss";
import type { HideColumnsOptions, HideColumnsState } from "./types.js";

export const HIDE_COLUMNS_FEATURE = Symbol("HideColumnsFeature");
export const HIDDEN_COLUMN = Symbol("HiddenColumn");

export const useHideColumns = <TEntry extends DataGridEntry>(
  options?: HideColumnsOptions<TEntry>,
) =>
  createFeature((ctx) => {
    const { i18n } = ctx;
    const { isEnabled } = useFeatureContext(ctx, options);

    const columnConfig = ref([]) as Ref<Readonly<InternalColumnConfig<TEntry>[]>>;
    const hiddenColumnKeys: Ref<HideColumnsState<TEntry>> = toRef(options?.state ?? new Set());
    const hiddenColumns = computed(() =>
      columnConfig.value.filter((c) => hiddenColumnKeys.value.has(c.key)),
    );

    const flyoutMenu = () =>
      h(
        OnyxFlyoutMenu,
        {
          label: i18n.t.value("dataGrid.head.hideColumns.revealFlyout"),
          trigger: "click",
          alignment: "right",
        },
        {
          button: ({ trigger }) =>
            h(OnyxSystemButton, {
              class: "",
              label: i18n.t.value("dataGrid.head.hideColumns.revealTrigger"),
              color: "medium",
              icon: iconPlusSmall,
              ...trigger,
            }),
          options: () => {
            return Array.from(hiddenColumns.value)
              .sort((a, b) => Intl.Collator(i18n.locale.value).compare(a.label, b.label))
              .map(({ key, label }) =>
                h(
                  OnyxMenuItem,
                  {
                    onClick: () => hiddenColumnKeys.value.delete(key),
                  },
                  () => label,
                ),
              );
          },
        } satisfies ComponentSlots<typeof OnyxFlyoutMenu>,
      );

    const getMenuItem = (column: keyof TEntry) =>
      h(
        OnyxMenuItem,
        {
          onClick: () => hiddenColumnKeys.value.add(column),
        },
        () => [
          h(OnyxIcon, { icon: iconEyeDisabled }),
          i18n.t.value("dataGrid.head.hideColumns.menu.hideButton"),
        ],
      );

    return {
      name: HIDE_COLUMNS_FEATURE,
      watch: [hiddenColumnKeys],
      modifyColumns: [
        {
          order: 9000,
          /**
           * Store the current column configuration for later reference
           */
          func: (newConfig) => {
            columnConfig.value = newConfig;
            return newConfig;
          },
        },
        {
          order: 9001,
          func: (columnConfig) => {
            const filteredColumns = columnConfig.filter(
              (column) => !hiddenColumnKeys.value.has(column.key),
            );

            return hiddenColumnKeys.value.size > 0
              ? [
                  ...filteredColumns,
                  {
                    key: HIDDEN_COLUMN,
                    type: { name: HIDDEN_COLUMN },
                    width: "2.5rem",
                    label: "",
                  },
                ]
              : filteredColumns;
          },
        },
      ] satisfies ModifyColumns<TEntry>[],
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
  });
