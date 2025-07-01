import { computed, inject, provide, type ComputedRef, type InjectionKey, type Reactive } from "vue";
import { userConsole } from "../utils/console";

const SKELETON_INJECTION_KEY = Symbol() as InjectionKey<
  ReturnType<typeof createSkeletonInjectionContext>
>;

/**
 * Prop on the parent component.
 * It's value is provided, so that it can be used in child components.
 */
export type SkeletonProvidedProp = {
  /**
   * Whether to show all supported child components as skeleton.
   * Can be overridden on each child component if necessary.
   */
  skeleton: boolean;
};

/**
 * Prop that may be used by the child components.
 */
type LocalProps = {
  skeleton: symbol | boolean | number;
};

/**
 * Symbol for the skeleton injected property.
 */
export const SKELETON_INJECTED_SYMBOL = Symbol("SKELETON_INJECTED_SYMBOL");
export type SKELETON_INJECTED = symbol; // we can't use `typeof SKELETON_INJECTED_SYMBOL` as vue is unable to infer its type: https://github.com/SchwarzIT/onyx/issues/1980
/**
 * Prop type used by child elements, which indicates that the prop value is taken from the parent by default.
 * The prop **MUST** use `SKELETON_INJECTED_SYMBOL` as default value.
 * `useSkeletonContext` is used to access the injected parent property.
 *
 * NOTE: The number type is used only for OnyxRadioGroup and OnyxCheckboxGroup components.
 * NOTE: The number type is not intended to be used by other properties with boolean skeleton prop.
 *
 * @example
 * ```ts
 * const props = withDefaults(defineProps<OnyxComponentProps>(), {
 *   skeleton: SKELETON_INJECTED_SYMBOL,
 * });
 *
 * const skeleton = useSkeletonContext(props);
 * ```
 */

export type SkeletonInjected = symbol | boolean | number;

const createSkeletonInjectionContext =
  (parentElementProps?: SkeletonProvidedProp) =>
  (props: Reactive<LocalProps>): ComputedRef<boolean | number> =>
    computed(() => {
      if (typeof props.skeleton !== "symbol") {
        return props.skeleton;
      }
      if (props.skeleton === SKELETON_INJECTED_SYMBOL) {
        return parentElementProps?.skeleton === true ? 3 : false;
      }
      userConsole?.warn(
        `skeleton prop is an recognized symbol: %o which is not identical to the symbol %o. This should not happen and is probably a bug in onyx.`,
        props.skeleton,
        SKELETON_INJECTED_SYMBOL,
      );
      return false;
    });

export const provideSkeletonContext = (
  parentElementProps: Reactive<SkeletonProvidedProp> | undefined,
) => provide(SKELETON_INJECTION_KEY, createSkeletonInjectionContext(parentElementProps));

const DEFAULT_SKELETON_INJECTION_CONTEXT = createSkeletonInjectionContext();
/**
 * Provides the injected parent property (if available).
 * Otherwise a defined default is used.
 * A prop defined on the child component will always take precedence over the injected parent property.
 *
 * The prop **MUST** use `SKELETON_INJECTED_SYMBOL` as default value.
 * The type `SkeletonInjected<T>` can be used as PropType wrapper.
 *
 * @example
 * ```ts
 * const props = withDefaults(defineProps<OnyxComponentProps>(), {
 *   skeleton: SKELETON_INJECTED_SYMBOL, // By default, the parent injected value is used
 * });
 *
 * const skeleton = useSkeletonContext(props);
 * ```
 */
export const useSkeletonContext = (props: Reactive<LocalProps>) => {
  return inject(
    SKELETON_INJECTION_KEY,
    /** Default */
    DEFAULT_SKELETON_INJECTION_CONTEXT,
  )(props);
};
