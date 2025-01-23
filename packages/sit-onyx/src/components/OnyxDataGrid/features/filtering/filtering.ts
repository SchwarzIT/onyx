import searchX from "@sit-onyx/icons/search-x.svg?raw";
import { computed, h, ref, toValue, watch } from "vue";
import { createFeature } from "..";
import { injectI18n } from "../../../../i18n";
import OnyxMiniSearch from "../../../OnyxMiniSearch/OnyxMiniSearch.vue";
import type { OnyxMiniSearchProps } from "../../../OnyxMiniSearch/types";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import type { DataGridEntry } from "../../types";
import type { FilterColumnOptions, FilterOptions } from "./types";

export const FILTERING_FEATURE = Symbol("Filtering");

export const useFiltering = createFeature(
  <TEntry extends DataGridEntry>(options?: FilterOptions<TEntry>) => {
    const filters = ref<Record<keyof TEntry, string>>({} as Record<keyof TEntry, string>);
    const { t } = injectI18n();
    const config = toValue(options?.columns);

    const getFilterEnabled = computed(() => (col: keyof TEntry) => {
      return !config || config?.[col]?.enabled === true;
    });

    const filterData = (data: Readonly<TEntry>[]) => {
      const filteredData = data.filter((entry) =>
        Object.entries(filters.value).every(([col, value]) => {
          const columnOptions = config?.[col as keyof TEntry];
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

    const handleClick = (column: keyof DataGridEntry) => {
      filters.value[column] = "";
    };

    const updateFilter = (config: FilterColumnOptions<TEntry> | undefined) => {
      if (config) {
        Object.entries(config).forEach(([col, columnOptions]) => {
          if (columnOptions?.filter) {
            filters.value[col as keyof TEntry] = columnOptions.filter;
          }
        });
      }
    };
    updateFilter(config);
    watch(
      () => toValue(options?.columns),
      (newConfig) => {
        updateFilter(toValue(newConfig));
      },
    );

    const getMenuItem = (column: keyof DataGridEntry) => {
      //TODO: Bug can't enter spacings
      //TODO: Set Filter on Flyout closing
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
          minWidth: `${t.value(`dataGrid.head.filtering.menu.placeholder`).length * 12 + 20}px`,
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
          if (!getFilterEnabled.value(column)) return [];
          return [
            {
              menuItems: [getMenuItem(column)],
            },
          ];
        },
        removeActions: (column) => {
          if (!getFilterEnabled.value(column) || !filters.value[column]) return [];
          return [
            {
              iconComponent: h(OnyxSystemButton, {
                label: String(column),
                icon: searchX,
                color: "medium",
                onClick: () => handleClick(column),
              }),
            },
          ];
        },
      },
    };
  },
);
