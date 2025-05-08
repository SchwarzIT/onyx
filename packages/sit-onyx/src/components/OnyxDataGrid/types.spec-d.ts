import { expectTypeOf, it } from "vitest";
import type { WatchSource } from "vue";
import type {
  ColumnConfigTypeOption,
  DataGridFeature,
  TypeRenderer,
  TypeRenderMap,
} from "./features";
import type { BASE_FEATURE } from "./features/base/base";
import type { DateCellOptions, NumberCellOptions, StringCellOptions } from "./features/renderer";
import type { DataGridEntry, RenderTypesFromFeature } from "./types";

it("should be ensured that RenderTypesFromFeature unwraps correctly", async () => {
  expectTypeOf<RenderTypesFromFeature<never>>().toBeNever();
  expectTypeOf<RenderTypesFromFeature<[]>>().toBeNever();

  expectTypeOf<RenderTypesFromFeature<[typeof BASE_FEATURE]>>().toEqualTypeOf<
    | ColumnConfigTypeOption<"number", NumberCellOptions>
    | ColumnConfigTypeOption<"string", StringCellOptions>
    | ColumnConfigTypeOption<"date", DateCellOptions>
    | ColumnConfigTypeOption<"datetime-local", DateCellOptions>
    | ColumnConfigTypeOption<"time", DateCellOptions>
    | ColumnConfigTypeOption<"timestamp", DateCellOptions>
  >();

  type SingleFeature = [
    {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: { a: TypeRenderer<DataGridEntry, { anOption?: number }> };
    },
  ];
  expectTypeOf<RenderTypesFromFeature<SingleFeature>>().toEqualTypeOf<
    ColumnConfigTypeOption<"a", { anOption?: number }>
  >();

  type SingleFeatureNoOptions = [
    {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: { a: TypeRenderer<DataGridEntry> };
    },
  ];
  expectTypeOf<RenderTypesFromFeature<SingleFeatureNoOptions>>().toEqualTypeOf<
    ColumnConfigTypeOption<"a", undefined>
  >();

  type SingleFeatureWithMultiple = [
    {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: {
        a: TypeRenderer<DataGridEntry, { someOption: string }>;
        b: TypeRenderer<DataGridEntry>;
      };
    },
  ];
  expectTypeOf<RenderTypesFromFeature<SingleFeatureWithMultiple>>().toEqualTypeOf<
    ColumnConfigTypeOption<"a", { someOption: string }> | ColumnConfigTypeOption<"b", undefined>
  >();

  type SingleFeatureWithMultipleNoOptions = [
    {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: {
        a: TypeRenderer<DataGridEntry>;
        b: TypeRenderer<DataGridEntry>;
      };
    },
  ];
  expectTypeOf<RenderTypesFromFeature<SingleFeatureWithMultipleNoOptions>>().toEqualTypeOf<
    ColumnConfigTypeOption<"a", undefined> | ColumnConfigTypeOption<"b", undefined>
  >();

  type MultipleFeatures = [
    {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: {
        a: TypeRenderer<DataGridEntry, number>;
        b: TypeRenderer<DataGridEntry>;
      };
    },
    {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: {
        c: TypeRenderer<DataGridEntry>;
      };
    },
    {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: object;
    },
    {
      name: symbol;
      watch: WatchSource[];
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- test case
      typeRenderer: {};
    },
    {
      name: symbol;
      watch: WatchSource[];
    },
  ];

  type RES = RenderTypesFromFeature<MultipleFeatures>;
  expectTypeOf<RES>().toEqualTypeOf<
    | ColumnConfigTypeOption<"a", number>
    | ColumnConfigTypeOption<"b", undefined>
    | ColumnConfigTypeOption<"c", undefined>
  >();
});

type GenericFeature = DataGridFeature<DataGridEntry, TypeRenderMap<DataGridEntry>, symbol>[];
expectTypeOf<RenderTypesFromFeature<GenericFeature>>().toEqualTypeOf<
  | ColumnConfigTypeOption<string, unknown>
  | ColumnConfigTypeOption<number, unknown>
  | ColumnConfigTypeOption<symbol, unknown>
>();
