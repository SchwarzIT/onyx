import { computed, toRef, toValue, useId, type MaybeRefOrGetter, type Ref } from "vue";
import { createBuilder } from "../../utils/builder";
import { useDismissible } from "../helpers/useDismissible";

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
    const triggerId = useId();

    const _isVisible = toRef(isVisible ?? false);

    useDismissible({ isExpanded: _isVisible });

    const toggle = () => (_isVisible.value = !_isVisible.value);

    return {
      elements: {
        /**
         * The element which controls the toggletip visibility:
         * Preferably a `button` element.
         */
        trigger: computed(() => ({
          id: triggerId,
          onClick: toggle,
          style: `--anchor-${triggerId}`,
          "aria-label": toValue(toggleLabel),
        })),
        /**
         * The element with the relevant toggletip content.
         * Only simple, textual content is allowed.
         */
        tooltip: {
          onToggle: (e: Event) => {
            const tooltip = e.target as HTMLDialogElement;
            _isVisible.value = tooltip.matches(":popover-open");
          },
          anchor: triggerId,
          popover: "auto",
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
