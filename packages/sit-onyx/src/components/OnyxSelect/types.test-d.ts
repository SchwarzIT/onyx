import { describe, expectTypeOf, test } from "vitest";
import type { OnyxSelectProps, SelectOption } from "./types";

describe("Select type tests", () => {
  test("should type single select props", () => {
    const props: OnyxSelectProps<number> = {
      label: "",
      listLabel: "",
      options: [],
    };

    type ExpectedType = {
      options: SelectOption<number>[];
      modelValue?: SelectOption<number>;
      withCheckAll?: never;
    };

    expectTypeOf(props).toMatchTypeOf<ExpectedType>();

    const props2: OnyxSelectProps<number> = {
      ...props,
      multiple: false,
    };

    expectTypeOf(props2).toMatchTypeOf<ExpectedType>();
  });

  test("should type multiselect props", () => {
    const props: OnyxSelectProps<number> = {
      label: "",
      listLabel: "",
      options: [],
      multiple: true,
    };

    type ExpectedType = {
      options: SelectOption<number>[];
      modelValue?: SelectOption<number>[];
      multiple: true;
      withCheckAll?: boolean | { label?: string };
    };

    expectTypeOf(props).toMatchTypeOf<ExpectedType>();
  });

  test("should type props without search", () => {
    const props: OnyxSelectProps<number> = {
      label: "",
      listLabel: "",
      options: [],
    };

    type ExpectedType = {
      withSearch?: false;
      searchTerm?: never;
    };

    expectTypeOf(props).toMatchTypeOf<ExpectedType>();

    const props2: OnyxSelectProps<number> = {
      label: "",
      listLabel: "",
      options: [],
      withSearch: false,
    };

    expectTypeOf(props2).toMatchTypeOf<ExpectedType>();
  });

  test("should type props with search", () => {
    const props: OnyxSelectProps<number> = {
      label: "",
      listLabel: "",
      options: [],
      withSearch: true,
    };

    type ExpectedType = {
      withSearch: true;
      searchTerm?: string;
    };

    expectTypeOf(props).toMatchTypeOf<ExpectedType>();
  });
});
