import { computed, h, ref, toRef, watch, type Ref } from "vue";
import { createFeature, useFeatureContext } from "..";
import { useScrollEnd } from "../../../../composables/scrollEnd";
import { applyLimits } from "../../../../utils/numbers";
import OnyxPagination from "../../../OnyxPagination/OnyxPagination.vue";
import type { DataGridEntry } from "../../types";
import { FILTERING_MUTATION_ORDER } from "../filtering/filtering";
import "./pagination.scss";
import type { PaginationOptions, PaginationState } from "./types";

export const PAGINATION_FEATURE = Symbol("Pagination");
export const PAGINATION_LAZY_LOADING_ROW_ID = Symbol("LazyLoadingRow");

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
    const loading = computed(() => options?.loading?.value ?? false);

    const type = options?.type ?? "select";
    const scrollContainer = ref<HTMLElement>();

    const { vScrollEnd, isScrollEnd } = useScrollEnd({
      enabled: computed(() => state.value.current < state.value.pages),
      loading,
    });

    watch(isScrollEnd, (isEnd) => {
      if (!isEnd) return;
      state.value.current++;
    });

    watch(scrollContainer, () => {
      if (!scrollContainer.value) return;
      vScrollEnd.mounted(scrollContainer.value);
    });

    return {
      name: PAGINATION_FEATURE,
      watch: [state, isEnabled, isDisabled, ctx.skeleton, isScrollEnd, loading],
      mutation: {
        order: FILTERING_MUTATION_ORDER + 1,
        func: (entries) => {
          if (!isEnabled.value()) return entries;

          let _entries = entries.slice();

          if (!isAsync.value) {
            state.value.pages = Math.ceil(_entries.length / state.value.pageSize);
            state.value.current = applyLimits(state.value.current, 1, state.value.pages);

            let startIndex = (state.value.current - 1) * state.value.pageSize;
            const endIndex = startIndex + state.value.pageSize;
            if (type !== "select") startIndex = 0;

            _entries = _entries.slice(startIndex, endIndex);
          }

          if (loading.value) {
            _entries.push({
              id: PAGINATION_LAZY_LOADING_ROW_ID,
              _trAttributes: { class: "onyx-data-grid__lazy-loading-row" },
            } satisfies DataGridEntry);
          }

          return _entries;
        },
      },
      slots: {
        pagination: () => {
          if (type !== "select") return [];
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
      scrollContainerAttributes: () => ({
        ref: (el) => {
          scrollContainer.value = el;
        },
      }),
    };
  });
