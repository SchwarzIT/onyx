import { computed, h, toRef, type Ref } from "vue";
import { createFeature, useFeatureContext } from "..";
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
    const isLoading = computed(() => options?.loading?.value ?? false);
    const shouldShowPagination = computed(
      () => state.value.pages > 1 || state.value.current > state.value.pageSize,
    );

    return {
      name: PAGINATION_FEATURE,
      watch: [state, isEnabled, ctx.skeleton, isLoading],
      mutation: {
        order: FILTERING_MUTATION_ORDER + 1,
        func: (entries) => {
          if (!isEnabled.value() || isAsync.value) return entries;

          state.value.pages = Math.ceil(entries.length / state.value.pageSize);
          state.value.current = Math.min(state.value.current, state.value.pages);

          const startIndex = (state.value.current - 1) * state.value.pageSize;
          const endIndex = startIndex + state.value.pageSize;
          return entries.slice(startIndex, endIndex);
        },
      },
      slots: {
        pagination: () =>
          shouldShowPagination.value
            ? [
                h(OnyxPagination, {
                  modelValue: state.value.current,
                  pages: state.value.pages,
                  skeleton: isLoading.value ? false : ctx.skeleton.value,
                  disabled: isLoading.value,
                  "onUpdate:modelValue": (newPage) => (state.value.current = newPage),
                }),
              ]
            : [],
      },
    };
  });
