import {
  computed,
  onMounted,
  ref,
  toRef,
  useId,
  type MaybeRefOrGetter,
  type Ref,
  type TableHTMLAttributes,
} from "vue";
import { createBuilder, createElRef, type VBindAttributes } from "../../utils/builder.js";
import { wasKeyPressed } from "../../utils/keyboard.js";

const COL_KEY_DATA_ATTR = "data-onyx-col-key";
const ROW_ID_DATA_ATTR = "data-onyx-row-id";

type CellIdentifier = {
  rowId: string;
  colKey: string;
};

export type CreateDataGridOptions = {
  /**
   * TODO: Implement support according to https://w3c.github.io/aria/#desc-grid
   */
  readonly?: boolean;
  /**
   * TODO: Implement support according to https://w3c.github.io/aria/#desc-grid
   */
  multiselectable?: boolean;
  rows: MaybeRefOrGetter<{
    /**
     * total number of rows that are viewable, this includes rows that are hidden because they are out of view
     */
    total: number | "unknown";
  }>;
  cols: MaybeRefOrGetter<{
    /**
     * total number of columns that are viewable, this includes columns that are hidden because they are out of view
     */
    total: number | "unknown";
  }>;
  selectedCell?: Ref<CellIdentifier>;
};

export const createDataGrid = createBuilder((options: CreateDataGridOptions) => {
  const rowOpts = toRef(options.rows);
  const colOpts = toRef(options.cols);
  const tableElement = createElRef<HTMLTableElement>();

  const labelId = useId();

  const selectedCell = ref<CellIdentifier>();

  onMounted(() => {
    const firstCell = tableElement.value?.rows.item(0)?.cells.item(0);
    if (firstCell) {
      // TODO - allow definition of first item
      // TODO - allow excluding table header
      setSelected(firstCell);
    }
  });

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

  const onFocusin = (event: FocusEvent) => setSelected(event.target as HTMLElement);

  const onKeydown = (event: KeyboardEvent) => {
    const cellElement: HTMLTableCellElement | null = (event.target as HTMLElement).closest(
      "td, th",
    );
    const rowElement = (event.target as HTMLElement).closest("tr");
    const tableElement = (event.target as HTMLElement).closest("table");

    if (!cellElement || !rowElement || !tableElement) {
      return;
    }

    const colPos = cellElement.cellIndex;
    const rowPos = rowElement.rowIndex;
    const rows = tableElement.rows;

    let newColPos = colPos;
    let newRowPos = rowPos;

    if (
      wasKeyPressed(event, { ctrlKey: true, key: "Home" }) ||
      wasKeyPressed(event, { metaKey: true, key: "Home" })
    ) {
      newColPos = 0;
      newRowPos = 0;
    } else if (
      wasKeyPressed(event, { ctrlKey: true, key: "End" }) ||
      wasKeyPressed(event, { metaKey: true, key: "End" })
    ) {
      newColPos = rows[rows.length - 1]?.cells.length ?? -1;
      newRowPos = rows.length - 1;
    } else if (wasKeyPressed(event, "ArrowUp")) {
      newRowPos = rowPos - 1;
    } else if (wasKeyPressed(event, "ArrowDown")) {
      newRowPos = rowPos + 1;
    } else if (wasKeyPressed(event, "ArrowLeft")) {
      newColPos = colPos - 1;
    } else if (wasKeyPressed(event, "ArrowRight")) {
      newColPos = colPos + 1;
    } else if (wasKeyPressed(event, "Home")) {
      newRowPos = 0;
    } else if (wasKeyPressed(event, "End")) {
      newRowPos = rows.length - 1;
    } else {
      return;
    }

    newRowPos = Math.max(Math.min(newRowPos, rows.length - 1), 0);
    const cells = rows.item(newRowPos)?.cells ?? { item: () => {}, length: 0 };
    newColPos = Math.max(Math.min(newColPos, cells.length - 1), 0);
    cells.item(newColPos)?.focus();
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
            "aria-labelledby": labelId,
            "aria-rowcount": rowOpts.value.total === "unknown" ? -1 : rowOpts.value.total,
            "aria-colcount": colOpts.value.total === "unknown" ? -1 : colOpts.value.total,
          }) satisfies VBindAttributes<TableHTMLAttributes>,
      ),
      tr: (rowId: PropertyKey) => ({
        [ROW_ID_DATA_ATTR]: rowId.toString(),
      }),
      td: computed(() => ({ rowId, colKey }: CellIdentifier) => {
        if (!selectedCell.value) {
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
        };
      }),
    },
    state: {},
    internals: {},
  };
});
