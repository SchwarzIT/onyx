/* eslint-disable vue/no-ref-object-reactivity-loss */
import { expect, test, vi } from "vitest";
import * as vue from "vue";
import { ref, toRef } from "vue";
import { I18N_INJECTION_KEY } from "../../../../i18n";
import type { DataGridEntry } from "../../types";
import { useDataGridSorting } from "./sorting";
import type { SortColumnOptions, SortState } from "./types";

vi.mock("vue", async (importOriginal) => {
  const module: typeof vue = await importOriginal();

  return {
    ...module,
    inject: vi.fn((key) =>
      key === I18N_INJECTION_KEY ? { locale: toRef("en-US") } : undefined,
    ) satisfies (typeof vue)["inject"],
  };
});

const getTestData = () => [
  { id: 1, a: "6", b: "1-End" },
  { id: 2, a: "5", b: "2-End" },
  { id: 3, a: "4", b: "3-Start" },
  { id: 4, a: "3", b: "4-Start" },
  { id: 5, a: "2", b: "5-End" },
  { id: 6, a: "1", b: "6-End" },
];

test("per default should enable show sort symbols and not sort initially", () => {
  // ARRANGE
  const withSorting = useDataGridSorting();

  //ASSERT
  expect(withSorting.header!.actions!("col1")).toHaveLength(1);

  const array = getTestData();
  withSorting.mutation!.func(array);
  expect(array).toMatchObject(getTestData());
});

test("should consider reactive sortState", () => {
  // ARRANGE
  const sortState = ref<SortState>({
    column: "b",
    direction: "desc",
  });
  const withSorting = useDataGridSorting({
    sortState,
    columns: ref({
      id: { enabled: false },
      a: { enabled: true },
      b: {
        enabled: true,
        sortFunc: (a, b) => {
          const aStart = String(a).endsWith("Start");
          const bStart = String(b).endsWith("Start");
          return aStart && bStart ? 0 : aStart ? 1 : -1;
        },
      },
    }),
  });

  // ASSERT
  expect(withSorting.header!.actions!("non-existent")).toHaveLength(0);
  expect(withSorting.header!.actions!("id")).toHaveLength(0);
  expect(withSorting.header!.actions!("a")).toHaveLength(1);
  expect(withSorting.header!.actions!("b")).toHaveLength(1);

  const array = getTestData();
  withSorting.mutation!.func(array);

  expect(array, "should sort by initial sortState and use custom sort function").toMatchObject([
    { id: 3, a: "4", b: "3-Start" },
    { id: 4, a: "3", b: "4-Start" },
    { id: 1, a: "6", b: "1-End" },
    { id: 2, a: "5", b: "2-End" },
    { id: 5, a: "2", b: "5-End" },
    { id: 6, a: "1", b: "6-End" },
  ]);

  // ACT
  sortState.value.column = "a";
  sortState.value.direction = "asc";

  // ASSERT
  const array2 = getTestData();
  withSorting.mutation!.func(array2);
  expect(array2, "should consider updated sorting").toMatchObject([
    { id: 6, a: "1", b: "6-End" },
    { id: 5, a: "2", b: "5-End" },
    { id: 4, a: "3", b: "4-Start" },
    { id: 3, a: "4", b: "3-Start" },
    { id: 2, a: "5", b: "2-End" },
    { id: 1, a: "6", b: "1-End" },
  ]);
});

test("should consider reactive columns", () => {
  // ARRANGE
  const columns = ref<SortColumnOptions<DataGridEntry> | undefined>({
    id: { enabled: false },
    a: { enabled: true },
    b: {
      enabled: true,
      sortFunc: (a: unknown, b: unknown) => {
        const aStart = String(a).endsWith("Start");
        const bStart = String(b).endsWith("Start");
        return aStart && bStart ? 0 : aStart ? 1 : -1;
      },
    },
  });
  const withSorting = useDataGridSorting({
    sortState: {
      column: "b",
      direction: "desc",
    },
    columns,
  });

  // ASSERT
  expect(withSorting.header!.actions!("id")).toHaveLength(0);
  expect(withSorting.header!.actions!("a")).toHaveLength(1);
  expect(withSorting.header!.actions!("b")).toHaveLength(1);

  // ACT
  columns.value!.id = { enabled: true };
  columns.value!.a = { enabled: false };
  delete columns.value!.b;

  // ASSERT
  expect(withSorting.header!.actions!("id")).toHaveLength(1);
  expect(withSorting.header!.actions!("a")).toHaveLength(0);
  expect(withSorting.header!.actions!("b")).toHaveLength(0);

  // ACT
  columns.value = undefined;

  // ASSERT
  expect(withSorting.header!.actions!("id")).toHaveLength(1);
  expect(withSorting.header!.actions!("a")).toHaveLength(1);
  expect(withSorting.header!.actions!("b")).toHaveLength(1);
});
