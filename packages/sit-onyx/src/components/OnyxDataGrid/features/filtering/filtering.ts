import searchX from "@sit-onyx/icons/search-x.svg?raw";
import { computed, h, toRef, toValue, type Ref } from "vue";
import { createFeature, useFeatureContext } from "..";
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
export const useFiltering = <TEntry extends DataGridEntry>(options?: FilterOptions<TEntry>) =>
  createFeature((ctx) => {
    const { i18n } = ctx;
    const filterState = toRef(options?.filterState ?? {}) as Ref<FilterState<DataGridEntry>>;
    const config = computed(() => toValue(options?.columns));
    const { isEnabled, isAsync } = useFeatureContext(ctx, options);

    const filterData = (entries: Readonly<TEntry>[]) => {
      if (isAsync.value) {
        return entries;
      }
      return entries.filter((entry) =>
        Object.entries(filterState.value).every(
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
      filterState.value[column] = "";
    };

    const getMenuItem = (column: keyof DataGridEntry) => {
      let inputValue = filterState.value[column] || "";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          filterState.value[column] = inputValue;
        }
      };

      return h(OnyxMiniSearch, {
        label: i18n.t.value("dataGrid.head.filtering.menu.label", { column: column.toString() }),
        class: "onyx-filter-search",
        placeholder: i18n.t.value(`dataGrid.head.filtering.menu.placeholder`),
        modelValue: inputValue,
        // TODO: check after https://github.com/SchwarzIT/onyx/issues/2982 is closed -- `autofocus` doesn't have an effect currently
        autofocus: true,
        "onUpdate:modelValue": (value?: Nullable<string>) => {
          inputValue = value || "";
        },
        onClear: () => {
          filterState.value[column] = "";
          inputValue = "";
        },
        onChange: () => (filterState.value[column] = inputValue),
        onKeydown: handleKeyDown,
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
        },
      } satisfies OnyxMiniSearchProps & Record<string, unknown>);
    };

    return {
      name: FILTERING_FEATURE,
      watch: [filterState, config],
      mutation: {
        func: filterData,
      },
      header: {
        actions: ({ key: column }) => {
          if (!isEnabled.value(column)) return [];
          return [
            {
              iconComponent: filterState.value[column]
                ? {
                    iconComponent: h(OnyxSystemButton, {
                      label: i18n.t.value("dataGrid.head.filtering.removeLabel", {
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
  });
