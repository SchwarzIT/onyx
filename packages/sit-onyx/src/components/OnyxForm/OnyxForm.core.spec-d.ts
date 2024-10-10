import { expectTypeOf, it } from "vitest";
import { type __DONT_USE_VUE_FIX_KeyOfFormProps, type FormProps } from "./OnyxForm.core";

it("should be ensured that _KeyofFormProps includes all keys of FormProps", async () => {
  expectTypeOf<keyof FormProps>().toMatchTypeOf<__DONT_USE_VUE_FIX_KeyOfFormProps>();
  expectTypeOf<__DONT_USE_VUE_FIX_KeyOfFormProps>().toMatchTypeOf<keyof FormProps>();
});
