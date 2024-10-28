import { inject, onBeforeUnmount, ref, useId } from "vue";
import type { HTMLOrInstanceRef } from "../../composables/useMore";
import { NAV_BAR_BUTTONS_INJECTION_KEY } from "./types";

export const useNavBarButtons = () => {
  const id = useId();
  const navButtonRef = ref<HTMLOrInstanceRef>();

  const map = inject(NAV_BAR_BUTTONS_INJECTION_KEY);

  map?.set(id, navButtonRef);
  onBeforeUnmount(() => map?.delete(id));

  return {
    /**
     * Nav button template ref.
     *
     * @example
     *
     * ```vue
     * <script lang="ts" setup
     * const { navButtonRef } = useNavBarButtons();
     * </script>
     *
     * <template
     *  <OnyxNavButton ref="navButtonRef" />
     * </template>
     * ```
     */
    navButtonRef,
  };
};
