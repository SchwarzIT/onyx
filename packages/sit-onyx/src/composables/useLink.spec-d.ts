import { expectTypeOf, test } from "vitest";
import type { Router } from "vue-router";
import type { ProvideRouterOptions } from "./useLink.js";

test("OnProvideRouterOptions should match vue-router", () => {
  expectTypeOf<Router>().toExtend<ProvideRouterOptions>();
});
