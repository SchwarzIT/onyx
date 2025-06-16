import eyeDisabled from "@sit-onyx/icons/eye-disabled.svg?raw";
import plusSmall from "@sit-onyx/icons/plus-small.svg?raw";
import { computed, h, ref, unref, watchEffect, type Ref } from "vue";
import type { ComponentSlots } from "vue-component-type-helpers";
import {
  createFeature,
  useIsFeatureEnabled,
  type InternalColumnConfig,
  type ModifyColumns,
} from "..";
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

    const columnConfig = ref([]) as Ref<Readonly<InternalColumnConfig<TEntry>[]>>;
    const hiddenColumnKeys = ref(new Set()) as Ref<Set<keyof TEntry>>;
    const hiddenColumns = computed(() =>
      columnConfig.value.filter((c) => hiddenColumnKeys.value.has(c.key)),
    );

    watchEffect(() => {
      // sync hidden columns with user provided options
      Object.entries(unref(options?.columns) ?? {}).forEach(([key, value]) => {
        if (value?.hidden) {
          hiddenColumnKeys.value.add(key);
        } else {
          hiddenColumnKeys.value.delete(key);
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
          alignment: "right",
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
              .sort((a, b) => Intl.Collator(locale.value).compare(a.label, b.label))
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
          h(OnyxIcon, { icon: eyeDisabled }),
          t.value("dataGrid.head.hideColumns.menu.hideButton"),
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
            return newConfig as InternalColumnConfig<TEntry>[];
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
                  { key: HIDDEN_COLUMN, type: { name: HIDDEN_COLUMN }, width: "2.5rem", label: "" },
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
  },
);
