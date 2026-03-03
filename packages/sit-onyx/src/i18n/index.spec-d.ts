import { expectTypeOf, it } from "vitest";
import type bgBG from "./locales/bg-BG.json";
import type csCZ from "./locales/cs-CZ.json";
import type deDE from "./locales/de-DE.json";
import type enUS from "./locales/en-US.json";
import type esES from "./locales/es-ES.json";
import type frFR from "./locales/fr-FR.json";
import type hrHR from "./locales/hr-HR.json";
import type itIT from "./locales/it-IT.json";
import type koKR from "./locales/ko-KR.json";
import type nlNL from "./locales/nl-NL.json";
import type plPL from "./locales/pl-PL.json";
import type ptPT from "./locales/pt-PT.json";
import type roRO from "./locales/ro-RO.json";
import type skSK from "./locales/sk-SK.json";

export type DeepRequired<T> = T extends object ? { [P in keyof T]-?: DeepRequired<T[P]> } : T;

type bgBG = DeepRequired<typeof bgBG>;
type csCZ = DeepRequired<typeof csCZ>;
type deDE = DeepRequired<typeof deDE>;
type enUS = DeepRequired<typeof enUS>;
type esES = DeepRequired<typeof esES>;
type frFR = DeepRequired<typeof frFR>;
type hrHR = DeepRequired<typeof hrHR>;
type itIT = DeepRequired<typeof itIT>;
type koKR = DeepRequired<typeof koKR>;
type nlNL = DeepRequired<typeof nlNL>;
type plPL = DeepRequired<typeof plPL>;
type ptPT = DeepRequired<typeof ptPT>;
type roRO = DeepRequired<typeof roRO>;
type skSK = DeepRequired<typeof skSK>;

it("should be ensured that all translations are maintained", async () => {
  // to generate missing translations, just run this workflow:
  // https://github.com/SchwarzIT/onyx/actions/workflows/translate.yml
  expectTypeOf<typeof enUS>().toEqualTypeOf<bgBG>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<csCZ>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<deDE>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<enUS>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<esES>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<frFR>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<hrHR>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<itIT>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<koKR>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<nlNL>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<plPL>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<ptPT>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<roRO>();
  expectTypeOf<typeof enUS>().toEqualTypeOf<skSK>();
});
