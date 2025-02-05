import searchX from "@sit-onyx/icons/search-x.svg?raw";
import { computed, h, ref, toValue, watchEffect } from "vue";
import { createFeature } from "..";
import { injectI18n } from "../../../../i18n";
import OnyxMiniSearch from "../../../OnyxMiniSearch/OnyxMiniSearch.vue";
import type { OnyxMiniSearchProps } from "../../../OnyxMiniSearch/types";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import type { DataGridEntry } from "../../types";
import type { FilterOptions } from "./types";

export const FILTERING_FEATURE = Symbol("Filtering");

export const useFiltering = createFeature(
  <TEntry extends DataGridEntry>(options?: FilterOptions<TEntry>) => {
    const filters = ref<Partial<Record<keyof TEntry, string>>>({});
    const { t } = injectI18n();
    const config = computed(() => toValue(options?.columns));

    const isFilterEnabled = computed(() => (col: keyof TEntry) => {
      return !config.value || config.value?.[col]?.enabled === true;
    });

    const filterData = (data: Readonly<TEntry>[]) => {
      const filteredData = data.filter((entry) =>
        Object.entries(filters.value).every(([col, value]) => {
          const columnOptions = config.value?.[col as keyof TEntry];
          const filterOpts = {
            ...options?.filterConfig,
            ...columnOptions?.filterConfig,
          };

          if (columnOptions?.filterFunc) {
            return columnOptions.filterFunc(
              entry[col as keyof TEntry],
              value as TEntry[keyof TEntry],
            );
          }
          let filterValue = value as string;
          let entryValue = entry[col as keyof TEntry]?.toString() || "";

          if (filterOpts?.trimWhitespace) {
            entryValue = entryValue.replace(/\s+/g, "");
          }

          if (!filterOpts?.caseSensitive) {
            entryValue = entryValue.toLowerCase();
            filterValue = filterValue.toLowerCase();
          }

          if (filterOpts?.exactMatch) {
            return entryValue === filterValue;
          }

          return filterOpts?.searchFromStart
            ? entryValue.startsWith(filterValue)
            : entryValue.includes(filterValue);
        }),
      );
      return filteredData;
    };

    const clearFilter = (column: keyof DataGridEntry) => {
      filters.value[column] = "";
    };

    // sync filters with user provided config
    watchEffect(() => {
      if (!config.value) return;
      Object.entries(config.value).forEach(([column, columnOptions]) => {
        if (columnOptions?.filter) {
          filters.value[column] = columnOptions.filter;
        }
      });
    });

    const getMenuItem = (column: keyof DataGridEntry) => {
      const updateMode = ref(options?.updateMode || "onEnter");

      let inputValue = filters.value[column] || "";

      const handleUpdate = (value: string) => {
        if (updateMode.value === "onInput") {
          filters.value[column] = value;
        } else if (updateMode.value === "onEnter") {
          inputValue = value;
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (updateMode.value === "onEnter" && e.key === "Enter") {
          filters.value[column] = inputValue;
        }
      };

      return h(OnyxMiniSearch, {
        label: column as string,
        class: "onyx-filter-search",
        style: {
          minWidth: "11rem",
        },
        hideLabel: true,
        placeholder: t.value(`dataGrid.head.filtering.menu.placeholder`),
        modelValue: inputValue,
        autofocus: true,
        "onUpdate:modelValue": handleUpdate,
        onKeydown: handleKeyDown,
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
        },
      } as OnyxMiniSearchProps);
    };

    return {
      name: FILTERING_FEATURE,
      watch: [filters],
      mutation: {
        func: filterData,
      },
      header: {
        actions: (column) => {
          if (!isFilterEnabled.value(column)) return [];
          return [
            {
              menuItems: [getMenuItem(column)],
            },
          ];
        },
        removeActions: (column) => {
          if (!isFilterEnabled.value(column) || !filters.value[column]) return [];
          return [
            {
              iconComponent: h(OnyxSystemButton, {
                label: String(column),
                icon: searchX,
                color: "medium",
                onClick: () => clearFilter(column),
              }),
            },
          ];
        },
      },
    };
  },
);
