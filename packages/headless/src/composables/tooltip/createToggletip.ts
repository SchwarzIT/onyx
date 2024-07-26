import { computed, toRef, toValue, type MaybeRefOrGetter, type Ref } from "vue";
import { createBuilder, createElRef } from "../../utils/builder";
import { useDismissible } from "../helpers/useDismissible";
import { useOutsideClick } from "../helpers/useOutsideClick";

export type CreateToggletipOptions = {
  toggleLabel: MaybeRefOrGetter<string>;
  isVisible?: Ref<boolean>;
};

export const createToggletip = createBuilder(
  ({ toggleLabel, isVisible }: CreateToggletipOptions) => {
    const triggerRef = createElRef<HTMLButtonElement>();
    const tooltipRef = createElRef<HTMLElement>();
    const _isVisible = toRef(isVisible ?? false);

    // close tooltip on outside click
    useOutsideClick({
      inside: computed(() => [triggerRef.value, tooltipRef.value]),
      onOutsideClick: () => (_isVisible.value = false),
      disabled: computed(() => !_isVisible.value),
    });

    useDismissible({ isExpanded: _isVisible });

    const toggle = () => (_isVisible.value = !_isVisible.value);

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
        isVisible: _isVisible,
      },
    };
  },
);
