import { expect, test } from "vitest";
import * as vue from "vue";
import { ref } from "vue";
import type { DataGridEntry } from "../../types/index.js";
import { createFeatureContextMock } from "../index.spec";
import { useSorting } from "./sorting.js";
import type { SortOptions, SortState } from "./types.js";

const getTestData = () => [
  { id: 1, a: "6", b: "1-End" },
  { id: 2, a: "5", b: "2-End" },
  { id: 3, a: "4", b: "3-Start" },
  { id: 4, a: "3", b: "4-Start" },
  { id: 5, a: "2", b: "5-End" },
  { id: 6, a: "1", b: "6-End" },
];

type TestEntry = ReturnType<typeof getTestData>[number];

const createConfig = (key: string) => ({ key, label: key, type: { name: "string" } });

test("per default should enable show sort symbols and not sort initially", () => {
  // ARRANGE
  const withSorting = useSorting()(createFeatureContextMock());

  //ASSERT
  expect(withSorting.header.actions(createConfig("col1"))).toHaveLength(1);

  const array = withSorting.mutation.func(getTestData());
  expect(array).toMatchObject(getTestData());
});

test("should consider reactive sortState", () => {
  // ARRANGE
  const async = ref(false);
  const sortState = ref<SortState<TestEntry>>({
    column: "b",
    direction: "desc",
  });
  const withSorting = useSorting<TestEntry>({
    sortState,
    enabled: false,
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
  })(createFeatureContextMock({ async }));

  // ASSERT
  expect(withSorting.header.actions(createConfig("non-existent"))).toHaveLength(0);
  expect(withSorting.header.actions(createConfig("id"))).toHaveLength(0);
  expect(withSorting.header.actions(createConfig("a"))).toHaveLength(1);
  expect(withSorting.header.actions(createConfig("b"))).toHaveLength(2);

  const array = withSorting.mutation.func(getTestData());

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
  const array2 = withSorting.mutation.func(getTestData());
  expect(array2, "should consider updated sorting").toMatchObject([
    { id: 6, a: "1", b: "6-End" },
    { id: 5, a: "2", b: "5-End" },
    { id: 4, a: "3", b: "4-Start" },
    { id: 3, a: "4", b: "3-Start" },
    { id: 2, a: "5", b: "2-End" },
    { id: 1, a: "6", b: "1-End" },
  ]);

  // ACT
  async.value = true;

  // ASSERT
  const array3 = withSorting.mutation.func(getTestData());
  expect(array3, "should use original order when async").toMatchObject(getTestData());
});

test("should consider reactive columns", () => {
  // ARRANGE
  const columns = ref<vue.UnwrapRef<SortOptions<DataGridEntry>["columns"]>>({
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
  });
  const withSorting = useSorting({
    sortState: {
      column: "b",
      direction: "desc",
    },
    columns,
  })(createFeatureContextMock());

  // ASSERT
  expect(withSorting.header.actions(createConfig("id"))).toHaveLength(0);
  expect(withSorting.header.actions(createConfig("a"))).toHaveLength(1);
  expect(withSorting.header.actions(createConfig("b"))).toHaveLength(2);

  // ACT
  columns.value!.id = { enabled: true };
  columns.value!.a = { enabled: false };
  delete columns.value!.b;

  // ASSERT
  expect(withSorting.header.actions(createConfig("id"))).toHaveLength(1);
  expect(withSorting.header.actions(createConfig("a"))).toHaveLength(0);
  expect(withSorting.header.actions(createConfig("b"))).toHaveLength(2);

  // ACT
  columns.value = undefined;

  // ASSERT
  expect(withSorting.header.actions(createConfig("id"))).toHaveLength(1);
  expect(withSorting.header.actions(createConfig("a"))).toHaveLength(1);
  expect(withSorting.header.actions(createConfig("b"))).toHaveLength(2);
});
