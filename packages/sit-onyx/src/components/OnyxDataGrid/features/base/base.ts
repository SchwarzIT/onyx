import { computed, h, ref, toValue } from "vue";
import { createFeature } from "..";
import OnyxHeadline from "../../../OnyxHeadline/OnyxHeadline.vue";
import type { DataGridHeadline } from "../../types";
import { FILTERING_MUTATION_ORDER } from "../filtering/filtering";
import { PAGINATION_MUTATION_ORDER } from "../pagination/pagination";
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
import type { BaseFeatureOptions } from "./types";

export const BASE_FEATURE_SYMBOL = Symbol("Base");

/**
 * The Base feature includes everything that should be provided as built-in functionality of the `OnyxDataGrid` component.
 */
export const BASE_FEATURE = (options?: BaseFeatureOptions) =>
  createFeature(({ skeleton }) => {
    const rowCount = ref(0);

    const headline = computed(() => {
      const _headline = toValue(options?.headline);
      if (!_headline) return;
      return {
        is: "h3",
        ...(typeof _headline === "string" ? { text: _headline } : _headline),
      } satisfies DataGridHeadline;
    });

    return {
      name: BASE_FEATURE_SYMBOL,
      watch: [skeleton, headline],
      modifyColumns: {
        func: (columns) => {
          if (!skeleton.value) return [...columns];
          return columns.map((column) => ({ ...column, type: { name: "skeleton" } }));
        },
      },
      mutation: {
        order: Math.max(FILTERING_MUTATION_ORDER, PAGINATION_MUTATION_ORDER) + 1,
        func: (rows) => {
          rowCount.value = rows.length;
          if (!skeleton.value) return [...rows];
          let skeletonCount = typeof skeleton.value === "number" ? skeleton.value : 5;
          if (rows.length) skeletonCount = rows.length; // if previously rows were displayed, use the same row count for skeletons so the layout does not shift
          return Array.from({ length: skeletonCount }, () => ({}));
        },
      },
      scrollContainerAttributes: () => ({
        class: skeleton.value ? "onyx-data-grid--skeleton" : "",
      }),
      typeRenderer: {
        number: NUMBER_RENDERER,
        string: STRING_RENDERER,
        date: DATE_RENDERER,
        "datetime-local": DATETIME_RENDERER,
        time: TIME_RENDERER,
        timestamp: TIMESTAMP_RENDERER,
        skeleton: SKELETON_RENDERER,
      },
      slots: {
        headline: (slotContent) => {
          if (!headline.value) return slotContent();

          return [
            h(OnyxHeadline, headline.value, () => [
              headline.value?.text,
              headline.value?.rowCount && !skeleton.value
                ? h(
                    "span",
                    { class: "onyx-data-grid__headline-count" },
                    ` (${typeof headline.value.rowCount === "number" ? headline.value.rowCount : rowCount.value})`,
                  )
                : null,
            ]),
            ...slotContent(),
          ];
        },
      },
    } as const;
  });
