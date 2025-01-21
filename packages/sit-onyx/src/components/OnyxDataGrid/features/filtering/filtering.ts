import searchX from "@sit-onyx/icons/search-x.svg?raw";
import { computed, h, ref, toValue } from "vue";
import { createFeature } from "..";
import { injectI18n } from "../../../../i18n";
import OnyxMiniSearch from "../../../OnyxMiniSearch/OnyxMiniSearch.vue";
import type { OnyxMiniSearchProps } from "../../../OnyxMiniSearch/types";
import OnyxSystemButton from "../../../OnyxSystemButton/OnyxSystemButton.vue";
import type { DataGridEntry } from "../../types";
import type { FilterOptions } from "./types";

//TODO: handleUpdate on closing Flyout
export const FILTERING_FEATURE = Symbol("Filtering");

export const useFiltering = createFeature(
  <TEntry extends DataGridEntry>(options?: FilterOptions<TEntry>) => {
    const filters = ref<Record<keyof TEntry, string>>({} as Record<keyof TEntry, string>);
    const { t } = injectI18n();
    const getFilterEnabled = computed(() => (col: keyof TEntry) => {
      const config = toValue(options?.columns);
      return !config || config?.[col]?.enabled === true;
    });

    const filterData = (data: Readonly<TEntry>[]) => {
      const filteredData = data.filter((entry) =>
        Object.entries(filters.value).every(([col, value]) =>
          entry[col as keyof TEntry]
            ?.toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        ),
      );
      return filteredData;
    };
    const handleClick = (column: keyof DataGridEntry) => {
      filters.value[column] = "";
    };

    const updateMode = ref(options?.updateMode || "onEnter");

    const getMenuItem = (column: keyof DataGridEntry) => {
      let inputValue = filters.value[column] || "";

      const handleUpdate = (value: string) => {
        if (updateMode.value === "onInput") {
          // Direkt bei jedem Input aktualisieren
          filters.value[column] = value;
        } else if (updateMode.value === "onEnter") {
          // Nur speichern, wenn Enter gedrückt wird
          inputValue = value; // Zwischenwert speichern
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (updateMode.value === "onEnter" && e.key === "Enter") {
          // Wert bei Enter-Taste aktualisieren
          filters.value[column] = inputValue;
        }
      };

      return h(OnyxMiniSearch, {
        label: column as string,
        style: {
          borderBottom: "var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral)",
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
