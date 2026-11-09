import {
  computed,
  inject,
  onBeforeUnmount,
  provide,
  reactive,
  toValue,
  watchEffect,
  type Component,
  type InjectionKey,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";

type RenderMap = Map<PropertyKey, () => unknown>;

/**
 * Map with slot contents, used by the parent tabs element where the child tabs should be teleported
 * to to maintain the correct HTML structure.
 */
export type PortalInjectionKey = InjectionKey<RenderMap>;

export const PORTAL_INJECTION_KEY = Symbol("PORTAL_INJECTION_KEY") as PortalInjectionKey;

export type PortalOutletOptions = {
  /**
   * Key of the currently active portal item to render.
   */
  currentValue: MaybeRefOrGetter<PropertyKey>;
};

/**
 * Exposes a component to render the active content.
 * Depends on `usePortal` to provide content to render.
 */
export const usePortalOutlet = ({ currentValue }: PortalOutletOptions) => {
  const renderMap: RenderMap = reactive(new Map());
  const currentlyActive = computed(() => renderMap.get(toValue(currentValue)));

  const PortalOutlet: Component = {
    name: "PortalOutlet",
    setup() {
      return () => currentlyActive.value?.();
    },
  };

  provide(PORTAL_INJECTION_KEY, renderMap);

  return {
    /**
     * Component that renders the slot of the currently active portal item.
     */
    PortalOutlet,
  };
};

export type PortalOptions = {
  /**
   * Key identifying this portal entry.
   */
  key: Ref<PropertyKey>;
  /**
   * Slot render function to display when this portal entry is active.
   */
  slot: () => unknown;
};

/**
 * Registers a slot with the nearest parent portal outlet.
 */
export const usePortal = ({ key, slot }: PortalOptions) => {
  const renderMap = inject(PORTAL_INJECTION_KEY);

  if (!renderMap) {
    throw new Error(
      "No RenderMap was provided for `usePortal` to inject! This usually indicates that OnyxTab was used without the OnyxTabs component.",
    );
  }

  watchEffect(() => renderMap.set(key.value, slot));
  onBeforeUnmount(() => renderMap.delete(key.value));
};
