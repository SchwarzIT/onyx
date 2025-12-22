import {
  computed,
  onMounted,
  ref,
  toRef,
  toValue,
  useId,
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
    const getCell = () =>
      table.querySelector<HTMLElement>(
        `*[${ROW_INDEX_ARIA_ATTR}="${rowIndex + 1}"] *[${COL_INDEX_ARIA_ATTR}="${cellIndex + 1}"]`,
      );
    let cell = getCell();
    if (cell) {
      return cell;
    }
    await requestLazyLoad(cellIndex, rowIndex);
    cell = getCell();
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

export type TdOptions<Lazy extends boolean> = CellIdentifier & {
  defaultSelected?: boolean;
} & (Lazy extends true ? { colIndex: number } : { colIndex?: never });

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

    onMounted(() => {
      if (selectedCell.value) {
        return;
      }
      const firstCell = findFirstCell();
      if (firstCell) {
        setSelected(firstCell);
      }
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
          "aria-rowindex": rowIndex != undefined ? rowIndex + 1 : undefined,
          role: "row",
        }),
        td: computed(() => ({ rowId, colKey, colIndex, defaultSelected }: TdOptions<Lazy>) => {
          if (defaultSelected && !selectedCell.value) {
            // we always need an initial selected cell
            // if none was defined, we just use the first cell here
            selectedCell.value = { rowId, colKey };
          }
          return {
            tabindex:
              colKey === selectedCell.value?.colKey && rowId === selectedCell.value?.rowId
                ? "0"
                : "-1",
            [COL_KEY_DATA_ATTR]: colKey,
            "aria-colindex": colIndex != undefined ? colIndex + 1 : undefined,
            role: "cell",
          };
        }),
      },
      state: {},
      internals: {},
    };
  },
);
