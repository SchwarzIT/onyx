import { expectTypeOf, test } from "vitest";
import type { Router } from "vue-router";
import type { ProvideRouterOptions } from "./useLink";

test("OnProvideRouterOptions should match vue-router", async () => {
  expectTypeOf<Router>().toMatchTypeOf<ProvideRouterOptions>();
});
