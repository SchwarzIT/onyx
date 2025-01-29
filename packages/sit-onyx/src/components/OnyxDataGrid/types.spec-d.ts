import { expectTypeOf, it } from "vitest";
import type { WatchSource } from "vue";
import type { TypeRenderer } from "./features";
import type { DataGridEntry, RenderTypesFromFeature } from "./types";

it("should be ensured that RenderTypesFromFeature unwraps correctly", async () => {
  expectTypeOf<RenderTypesFromFeature<never>>().toBeNever();
  expectTypeOf<RenderTypesFromFeature<[]>>().toBeNever();

  type SingleFeature = [
    {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: { a: TypeRenderer<DataGridEntry> };
    },
  ];
  expectTypeOf<RenderTypesFromFeature<SingleFeature>>().toMatchTypeOf<"a">();

  type SingleFeatureWithMultiple = [
    {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: {
        a: TypeRenderer<DataGridEntry>;
        b: TypeRenderer<DataGridEntry>;
      };
    },
  ];
  expectTypeOf<RenderTypesFromFeature<SingleFeatureWithMultiple>>().toMatchTypeOf<"a" | "b">();

  type MultipleFeatures = [
    {
      name: symbol;
      watch: WatchSource[];
      typeRenderer?: {
        a: TypeRenderer<DataGridEntry>;
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
    },
  ];
  expectTypeOf<RenderTypesFromFeature<MultipleFeatures>>().toMatchTypeOf<"a" | "b" | "c">();
});
