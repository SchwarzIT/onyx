import { describe, expectTypeOf, it } from "vitest";
import type {
  IfNotEmpty,
  KeysOfUnion,
  MaybePick,
  MaybeUnwrap,
  Merge,
  MergeAll,
  RecordValues,
} from "./utils.js";

/* eslint-disable @typescript-eslint/no-empty-object-type -- Used for testing*/

describe("RecordValues", () => {
  it("should return value type for a record", () => {
    expectTypeOf<RecordValues<{ a: number }>>().toEqualTypeOf<number>();
    expectTypeOf<RecordValues<{ a: number; b: string }>>().toEqualTypeOf<number | string>();
    expectTypeOf<RecordValues<Record<string, number>>>().toEqualTypeOf<number>();
    expectTypeOf<RecordValues<Record<string, never>>>().toEqualTypeOf<never>();
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
      KeysOfUnion<{ a: number } | never | undefined | {} | Record<never, never>>
    >().toEqualTypeOf<"a">();
  });

  it("should return never in case of invalid types", () => {
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

    expectTypeOf<IfNotEmpty<{}>>().toBeNever();
  });

  it("should return never type for empty record types", () => {
    expectTypeOf<IfNotEmpty<{}>>().toBeNever();
    expectTypeOf<IfNotEmpty<Record<PropertyKey, never>>>().toBeNever();
  });
});

describe("Merge", () => {
  it("should merge types correctly", () => {
    expectTypeOf<Merge<{ a: number }, { b: boolean }>>().branded.toEqualTypeOf<{
      a: number;
      b: boolean;
    }>();

    expectTypeOf<Merge<{ a: number }, { a: boolean }>>().branded.toEqualTypeOf<{
      a: boolean;
    }>();
    expectTypeOf<Merge<{ a: boolean }, { a: number }>>().branded.toEqualTypeOf<{
      a: number;
    }>();

    expectTypeOf<
      Merge<{ a: number; b: string }, { b: boolean; c: unknown }>
    >().branded.toEqualTypeOf<{
      a: number;
      b: boolean;
      c: unknown;
    }>();

    expectTypeOf<Merge<{ a: number }, {}>>().branded.toEqualTypeOf<{
      a: number;
    }>();
    expectTypeOf<Merge<{}, { a: number }>>().branded.toEqualTypeOf<{
      a: number;
    }>();

    expectTypeOf<Merge<{ a: number }, object>>().branded.toEqualTypeOf<{
      a: number;
    }>();
    expectTypeOf<Merge<object, { a: number }>>().branded.toEqualTypeOf<{
      a: number;
    }>();

    expectTypeOf<Merge<{ a: number }, unknown>>().branded.toEqualTypeOf<{
      a: number;
    }>();
    expectTypeOf<Merge<unknown, { a: number }>>().branded.toEqualTypeOf<{
      a: number;
    }>();

    expectTypeOf<Merge<null, { a: number }>>().branded.toEqualTypeOf<{
      a: number;
    }>();
  });
});

describe("MergeAll", () => {
  it("should merge types correctly", () => {
    expectTypeOf<MergeAll<[{}]>>().toEqualTypeOf<{}>();

    expectTypeOf<MergeAll<[{ a: number }]>>().toEqualTypeOf<{
      a: number;
    }>();

    expectTypeOf<MergeAll<[{ a: number }, { a: boolean }, { a: false }]>>().branded.toEqualTypeOf<{
      a: false;
    }>();

    expectTypeOf<
      MergeAll<[{ a: number }, { b: boolean }, { a: boolean }]>
    >().branded.toEqualTypeOf<{
      a: boolean;
      b: boolean;
    }>();

    expectTypeOf<
      MergeAll<
        [
          null,
          undefined,
          { a: number },
          { b: boolean },
          { a: boolean },
          {},
          object,
          { c: unknown },
          null,
          undefined,
        ]
      >
    >().branded.toEqualTypeOf<{
      a: boolean;
      b: boolean;
      c: unknown;
    }>();
  });
});

describe("MaybeUnwrap", () => {
  it("should result in never type when no matching key", () => {
    expectTypeOf<MaybeUnwrap<{}, never>>().toEqualTypeOf<never>();
    expectTypeOf<MaybeUnwrap<object, "a">>().toEqualTypeOf<never>();
    expectTypeOf<MaybeUnwrap<{}, "a">>().toEqualTypeOf<never>();
    expectTypeOf<MaybeUnwrap<{}, "a" | "b">>().toEqualTypeOf<never>();
  });

  it("should use fallback if key is not matching", () => {
    expectTypeOf<MaybeUnwrap<{}, null, number>>().toEqualTypeOf<number>();
    expectTypeOf<MaybeUnwrap<{}, undefined, number>>().toEqualTypeOf<number>();
    expectTypeOf<MaybeUnwrap<{}, "b", number>>().toEqualTypeOf<number>();
    expectTypeOf<MaybeUnwrap<{ a: string }, "b", number>>().toEqualTypeOf<number>();
    expectTypeOf<MaybeUnwrap<object, "a", number>>().toEqualTypeOf<number>();
    expectTypeOf<MaybeUnwrap<{}, "a", number>>().toEqualTypeOf<number>();
  });

  it("should unwrap types correctly", () => {
    expectTypeOf<MaybeUnwrap<Record<string, number>, "a">>().toEqualTypeOf<number>();
    expectTypeOf<MaybeUnwrap<{ a: number }, "a">>().toEqualTypeOf<number>();
    expectTypeOf<MaybeUnwrap<{ a: number }, "a" | "b">>().toEqualTypeOf<number>();
    expectTypeOf<MaybeUnwrap<{ a: number } | { a: string }, "a">>().toEqualTypeOf<
      number | string
    >();
  });
});

describe("MaybePick", () => {
  it("should result in never type when no matching key", () => {
    expectTypeOf<MaybePick<{}, never>>().toEqualTypeOf<{}>();
    expectTypeOf<MaybePick<object, "a">>().toEqualTypeOf<{}>();
    expectTypeOf<MaybePick<{}, "a">>().toEqualTypeOf<{}>();
    expectTypeOf<MaybePick<{}, "a" | "b">>().toEqualTypeOf<{}>();
  });

  it("should pick types correctly", () => {
    expectTypeOf<MaybePick<Record<string, number>, "a">>().toEqualTypeOf<{ a: number }>();
    expectTypeOf<MaybePick<{ a?: number }, "a">>().toEqualTypeOf<{ a: number | undefined }>();
    expectTypeOf<MaybePick<{ a: number }, "a">>().toEqualTypeOf<{ a: number }>();
    expectTypeOf<MaybePick<{ a: number }, "a" | "b">>().toEqualTypeOf<{ a: number }>();
    expectTypeOf<MaybePick<{ a: number } | { a: string }, "a">>().toEqualTypeOf<{
      a: number | string;
    }>();
  });
});

/* eslint-enable @typescript-eslint/no-empty-object-type -- Used for testing*/
