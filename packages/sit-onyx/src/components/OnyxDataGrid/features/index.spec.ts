import { describe, expect, test } from "vitest";
import type { TableColumnGroup } from "../../../components/OnyxTable/types";
import type { DataGridEntry } from "../types";
import {
  createTableColumnGroups,
  type ColumnGroupConfig,
  type PublicNormalizedColumnConfig,
} from "./index";

describe("createTableColumnGroups", () => {
  test.each([
    { title: "no columns", columns: [], columnGroups: { a: { label: "a" } }, expected: undefined },
    {
      title: "columns not using column groups",
      columns: [{ key: "a" }, { key: "b" }],
      columnGroups: { a: { label: "a" } },
      expected: undefined,
    },
    {
      title: "no columnGroups",
      columns: [{ key: "a" }, { key: "b" }],
      columnGroups: undefined,
      expected: undefined,
    },
    {
      title: "neither columnGroups nor columns",
      columns: undefined,
      columnGroups: undefined,
      expected: undefined,
    },
    {
      title: "empty columnGroups and columns",
      columns: [],
      columnGroups: {},
      expected: undefined,
    },
    {
      title: "basic example",
      columns: [
        { key: "a", columnGroupKey: "1st" },
        { key: "b", columnGroupKey: "1st" },
      ],
      columnGroups: { "1st": { label: "First" } },
      expected: [
        {
          key: "1st",
          span: 2,
          header: "First",
        },
      ],
    },
    {
      title: "mixed",
      columns: [
        { key: "a", columnGroupKey: "1st" },
        { key: "b", columnGroupKey: "1st" },
        { key: "c", columnGroupKey: "2nd" },
        { key: "d" },
        { key: "e", columnGroupKey: "3rd" },
        { key: "f", columnGroupKey: "1st" },
        { key: "g", columnGroupKey: "1st" },
        { key: "h" },
      ],
      columnGroups: { "1st": { label: "First" }, "2nd": { label: "Second" } },
      expected: [
        {
          key: "1st",
          span: 2,
          header: "First",
        },
        {
          key: "2nd",
          span: 1,
          header: "Second",
        },
        {
          key: "",
          span: 1,
          header: "",
        },
        {
          key: "3rd",
          span: 1,
          header: "3rd",
        },
        {
          key: "1st",
          span: 2,
          header: "First",
        },
        {
          key: "",
          span: 1,
          header: "",
        },
      ],
    },
  ])("should create correct columnGroups for $title", ({ columns, columnGroups, expected }) => {
    const result = createTableColumnGroups(
      columns as PublicNormalizedColumnConfig<DataGridEntry>[],
      columnGroups as ColumnGroupConfig | undefined,
    );
    expect(result).toMatchObject(expected as TableColumnGroup[]);
  });
});
