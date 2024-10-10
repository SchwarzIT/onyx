import { computed, inject, provide, type ComputedRef, type InjectionKey, type Reactive } from "vue";

const SKELETON_INJECTION_KEY = Symbol() as InjectionKey<
  ReturnType<typeof createSkeletonInjectionContext>
>;

/**
 * Props on the parent component.
 * These are injected, so that they can be used in any child components.
 */
export type SkeletonInjectedProps = {
  skeleton: boolean;
};

/**
 * Props that may be used by the child components.
 */
type LocalProps = {
  skeleton: SKELETON_INJECTED | boolean;
};

/**
 * Symbol for the skeleton injected properties.
 */
export const SKELETON_INJECTED_SYMBOL = Symbol("SKELETON_INJECTED_SYMBOL");
export type SKELETON_INJECTED = typeof SKELETON_INJECTED_SYMBOL;
/**
 * Prop type used by the child elements, which indicates that the prop value is taken from the parent by default.
 * The props **MUST** use `SKELETON_INJECTED_SYMBOL` as default value.
 * `useSkeletonContext` is used to access the injected parent properties.
 *
 * @example
 * ```ts
 * const props = withDefaults(defineProps<OnyxComponentProps>(), {
 *   skeleton: SKELETON_INJECTED_SYMBOL,
 * });
 *
 * const { skeleton } = useSkeletonContext(props);
 * ```
 */

export type SkeletonInjected = SKELETON_INJECTED | boolean;

const createSkeletonInjectionContext =
  (parentElementProps?: SkeletonInjectedProps) =>
  (props: Reactive<LocalProps>): ComputedRef<boolean> =>
    computed(() => {
      if (props.skeleton !== SKELETON_INJECTED_SYMBOL) {
        return props.skeleton;
      }

      return parentElementProps?.skeleton ?? false;
    });

export const provideSkeletonContext = (
  parentElementProps: Reactive<SkeletonInjectedProps> | undefined,
) => provide(SKELETON_INJECTION_KEY, createSkeletonInjectionContext(parentElementProps));

const DEFAULT_SKELETON_INJECTION_CONTEXT = createSkeletonInjectionContext();
/**
 * Provides the injected parent properties (if available).
 * Otherwise a defined default is used.
 * A prop defined on the child component will always take precedence over the injected parent properties.
 *
 * The props **MUST** use `SKELETON_INJECTED_SYMBOL` as default value.
 * The type `SkeletonInjected<T>` can be used as PropType wrapper.
 *
 * @example
 * ```ts
 * const props = withDefaults(defineProps<OnyxComponentProps>(), {
 *   skeleton: SKELETON_INJECTED_SYMBOL, // By default, the parent injected value is used
 * });
 *
 * const { skeleton } = useSkeletonContext(props);
 * ```
 */
export const useSkeletonContext = (props: Reactive<LocalProps>) => {
  return inject(
    SKELETON_INJECTION_KEY,
    /** Default */
    DEFAULT_SKELETON_INJECTION_CONTEXT,
  )(props);
};
