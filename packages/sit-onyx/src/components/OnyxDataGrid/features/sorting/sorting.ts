import circleBlock from "@sit-onyx/icons/circle-block.svg?raw";
import listArrowDown from "@sit-onyx/icons/list-arrow-down.svg?raw";
import listArrowUp from "@sit-onyx/icons/list-arrow-up.svg?raw";
import { computed, h, toRef, toValue, type Ref } from "vue";
import { createFeature, useFeatureContext } from "..";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxMenuItem from "../../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import type { DataGridEntry } from "../../types";
import SortAction from "./SortAction.vue";
import type { SortDirection, SortOptions, SortState } from "./types";

export const nextSortDirection = (current?: SortDirection, skipNone?: boolean): SortDirection => {
  switch (current) {
    case "asc":
      return "desc";
    case "desc":
      return skipNone ? "asc" : "none";
    case "none":
    default:
      return "asc";
  }
};

export const SORTING_FEATURE = Symbol("Sorting");
export const useSorting = <TEntry extends DataGridEntry>(options?: SortOptions<TEntry>) =>
  createFeature((ctx) => {
    const sortState: Ref<SortState<TEntry>> = toRef(
      options?.sortState ??
        ({
          column: undefined,
          direction: "none",
        } as const),
    );

    const { i18n } = ctx;
    const { isEnabled, isAsync } = useFeatureContext(ctx, options);

    const getSortFunc = computed(() => (col: keyof TEntry) => {
      const config = toValue(options?.columns);
      return config?.[col]?.sortFunc ?? intlCompare.value;
    });

    const intlCompare = computed(
      () => (a: unknown, b: unknown) =>
        new Intl.Collator(i18n.locale.value).compare(String(a), String(b)),
    );

    const handleClick = (clickedColumn: keyof TEntry, skipNone = false) => {
      const direction =
        sortState.value.column === clickedColumn
          ? nextSortDirection(sortState.value.direction, skipNone)
          : nextSortDirection(undefined, skipNone);
      const column = direction !== "none" ? clickedColumn : undefined;

      sortState.value = {
        direction,
        column,
      };
    };

    const sortData = (data: Readonly<TEntry>[]) => {
      const { column, direction } = sortState.value;
      if (isAsync.value || !column || direction === "none") {
        return data;
      }
      const multiplicand = direction === "asc" ? 1 : -1;
      const sortFunc = getSortFunc.value(column);
      data.sort((a, b) => sortFunc(a[column], b[column]) * multiplicand);
      return data;
    };

    const isSortActive = computed(() => {
      return (column: keyof DataGridEntry, direction: SortDirection) => {
        return sortState.value.column === column && sortState.value.direction === direction;
      };
    });

    const getMenuItem = (column: keyof DataGridEntry, direction: SortDirection) => {
      const iconMap = {
        none: circleBlock,
        asc: listArrowUp,
        desc: listArrowDown,
      } satisfies Record<SortDirection, string>;

      return h(
        OnyxMenuItem,
        {
          active: isSortActive.value(column, direction),
          onClick: () => (sortState.value = { column, direction }),
        },
        () => [
          h(OnyxIcon, { icon: iconMap[direction] }),
          i18n.t.value(`dataGrid.head.sorting.menu.${direction}`),
        ],
      );
    };

    return {
      name: SORTING_FEATURE,
      watch: [sortState, intlCompare],
      mutation: {
        func: sortData,
      },
      header: {
        actions: ({ key: column, label }) => {
          if (!isEnabled.value(column)) return [];
          return [
            {
              iconComponent: h(SortAction, {
                columnLabel: label,
                sortDirection:
                  sortState.value.column === column ? sortState.value.direction : undefined,
                onClick: () => handleClick(column),
              }),
              menuItems: [
                getMenuItem(column, "none"),
                getMenuItem(column, "asc"),
                getMenuItem(column, "desc"),
              ],
            },
            sortState.value.column === column &&
            sortState.value.direction &&
            sortState.value.direction !== "none"
              ? {
                  iconComponent: {
                    iconComponent: h(SortAction, {
                      columnLabel: label,
                      sortDirection:
                        sortState.value.column === column ? sortState.value.direction : undefined,
                      onClick: () => handleClick(column, true),
                    }),
                    alwaysShowInHeader: true,
                  },
                }
              : null,
          ].filter((item) => item !== null);
        },
      },
    };
  });
