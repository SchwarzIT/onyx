import { expectTypeOf, it } from "vitest";
import { type ShowErrorMode, ShowErrorModes } from "./useErrorClass.js";

it("should be ensured that FormInjectedProps includes all keys of FormProps", () => {
  type ImplicitShowErrorModes = (typeof ShowErrorModes)[number];
  expectTypeOf<ShowErrorMode>().toEqualTypeOf<ImplicitShowErrorModes>();
});
