import type { ComputedRef } from "vue";
import { createFeature } from "..";
import {
  DATE_RENDERER,
  DATETIME_RENDERER,
  NUMBER_RENDERER,
  SKELETON_RENDERER,
  STRING_RENDERER,
  TIME_RENDERER,
  TIMESTAMP_RENDERER,
} from "../renderer";
import "./base.scss";

export const BASE_FEATURE_SYMBOL = Symbol("Base");

export type BaseFeatureOptions = {
  skeleton: ComputedRef<number | boolean>;
};

/**
 * The Base feature includes everything that should be provided as built-in functionality of the `OnyxDataGrid` component.
 */
export const BASE_FEATURE = createFeature(
  ({ skeleton }) =>
    ({
      name: BASE_FEATURE_SYMBOL,
      modifyColumns: {
        func: (columns) => {
          if (skeleton.value) {
            return columns.map((column) => ({
              ...column,
              type: { name: "skeleton" },
            }));
          } else {
            return [...columns];
          }
        },
      },
      mutation: {
        func: (rows) => {
          if (skeleton.value) {
            const skeletonCount = typeof skeleton.value === "number" ? skeleton.value : 5;
            return Array.from({ length: skeletonCount }, () => ({}));
          }
          return [...rows];
        },
      },
      scrollContainerAttributes: () => ({
        class: skeleton.value ? "onyx-data-grid--skeleton" : "",
      }),
      watch: [skeleton],
      typeRenderer: {
        number: NUMBER_RENDERER,
        string: STRING_RENDERER,
        date: DATE_RENDERER,
        "datetime-local": DATETIME_RENDERER,
        time: TIME_RENDERER,
        timestamp: TIMESTAMP_RENDERER,
        skeleton: SKELETON_RENDERER,
      },
    }) as const,
);
