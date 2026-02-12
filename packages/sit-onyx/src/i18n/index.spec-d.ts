import { expectTypeOf, it } from "vitest";
import type * as DE from "./locales/de-DE.json";
import type * as EN from "./locales/en-US.json";

it("should be ensured that all translations are maintained for German and English", async () => {
  expectTypeOf<typeof DE>().toEqualTypeOf<typeof EN>();
});
