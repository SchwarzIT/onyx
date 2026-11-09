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
  currentValue: MaybeRefOrGetter<PropertyKey>;
};

export const usePortalOutlet = ({ currentValue }: PortalOutletOptions) => {
  const renderMap: RenderMap = reactive(new Map());
  const currentlyActive = computed(() => renderMap.get(toValue(currentValue)));

  const PortalOut: Component = {
    name: "PortalOut",
    setup() {
      return () => currentlyActive.value?.();
    },
  };

  provide(PORTAL_INJECTION_KEY, renderMap);

  return { PortalOut };
};

export type PortalOptions = {
  key: Ref<PropertyKey>;
  slot: () => unknown;
};

export const usePortal = ({ key, slot }: PortalOptions) => {
  const renderMap = inject(PORTAL_INJECTION_KEY);

  if (!renderMap) {
    throw new Error("No RenderMap was provided for `usePortal` to be used!");
  }

  watchEffect(() => renderMap.set(key.value, slot));
  onBeforeUnmount(() => renderMap.delete(key.value));
};
