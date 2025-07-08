import type { DataGridEntry } from "../../types.ts";
import type { DefaultSupportedTypes } from "../index.ts";
import type { Compare } from "./types.ts";

export const STRING_COMPARE = (a: unknown, b: unknown, collator: Intl.Collator) =>
  collator.compare(String(a), String(b));

export const NUMBER_COMPARE = (a: unknown, b: unknown) => Number(a) - Number(b);

export const DEFAULT_COMPARES: Record<PropertyKey, Compare<unknown>> = Object.freeze({
  string: STRING_COMPARE,
  number: NUMBER_COMPARE,
  date: NUMBER_COMPARE,
  "datetime-local": NUMBER_COMPARE,
  time: NUMBER_COMPARE,
  timestamp: NUMBER_COMPARE,
  skeleton: () => 0,
}) satisfies Record<DefaultSupportedTypes, Compare<DataGridEntry>>;
