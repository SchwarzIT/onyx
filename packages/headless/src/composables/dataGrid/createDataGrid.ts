import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  toRef,
  toValue,
  useId,
  watch,
  type MaybeRefOrGetter,
  type Ref,
  type TableHTMLAttributes,
} from "vue";
import { createBuilder, createElRef, type VBindAttributes } from "../../utils/builder.js";
import { wasKeyPressed } from "../../utils/keyboard.js";
import type { Nullable } from "../../utils/types.js";
import { useAllSettled } from "../helpers/useAllSettled.js";
import { useLastSettled } from "../helpers/useLastSettled.js";

const COL_KEY_DATA_ATTR = "data-onyx-col-key";
const COL_INDEX_ARIA_ATTR = "aria-colindex";
const ROW_ID_DATA_ATTR = "data-onyx-row-id";
const ROW_INDEX_ARIA_ATTR = "aria-rowindex";

type IndexResolver = {
  mapCellToIndex: (cell: HTMLTableCellElement) => number;
  mapRowToIndex: (row: HTMLTableRowElement) => number;
  /**
   *
   * @param cellIndex
   * @param rowIndex
   * @param table
   * @returns
   */
  resolveCell: (
    cellIndex: number,
    rowIndex: number,
    table: HTMLTableElement,
  ) => Promise<Nullable<HTMLElement>>;
  getTotalRows: (table: HTMLTableElement) => number | "unknown";
  getTotalCols: (table: HTMLTableElement) => number | "unknown";
};

const StaticResolver: IndexResolver = {
  mapCellToIndex: (cell) => Array.from(cell.closest("tr")?.cells ?? []).indexOf(cell),
  mapRowToIndex: (row) => Array.from(row.closest("table")?.rows ?? []).indexOf(row),
  resolveCell: async (cellIndex, rowIndex, table) =>
    table.rows.item(rowIndex)?.cells.item(cellIndex),
  getTotalRows: (table) => table.rows.length,
  getTotalCols: (table) => table.rows.item(0)?.cells.length ?? 0,
};

type RequestLazyLoad = (colIndex: number, rowIndex: number) => Promise<void>;

type LazyResolverFactoryOptions = {
  rows: MaybeRefOrGetter<number | "unknown">;
  cols: MaybeRefOrGetter<number | "unknown">;
  requestLazyLoad: RequestLazyLoad;
};
const LazyResolverFactory = ({
  rows,
  cols,
  requestLazyLoad,
}: LazyResolverFactoryOptions): IndexResolver => ({
  mapCellToIndex: (cell) => Number(cell.getAttribute(COL_INDEX_ARIA_ATTR)) - 1,
  mapRowToIndex: (row) => Number(row.getAttribute(ROW_INDEX_ARIA_ATTR)) - 1,
  resolveCell: async (cellIndex, rowIndex, table) => {
    // TODO: what about infinity
    const queryCell = () =>
      table.querySelector<HTMLElement>(
        `*[${ROW_INDEX_ARIA_ATTR}="${rowIndex + 1}"] *[${COL_INDEX_ARIA_ATTR}="${cellIndex + 1}"]`,
      );

    let cell = queryCell();
    if (cell) {
      return cell;
    }
    await requestLazyLoad(cellIndex, rowIndex);
    cell = queryCell();
    if (cell) {
      return cell;
    }
    throw new Error(
      `Table cell with row index "${rowIndex}" and column index "${cellIndex}" was not found after requested lazy loading and is unable to be focused!`,
    );
  },
  getTotalRows: () => toValue(rows),
  getTotalCols: () => toValue(cols),
});

type CellIdentifier = {
  rowId: string;
  colKey: string;
};

export type LazyOptions<Lazy extends boolean> = Lazy extends true
  ? {
      lazy: MaybeRefOrGetter<{
        /**
         * total number of rows that are viewable, this includes rows that are hidden because they are out of view
         */
        totalRows: number | "unknown";
        /**
         * total number of columns that are viewable, this includes columns that are hidden because they are out of view
         */
        totalCols: number | "unknown";

        requestLazyLoad: RequestLazyLoad;
      }>;
    }
  : {
      lazy?: never;
    };

export type CreateDataGridOptions<Lazy extends boolean> = {
  /**
   * TODO: Implement support according to https://w3c.github.io/aria/#desc-grid
   */
  readonly?: boolean;
  /**
   * TODO: Implement support according to https://w3c.github.io/aria/#desc-grid
   */
  multiselectable?: boolean;
  loading?: MaybeRefOrGetter<boolean>;
  selectedCell?: Ref<CellIdentifier>;
} & LazyOptions<Lazy>;

export type TrOptions<Lazy extends boolean> = {
  rowId: PropertyKey;
} & (Lazy extends true ? { rowIndex: number } : { rowIndex?: never });

export type TdOptions<Lazy extends boolean> = CellIdentifier &
  (Lazy extends true ? { colIndex: number } : { colIndex?: never });

export const createDataGrid = createBuilder(
  <Lazy extends boolean = false>(options: CreateDataGridOptions<Lazy>) => {
    const tableElement = createElRef<HTMLTableElement>();

    const lazy = options.lazy && toRef(options.lazy);
    const busy = computed(() => toValue(options.loading) ?? busyQueue.active.value);
    const resolver = lazy
      ? LazyResolverFactory({
          cols: () => lazy.value.totalCols,
          rows: () => lazy.value.totalRows,
          requestLazyLoad: lazy.value.requestLazyLoad,
        })
      : StaticResolver;

    const labelId = useId();
    const selectedCell = ref<CellIdentifier>();
    const selectedCellEl = createElRef<HTMLElement>();

    const focusQueue = useLastSettled<Nullable<HTMLElement>>((success, cell) => {
      if (success) {
        cell?.focus();
        cell?.scrollIntoView();
      }
    });

    const busyQueue = useAllSettled();

    const findFirstCell = () =>
      tableElement.value.querySelector(
        `[${ROW_ID_DATA_ATTR}] [${COL_KEY_DATA_ATTR}]`,
      ) as HTMLElement;

    const setSelected = (element: HTMLElement) => {
      const colKey = element.closest(`[${COL_KEY_DATA_ATTR}]`)?.getAttribute(COL_KEY_DATA_ATTR);
      const rowId = element.closest(`[${ROW_ID_DATA_ATTR}]`)?.getAttribute(ROW_ID_DATA_ATTR);
      if (colKey && rowId) {
        selectedCell.value = {
          rowId,
          colKey,
        };
      }
    };

    const ensureTabTarget = () => {
      if (selectedCell.value && selectedCellEl.value?.isConnected) {
        return;
      }
      const firstCell = findFirstCell();
      if (firstCell) {
        setSelected(firstCell);
      }
    };

    let mutationObserver: MutationObserver;

    onMounted(() => {
      ensureTabTarget();

      mutationObserver = new MutationObserver(ensureTabTarget);

      watch(
        tableElement,
        () => {
          mutationObserver.disconnect();
          mutationObserver.observe(tableElement.value, {
            childList: true,
            attributes: true,
            subtree: true,
            attributeFilter: ["value"],
          });
        },
        { immediate: true },
      );
    });

    onBeforeUnmount(() => {
      mutationObserver.disconnect();
    });

    const onFocusin = (event: FocusEvent) => {
      setSelected(event.target as HTMLElement);
      focusQueue.cancel();
    };

    const onKeydown = (event: KeyboardEvent) => {
      const cellElement: HTMLTableCellElement | null = (event.target as HTMLElement).closest(
        "td, th",
      );
      const rowElement = (event.target as HTMLElement).closest("tr");
      const tableElement = (event.target as HTMLElement).closest("table");

      if (!cellElement || !rowElement || !tableElement) {
        return;
      }

      const { getTotalRows, getTotalCols, mapRowToIndex, mapCellToIndex, resolveCell } = resolver;
      const colIndex = mapCellToIndex(cellElement);
      const rowIndex = mapRowToIndex(rowElement);
      const totalRows = getTotalRows(tableElement);
      const totalCols = getTotalCols(tableElement);

      let newColIndex = colIndex;
      let newRowIndex = rowIndex;

      if (wasKeyPressed(event, { ctrlKey: true, key: "Home" })) {
        newColIndex = 0;
        newRowIndex = 0;
      } else if (wasKeyPressed(event, { ctrlKey: true, key: "End" })) {
        newColIndex = totalCols === "unknown" ? Infinity : totalCols - 1;
        newRowIndex = totalRows === "unknown" ? Infinity : totalRows - 1;
      } else if (wasKeyPressed(event, "ArrowUp")) {
        newRowIndex = rowIndex - 1;
      } else if (wasKeyPressed(event, "ArrowDown")) {
        newRowIndex = rowIndex + 1;
      } else if (wasKeyPressed(event, "ArrowLeft")) {
        newColIndex = colIndex - 1;
      } else if (wasKeyPressed(event, "ArrowRight")) {
        newColIndex = colIndex + 1;
      } else if (wasKeyPressed(event, "Home")) {
        newColIndex = 0;
      } else if (wasKeyPressed(event, "End")) {
        newColIndex = totalCols === "unknown" ? Infinity : totalCols - 1;
      } else {
        return;
      }

      // apply bounds
      const maxRows = totalRows === "unknown" ? Infinity : totalRows - 1;
      newRowIndex = Math.max(Math.min(newRowIndex, maxRows), 0);
      const maxCols = totalCols === "unknown" ? Infinity : totalCols - 1;
      newColIndex = Math.max(Math.min(newColIndex, maxCols), 0);

      (async () => {
        const promiseResolveCell = resolveCell(newColIndex, newRowIndex, tableElement);
        focusQueue.queue(promiseResolveCell);
        busyQueue.queue(promiseResolveCell);
      })();
    };

    return {
      elements: {
        label: {
          id: labelId,
        },
        table: computed(
          () =>
            ({
              ref: tableElement,
              onFocusin,
              onKeydown,
              role: "grid",
              "aria-busy": busy?.value,
              "aria-labelledby": labelId,
              "aria-rowcount": lazy?.value.totalRows === "unknown" ? -1 : lazy?.value.totalRows,
              "aria-colcount": lazy?.value.totalCols === "unknown" ? -1 : lazy?.value.totalCols,
            }) satisfies VBindAttributes<TableHTMLAttributes>,
        ),
        tr: ({ rowId, rowIndex }: TrOptions<Lazy>) => ({
          [ROW_ID_DATA_ATTR]: rowId.toString(),
          "aria-rowindex": rowIndex == undefined ? undefined : rowIndex + 1,
          role: "row",
        }),
        td: computed(() => ({ rowId, colKey, colIndex }: TdOptions<Lazy>) => {
          const isSelected =
            colKey === selectedCell.value?.colKey && rowId === selectedCell.value?.rowId;
          return {
            tabindex: isSelected ? "0" : "-1",
            ref: isSelected ? selectedCellEl : undefined,
            [COL_KEY_DATA_ATTR]: colKey,
            "aria-colindex": colIndex == undefined ? undefined : colIndex + 1,
            role: "cell",
          };
        }),
      },
      state: {
        /**
         * Indicates that the data grid expects a content change soon, e.g. because more or other data is loaded.
         * If `loading` is passed in via the options, this will mirror its value.
         * Otherwise it will be dynamically set based on the running state of the `requestLazyLoad` promises.
         */
        busy,
      },
      internals: {},
    };
  },
);
