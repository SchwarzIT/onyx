import { computed, toRef, toValue, type MaybeRefOrGetter, type Ref } from "vue";
import { createBuilder, createElRef } from "../../utils/builder";
import { useDismissible } from "../helpers/useDismissible";
import { useOutsideClick } from "../helpers/useOutsideClick";

export type CreateToggletipOptions = {
  toggleLabel: MaybeRefOrGetter<string>;
  isVisible?: Ref<boolean>;
};

/**
 * Create a toggletip as described in https://inclusive-components.design/tooltips-toggletips/
 * Its visibility is toggled on click.
 * Therefore a toggletip MUST NOT be used to describe the associated trigger element.
 * Commonly this pattern uses a button with the ⓘ as the trigger element.
 * To describe the associated element use `createTooltip`.
 */
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
        /**
         * The element which controls the toggletip visibility:
         * Preferably a `button` element.
         */
        trigger: computed(() => ({
          ref: triggerRef,
          onClick: toggle,
          "aria-label": toValue(toggleLabel),
        })),
        /**
         * The element with the relevant toggletip content.
         * Only simple, textual content is allowed.
         */
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
