import { describe, expectTypeOf, it } from "vitest";
import type { IfNotEmpty, KeysOfUnion, RecordValues } from "./utils.js";

describe("RecordValues", () => {
  it("should return value type for a record", () => {
    expectTypeOf<RecordValues<{ a: number }>>().toEqualTypeOf<number>();
    expectTypeOf<RecordValues<{ a: number; b: string }>>().toEqualTypeOf<number | string>();
    expectTypeOf<RecordValues<Record<string, number>>>().toEqualTypeOf<number>();
    expectTypeOf<RecordValues<Record<string, never>>>().toEqualTypeOf<never>();
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- used in test
    expectTypeOf<RecordValues<{}>>().toEqualTypeOf<unknown>();
  });
});

describe("KeysOfUnion", () => {
  it("should return all possible keys of a union", () => {
    expectTypeOf<
      KeysOfUnion<{ a: number } | { b?: string; c: object } | { d?: undefined }>
    >().toEqualTypeOf<"a" | "b" | "c" | "d">();
  });

  it("should work still work with incompatible union members", () => {
    expectTypeOf<
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- used in test
      KeysOfUnion<{ a: number } | never | undefined | {} | Record<never, never>>
    >().toEqualTypeOf<"a">();
  });

  it("should return never in case of invalid types", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- used in test
    expectTypeOf<KeysOfUnion<{}>>().toBeNever();
    expectTypeOf<KeysOfUnion<never>>().toBeNever();
    expectTypeOf<KeysOfUnion<undefined>>().toBeNever();
    expectTypeOf<KeysOfUnion<object>>().toBeNever();
  });
});

describe("IfNotEmpty", () => {
  it("should return input type for a non-empty record", () => {
    expectTypeOf<IfNotEmpty<{ a: number }>>().toEqualTypeOf<{ a: number }>();
    expectTypeOf<IfNotEmpty<{ a: number } | { b: string }>>().toEqualTypeOf<
      { a: number } | { b: string }
    >();
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- used in test
    expectTypeOf<IfNotEmpty<{}>>().toBeNever();
  });

  it("should return never type for empty record types", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- used in test
    expectTypeOf<IfNotEmpty<{}>>().toBeNever();
    expectTypeOf<IfNotEmpty<Record<PropertyKey, never>>>().toBeNever();
  });
});
