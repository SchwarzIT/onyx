import {
  computed,
  shallowRef,
  type ComponentPublicInstance,
  type HTMLAttributes,
  type MaybeRef,
  type Ref,
  type WritableComputedOptions,
  type WritableComputedRef,
} from "vue";
import type { IfDefined } from "./types";

/**
 * Properties as they can be used by `v-bind` on an HTML element.
 * This includes generic html attributes and the vue reserved `ref` property.
 * `ref` is restricted to be a `HeadlessElRef` which only can by created through `createElRef`.
 */
export type VBindAttributes<
  A extends HTMLAttributes = HTMLAttributes,
  E extends Element = Element,
> = A & {
  ref?: VueTemplateRef<E>;
};

export type IteratedHeadlessElementFunc<
  A extends HTMLAttributes,
  T extends Record<string, unknown>,
> = (opts: T) => VBindAttributes<A>;

export type HeadlessElementAttributes<A extends HTMLAttributes> =
  | VBindAttributes<A>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- the specific type doesn't matter here
  | IteratedHeadlessElementFunc<A, any>;

export type HeadlessElements = Record<string, MaybeRef<HeadlessElementAttributes<HTMLAttributes>>>;

export type HeadlessState = Record<string, Ref>;

export type HeadlessComposable<
  Elements extends HeadlessElements,
  State extends HeadlessState | undefined = undefined,
  Internals extends object | undefined = undefined,
> = {
  elements: Elements;
} & IfDefined<"internals", Internals> &
  IfDefined<"state", State>;

/**
 * We use this identity function to ensure the correct typings of the headless composables
 * @example
 * ```ts
 * export const createTooltip = createBuilder(({ initialVisible }: CreateTooltipOptions) => {
 *   const tooltipId = useId();
 *   const isVisible = ref(initialVisible);
 *
 *   const hoverEvents = {
 *     onMouseover: () => (isVisible.value = true),
 *     onMouseout: () => (isVisible.value = false),
 *     onFocusin: () => (isVisible.value = true),
 *     onFocusout: () => (isVisible.value = false),
 *   };
 *
 *   return {
 *     elements: {
 *       trigger: {
 *         "aria-describedby": tooltipId,
 *         ...hoverEvents,
 *       },
 *       tooltip: {
 *         role: "tooltip",
 *         id: tooltipId,
 *         tabindex: "-1",
 *         ...hoverEvents,
 *       },
 *     },
 *     state: {
 *       isVisible,
 *     },
 *   };
 * });
 *
 * ```
 */
export const createBuilder = <
  Args extends unknown[] = unknown[],
  Elements extends HeadlessElements = HeadlessElements,
  State extends HeadlessState | undefined = undefined,
  Internals extends object | undefined = undefined,
>(
  builder: (...args: Args) => HeadlessComposable<Elements, State, Internals>,
) => builder;

type VueTemplateRefElement<E extends Element> = E | (ComponentPublicInstance & { $el: E }) | null;
type VueTemplateRef<E extends Element> = Ref<VueTemplateRefElement<E>>;

declare const HeadlessElRefSymbol: unique symbol;
type HeadlessElRef<E extends Element> = WritableComputedRef<E> & {
  /**
   * type differentiator
   * ensures that only `createElRef` can be used for headless element ref bindings
   */
  [HeadlessElRefSymbol]: true;
};

/**
 * Creates a special writeable computed that references a DOM Element.
 * Vue Component references will be unwrapped.
 * @example
 * ```ts
 * createBuilder() => {
 *  const buttonRef = createElRef<HtmlButtonElement>();
 *  return {
 *    elements: {
 *      button: {
 *        ref: buttonRef,
 *      },
 *    }
 *  };
 * });
 * ```
 */
export function createElRef<E extends Element>(): HeadlessElRef<E>;
export function createElRef<
  E extends Element,
  V extends VueTemplateRefElement<E> = VueTemplateRefElement<E>,
>() {
  const elementRef = shallowRef<E>();

  return computed({
    set: (element: V) => {
      elementRef.value = element != null && "$el" in element ? element.$el : (element as E);
    },
    get: () => elementRef.value,
  } as WritableComputedOptions<E>);
}
