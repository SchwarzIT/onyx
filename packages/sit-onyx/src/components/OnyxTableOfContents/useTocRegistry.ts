import {
  inject,
  onBeforeUnmount,
  toValue,
  watch,
  type InjectionKey,
  type Ref,
  type ShallowRef,
} from "vue";
import { useIntersectionObserver } from "../../composables/useIntersectionObserver.js";
import { type VueTemplateRefElement } from "../../composables/useResizeObserver.js";

export const TOC_REGISTRY_INJECTION_KEY = Symbol() as InjectionKey<{
  registry: Set<string>;
}>;

export type UseTocRegistryOptions = {
  /**
   * Hash (without leading #).
   */
  hash: Ref<string | undefined>;
  /**
   * Template ref to the component (e.g. headline).
   */
  templateRef: Readonly<ShallowRef<VueTemplateRefElement>>;
};

export const useTocRegistry = (options: UseTocRegistryOptions) => {
  const context = inject(TOC_REGISTRY_INJECTION_KEY, undefined);
  if (!context) return;

  const { isIntersecting } = useIntersectionObserver(options.templateRef, {});

  watch(isIntersecting, (isVisible) => {
    const hash = toValue(options.hash);
    if (!hash) return;
    if (isVisible) context.registry.add(hash);
    else context.registry.delete(hash);
  });

  // remove old values when hash changes
  watch(options.hash, (newHash, oldHash) => {
    if (oldHash == undefined || !context.registry.has(oldHash)) return;
    if (newHash != undefined) context.registry.add(newHash);
  });

  onBeforeUnmount(() => {
    const hash = options.hash.value;
    if (hash != undefined) context.registry.delete(hash);
  });
};
