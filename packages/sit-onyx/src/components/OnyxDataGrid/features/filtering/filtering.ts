import searchX from "@sit-onyx/icons/search-x.svg?raw";
import { computed, h, ref, toValue, watchEffect, type Ref } from "vue";
import { createFeature, useIsFeatureEnabled } from "..";
import { injectI18n } from "../../../../i18n";
import type { Nullable } from "../../../../types";
import { removeDiacritics } from "../../../../utils/strings";
import OnyxMiniSearch from "../../../OnyxMiniSearch/OnyxMiniSearch.vue";
import type { OnyxMiniSearchProps } from "../../../OnyxMiniSearch/types";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
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
    const { isEnabled } = useIsFeatureEnabled(options);

    const filterData = (entries: Readonly<TEntry>[]) => {
      return entries.filter((entry) =>
        Object.entries(filters.value).every(
          ([column, value]: [keyof TEntry, string | undefined]) => {
            const columnOptions = config.value?.[column];
            const filterOptions = { ...options?.filterConfig, ...columnOptions?.config };

            if (value == null || value === "") return true;
            let searchTerm = value.toString();
            let entryValue = entry[column]?.toString() ?? "";
            if (filterOptions?.filterFunc) {
              return filterOptions.filterFunc(
                searchTerm,
                entryValue as TEntry[keyof TEntry],
                column,
                entry,
              );
            }
            entryValue = removeDiacritics(entryValue);
            searchTerm = removeDiacritics(searchTerm);
            if (!filterOptions.caseSensitive) {
              entryValue = entryValue.toLowerCase();
              searchTerm = searchTerm.toLowerCase();
            }
            if (filterOptions.searchFromStart) {
              return entryValue.startsWith(searchTerm);
            }
            if (filterOptions.exactMatch) {
              return entryValue === searchTerm;
            }

            return entryValue.includes(searchTerm);
          },
        ),
      );
    };

    const clearFilter = (column: keyof DataGridEntry) => {
      filters.value[column] = "";
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
        label: t.value("dataGrid.head.filtering.menu.label", { column: column.toString() }),
        class: "onyx-filter-search",
        placeholder: t.value(`dataGrid.head.filtering.menu.placeholder`),
        modelValue: inputValue,
        // TODO: check after https://github.com/SchwarzIT/onyx/issues/2982 is closed -- `autofocus` doesn't have an effect currently
        autofocus: true,
        "onUpdate:modelValue": (value?: Nullable<string>) => {
          inputValue = value || "";
        },
        onClear: () => {
          filters.value[column] = "";
          inputValue = "";
        },
        onChange: () => (filters.value[column] = inputValue),
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
          if (!isEnabled.value(column)) return [];
          return [
            {
              iconComponent: filters.value[column]
                ? {
                    iconComponent: h(OnyxSystemButton, {
                      label: t.value("dataGrid.head.filtering.removeLabel", {
                        column: column.toString(),
                      }),
                      icon: searchX,
                      color: "medium",
                      onClick: () => clearFilter(column),
                    }),
                    alwaysShowInHeader: true,
                  }
                : undefined,
              menuItems: [getMenuItem(column)],
              showFlyoutMenu: true,
            },
          ];
        },
      },
    };
  },
);
