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
          if (!skeleton.value) return [...columns];
          return columns.map((column) => ({ ...column, type: { name: "skeleton" } }));
        },
      },
      mutation: {
        func: (rows) => {
          if (!skeleton.value) return [...rows];
          let skeletonCount = typeof skeleton.value === "number" ? skeleton.value : 5;
          if (rows.length) skeletonCount = rows.length; // if previously rows were displayed, use the same row count for skeletons so the layout does not shift
          return Array.from({ length: skeletonCount }, () => ({}));
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
