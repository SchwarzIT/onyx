import { expectTypeOf, it } from "vitest";
import type { WatchSource } from "vue";
import type { BASE_FEATURE } from "./features/base/base.js";
import type {
  ColumnConfigTypeOption,
  DataGridFeature,
  TypeRenderer,
  TypeRenderMap,
} from "./features/index.js";
import type {
  BooleanCellOptions,
  DateCellOptions,
  NumberCellOptions,
  StringCellOptions,
} from "./features/renderer.js";
import type { ColumnTypesFromFeatures, DataGridEntry } from "./types.js";

it("should be ensured that ColumnTypesFromFeatures unwraps correctly", async () => {
  expectTypeOf<ColumnTypesFromFeatures<never>>().toBeNever();
  expectTypeOf<ColumnTypesFromFeatures<[]>>().toBeNever();

  type ExpectedType =
    | ColumnConfigTypeOption<"number", NumberCellOptions>
    | ColumnConfigTypeOption<"string", StringCellOptions>
    | ColumnConfigTypeOption<"date", DateCellOptions>
    | ColumnConfigTypeOption<"datetime-local", DateCellOptions>
    | ColumnConfigTypeOption<"time", DateCellOptions>
    | ColumnConfigTypeOption<"timestamp", DateCellOptions>
    | ColumnConfigTypeOption<"skeleton", StringCellOptions>
    | ColumnConfigTypeOption<"boolean", BooleanCellOptions>;

  // should support passing a single feature
  expectTypeOf<
    ColumnTypesFromFeatures<ReturnType<typeof BASE_FEATURE>>
  >().toEqualTypeOf<ExpectedType>();

  // should support passing multiple features
  expectTypeOf<
    ColumnTypesFromFeatures<[ReturnType<typeof BASE_FEATURE>]>
  >().toEqualTypeOf<ExpectedType>();

  type SingleFeature = [
    () => {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: { a: TypeRenderer<DataGridEntry, { anOption?: number }> };
    },
  ];
  expectTypeOf<ColumnTypesFromFeatures<SingleFeature>>().toEqualTypeOf<
    ColumnConfigTypeOption<"a", { anOption?: number }>
  >();

  type SingleFeatureNoOptions = [
    () => {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: { a: TypeRenderer<DataGridEntry> };
    },
  ];
  expectTypeOf<ColumnTypesFromFeatures<SingleFeatureNoOptions>>().toEqualTypeOf<
    ColumnConfigTypeOption<"a", undefined>
  >();

  type SingleFeatureWithMultiple = [
    () => {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: {
        a: TypeRenderer<DataGridEntry, { someOption: string }>;
        b: TypeRenderer<DataGridEntry>;
      };
    },
  ];
  expectTypeOf<ColumnTypesFromFeatures<SingleFeatureWithMultiple>>().toEqualTypeOf<
    ColumnConfigTypeOption<"a", { someOption: string }> | ColumnConfigTypeOption<"b", undefined>
  >();

  type SingleFeatureWithMultipleNoOptions = [
    () => {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: {
        a: TypeRenderer<DataGridEntry>;
        b: TypeRenderer<DataGridEntry>;
      };
    },
  ];
  expectTypeOf<ColumnTypesFromFeatures<SingleFeatureWithMultipleNoOptions>>().toEqualTypeOf<
    ColumnConfigTypeOption<"a", undefined> | ColumnConfigTypeOption<"b", undefined>
  >();

  type MultipleFeatures = [
    () => {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: {
        a: TypeRenderer<DataGridEntry, number>;
        b: TypeRenderer<DataGridEntry>;
      };
    },
    () => {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: {
        c: TypeRenderer<DataGridEntry>;
      };
    },
    () => {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: object;
    },
    () => {
      name: symbol;
      watch: WatchSource[];
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- test case
      typeRenderer: {};
    },
    () => {
      name: symbol;
      watch: WatchSource[];
    },
  ];

  expectTypeOf<ColumnTypesFromFeatures<MultipleFeatures>>().toEqualTypeOf<
    | ColumnConfigTypeOption<"a", number>
    | ColumnConfigTypeOption<"b", undefined>
    | ColumnConfigTypeOption<"c", undefined>
  >();
});

type GenericFeature = DataGridFeature<DataGridEntry, TypeRenderMap<DataGridEntry>, symbol>[];
expectTypeOf<ColumnTypesFromFeatures<GenericFeature>>().toEqualTypeOf<
  | ColumnConfigTypeOption<string, unknown>
  | ColumnConfigTypeOption<number, unknown>
  | ColumnConfigTypeOption<symbol, unknown>
>();
