import { computed, h, ref, toValue, watchEffect, type Ref } from "vue";
import { createFeature } from "..";
import { injectI18n } from "../../../../i18n";
import { normalizedIncludes } from "../../../../utils/strings";
import OnyxMiniSearch from "../../../OnyxMiniSearch/OnyxMiniSearch.vue";
import type { OnyxMiniSearchProps } from "../../../OnyxMiniSearch/types";
import type { DataGridEntry } from "../../types";
import "./filtering.scss";
import type { FilterOptions } from "./types";

export const FILTERING_FEATURE = Symbol("Filtering");
export type FilterState<TEntry> = Partial<Record<keyof TEntry, string | undefined>>;
export const useFiltering = createFeature(
  <TEntry extends DataGridEntry>(options?: FilterOptions<TEntry>) => {
    const filters = ref({}) as Ref<FilterState<DataGridEntry>>;
    const { t } = injectI18n();
    const config = computed(() => toValue(options?.columns));

    const isFilterEnabled = computed(() => (col: keyof TEntry) => {
      return config.value?.[col]?.enabled !== false;
    });

    const filterData = (entries: Readonly<TEntry>[]) => {
      return entries.filter((entry) =>
        Object.entries(filters.value).every(([column, value]: [keyof TEntry, unknown]) => {
          const columnOptions = config.value?.[column];
          const filterOptions = { ...options?.filterConfig, ...columnOptions?.config };

          if (columnOptions?.filterFunc) {
            return columnOptions.filterFunc(entry[column], value as TEntry[keyof TEntry]);
          }
          if (value == null) return true;
          const searchTerm = value.toString();
          let entryValue = entry[column]?.toString() ?? "";

          if (filterOptions.trimWhitespace) {
            entryValue = entryValue.replace(/\s+/g, "");
          }

          if (filterOptions.exactMatch) {
            return entryValue === searchTerm;
          }

          return filterOptions.searchFromStart
            ? entryValue.startsWith(searchTerm)
            : normalizedIncludes(entryValue, searchTerm, !filterOptions.caseSensitive);
        }),
      );
    };

    // sync filters with user provided config
    watchEffect(() => {
      if (!config.value) return;
      Object.entries(config.value).forEach(([column, columnOptions]) => {
        if (columnOptions?.searchTerm) {
          filters.value[column] = columnOptions.searchTerm;
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
        label: column.toString(),
        class: "onyx-filter-search",
        placeholder: t.value(`dataGrid.head.filtering.menu.placeholder`),
        modelValue: inputValue,
        autofocus: true,
        "onUpdate:modelValue": (value: string) => {
          inputValue = value;
        },
        onClear: () => {
          filters.value[column] = "";
          inputValue = "";
        },
        onKeydown: handleKeyDown,
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
        },
      } satisfies OnyxMiniSearchProps & Record<string, unknown>);
    };

    return {
      name: FILTERING_FEATURE,
      watch: [filters, config],
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
      },
    };
  },
);
