import { expect, test } from "vitest";
import { ref } from "vue";
import { createFeatureContextMock } from "../index.spec.js";
import { useFiltering } from "./filtering.js";
import type { FilterState } from "./types.js";

const getTestData = () => [
  { id: 1, a: "6", b: "1-End", c: { c1: "match" } },
  { id: 2, a: "5", b: "2-End", c: { c1: "match" } },
  { id: 3, a: "4", b: "3-Start", c: { c1: "nope" } },
  { id: 4, a: "3", b: "4-Start", c: { c1: "nope" } },
  { id: 5, a: "2", b: "5-End", c: { c1: "nope" } },
  { id: 6, a: "1", b: "6-End", c: { c1: "nope" } },
];

type TestEntry = ReturnType<typeof getTestData>[number];

const createConfig = (key: string) => ({ key, label: key, type: { name: "string" } });

test("per default should show filter symbols and not filter initially", () => {
  // ARRANGE
  const withFiltering = useFiltering()(createFeatureContextMock());

  //ASSERT
  expect(withFiltering.header.actions(createConfig("col1"))).toHaveLength(1);

  const array = getTestData();
  const result = withFiltering.mutation.func(array);
  expect(result).toMatchObject(getTestData());
});

test("should support custom filter function", () => {
  // ARRANGE
  const filterState = ref<FilterState<TestEntry>>({ id: "3" });
  const withFiltering = useFiltering<TestEntry>({
    filterState,
    columns: {
      id: {
        config: {
          filterFunc: (searchTerm, value) => Number.parseFloat(searchTerm) >= value,
        },
      },
      c: {
        config: {
          filterFunc: (searchTerm, value) => value["c1"] === searchTerm,
        },
      },
    },
  })(createFeatureContextMock({}));

  //ASSERT
  const array = getTestData();
  const result = withFiltering.mutation.func(array);
  expect(result).toMatchObject([
    { id: 1, a: "6", b: "1-End" },
    { id: 2, a: "5", b: "2-End" },
    { id: 3, a: "4", b: "3-Start" },
  ]);

  // ACT
  filterState.value = { c: "match" };
  const result2 = withFiltering.mutation.func(array);
  expect(result2).toMatchObject([
    { id: 1, a: "6", b: "1-End", c: { c1: "match" } },
    { id: 2, a: "5", b: "2-End", c: { c1: "match" } },
  ]);
});

test("should consider reactive filterState", () => {
  // ARRANGE
  const async = ref(false);
  const filterState = ref<FilterState<TestEntry>>({ b: "Start" });
  const withFiltering = useFiltering<TestEntry>({
    filterState,
    enabled: false,
    columns: ref({
      id: { enabled: false },
      a: { enabled: true },
      b: { enabled: true },
    }),
  })(createFeatureContextMock({ async }));

  // ASSERT
  expect(withFiltering.header.actions(createConfig("non-existent"))).toHaveLength(0);
  expect(withFiltering.header.actions(createConfig("id"))).toHaveLength(0);
  expect(withFiltering.header.actions(createConfig("a"))).toHaveLength(1);
  expect(withFiltering.header.actions(createConfig("b"))).toHaveLength(1);

  const array = withFiltering.mutation.func(getTestData());

  expect(array, "should filter by initial filterState").toMatchObject([
    { id: 3, a: "4", b: "3-Start" },
    { id: 4, a: "3", b: "4-Start" },
  ]);

  // ACT
  delete filterState.value.b;
  filterState.value.a = "1";

  // ASSERT
  const array2 = withFiltering.mutation.func(getTestData());
  expect(array2, "should consider updated filter").toMatchObject([{ id: 6, a: "1", b: "6-End" }]);

  // ACT
  async.value = true;

  // ASSERT
  const array3 = withFiltering.mutation.func(getTestData());
  expect(array3, "should use original order when async").toMatchObject(getTestData());
});
