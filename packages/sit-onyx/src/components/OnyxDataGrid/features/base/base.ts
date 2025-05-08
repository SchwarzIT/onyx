import { createFeature } from "..";
import {
  DATE_RENDERER,
  DATETIME_RENDERER,
  NUMBER_RENDERER,
  STRING_RENDERER,
  TIME_RENDERER,
  TIMESTAMP_RENDERER,
} from "../renderer";

export const BASE_FEATURE_SYMBOL = Symbol("Base");

export const BASE_FEATURE = createFeature(
  () =>
    ({
      name: BASE_FEATURE_SYMBOL,
      typeRenderer: {
        number: NUMBER_RENDERER,
        string: STRING_RENDERER,
        date: DATE_RENDERER,
        "datetime-local": DATETIME_RENDERER,
        time: TIME_RENDERER,
        timestamp: TIMESTAMP_RENDERER,
      },
    }) as const,
)();
