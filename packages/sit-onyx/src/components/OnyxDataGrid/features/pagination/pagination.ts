import { computed, h, toRef, type Ref } from "vue";
import { createFeature, useFeatureContext } from "..";
import { applyLimits } from "../../../../utils/numbers";
import OnyxPagination from "../../../OnyxPagination/OnyxPagination.vue";
import { FILTERING_MUTATION_ORDER } from "../filtering/filtering";
import type { PaginationOptions, PaginationState } from "./types";

export const PAGINATION_FEATURE = Symbol("Pagination");

export const usePagination = (options?: PaginationOptions) =>
  createFeature((ctx) => {
    const state = toRef(
      options?.paginationState ?? { current: 1, pages: 1, pageSize: options?.pageSize ?? 25 },
    ) as Ref<PaginationState>;

    const { isEnabled, isAsync } = useFeatureContext(ctx, options);
    const isDisabled = computed(() => options?.disabled?.value ?? false);
    const shouldShowPagination = computed(
      () => state.value.pages > 1 || state.value.current > state.value.pageSize,
    );

    return {
      name: PAGINATION_FEATURE,
      watch: [state, isEnabled, isDisabled, ctx.skeleton],
      mutation: {
        order: FILTERING_MUTATION_ORDER + 1,
        func: (entries) => {
          if (!isEnabled.value() || isAsync.value) return entries;

          state.value.pages = Math.ceil(entries.length / state.value.pageSize);
          state.value.current = applyLimits(state.value.current, 1, state.value.pages);

          const startIndex = (state.value.current - 1) * state.value.pageSize;
          const endIndex = startIndex + state.value.pageSize;
          return entries.slice(startIndex, endIndex);
        },
      },
      slots: {
        pagination: () => {
          const skeleton = ctx.skeleton.value && !shouldShowPagination.value;
          if (!shouldShowPagination.value && !skeleton) return [];
          return [
            h(OnyxPagination, {
              modelValue: state.value.current,
              pages: state.value.pages,
              disabled: isDisabled.value,
              skeleton,
              "onUpdate:modelValue": (newPage) => (state.value.current = newPage),
            }),
          ];
        },
      },
    };
  });
