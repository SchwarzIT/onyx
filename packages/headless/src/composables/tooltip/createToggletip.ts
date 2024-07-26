import { computed, ref, toValue, type MaybeRefOrGetter } from "vue";
import { createBuilder, createElRef } from "../../utils/builder";
import { useDismissible } from "../helpers/useDismissible";
import { useOutsideClick } from "../helpers/useOutsideClick";

export type CreateToggletipOptions = {
  toggleLabel: MaybeRefOrGetter<string>;
};

export const createToggletip = createBuilder(({ toggleLabel }: CreateToggletipOptions) => {
  const triggerRef = createElRef<HTMLButtonElement>();
  const tooltipRef = createElRef<HTMLElement>();
  const isVisible = ref(false);

  // close tooltip on outside click
  useOutsideClick({
    inside: computed(() => [triggerRef.value, tooltipRef.value]),
    onOutsideClick: () => (isVisible.value = false),
    disabled: computed(() => !isVisible.value),
  });

  useDismissible({ isExpanded: isVisible });

  const toggle = () => (isVisible.value = !isVisible.value);

  return {
    elements: {
      trigger: computed(() => ({
        ref: triggerRef,
        onClick: toggle,
        "aria-label": toValue(toggleLabel),
      })),
      tooltip: {
        ref: tooltipRef,
        role: "status",
        tabindex: "-1",
      },
    },
    state: {
      isVisible,
    },
  };
});
