import { expect, test } from "vitest";
import { ref } from "vue";
import { useDataGridSorting } from "./sorting";
import type { SortState } from "./types";

const getTestArray = () => [
  { id: 1, a: "6", b: "1-End" },
  { id: 2, a: "5", b: "2-End" },
  { id: 3, a: "4", b: "3-Start" },
  { id: 4, a: "3", b: "4-Start" },
  { id: 5, a: "2", b: "5-End" },
  { id: 6, a: "1", b: "6-End" },
];

test("per default should enable show sort symbols and not sort initially", () => {
  const withSorting = useDataGridSorting();

  expect(withSorting.header!.actions!("col1")).toHaveLength(1);

  const array = getTestArray();
  withSorting.mutation!.func(array);
  expect(array).toMatchObject(getTestArray());
});

test("should consider reactive options", () => {
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

  expect(withSorting.header!.actions!("non-existent")).toHaveLength(0);
  expect(withSorting.header!.actions!("id")).toHaveLength(0);
  expect(withSorting.header!.actions!("a")).toHaveLength(1);
  expect(withSorting.header!.actions!("b")).toHaveLength(1);

  const array = getTestArray();
  withSorting.mutation!.func(array);

  expect(array, "should sort by initial sortState and use custom sort function").toMatchObject([
    { id: 3, a: "4", b: "3-Start" },
    { id: 4, a: "3", b: "4-Start" },
    { id: 1, a: "6", b: "1-End" },
    { id: 2, a: "5", b: "2-End" },
    { id: 5, a: "2", b: "5-End" },
    { id: 6, a: "1", b: "6-End" },
  ]);

  sortState.value.column = "a";
  sortState.value.direction = "asc";

  const array2 = getTestArray();
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
