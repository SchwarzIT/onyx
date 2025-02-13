import searchX from "@sit-onyx/icons/search-x.svg?raw";
import {
  computed,
  h,
  ref,
  toValue,
  watchEffect,
  type Component,
  type VNode,
  type WatchSource,
} from "vue";
import { createFeature } from "..";
import { injectI18n } from "../../../../i18n";
import OnyxMiniSearch from "../../../OnyxMiniSearch/OnyxMiniSearch.vue";
import type { OnyxMiniSearchProps } from "../../../OnyxMiniSearch/types";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import type { DataGridEntry } from "../../types";
import type { FilterOptions } from "./types";

interface FilteringFeature<TEntry extends DataGridEntry> {
  name: symbol;
  watch: WatchSource<unknown>[];
  mutation: {
    func: (data: Readonly<TEntry>[]) => TEntry[];
  };
  header: {
    actions: (params: { key: keyof TEntry }) => Array<{
      menuItems: (Component | VNode)[];
    }>;
    removeActions: (params: {
      key: keyof TEntry;
    }) => Array<{ iconComponent: ReturnType<typeof h> }>;
  };
}

export const FILTERING_FEATURE = Symbol("Filtering");

export const useFiltering = createFeature(
  <TEntry extends DataGridEntry>(options?: FilterOptions<TEntry>): FilteringFeature<TEntry> => {
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
      let inputValue = filters.value[column] || "";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
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
        "onUpdate:modelValue": (value: string) => {
          inputValue = value;
        },
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
        actions: ({ key: column }) => {
          if (!isFilterEnabled.value(column)) return [];
          return [
            {
              menuItems: [getMenuItem(column)],
            },
          ];
        },
        removeActions: ({ key: column }) => {
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
