import { computed, type ComputedRef, type HtmlHTMLAttributes, type Ref } from "vue";

export type IteratedHeadlessElementFunc<T extends Record<string, unknown>> = (
  opts: T,
) => HtmlHTMLAttributes;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HeadlessElementAttributes = HtmlHTMLAttributes | IteratedHeadlessElementFunc<any>;

export type HeadlessElements = Record<
  string,
  HeadlessElementAttributes | ComputedRef<HeadlessElementAttributes>
>;

export type HeadlessState = Record<string, Ref>;

export type HeadlessComposable<Elements extends HeadlessElements, State extends HeadlessState> = {
  elements: Elements;
  state: State;
};

/**
 * We use this identity function to ensure the correct typings of the headless composables
 */
export const createBuilder = <P, Elements extends HeadlessElements, State extends HeadlessState>(
  builder: (props?: P) => HeadlessComposable<Elements, State>,
) => builder;

/**
 * Shorthand function for creating a typed IteratedHeadlessElementFunction
 * @example
 * ```ts
 * {
 *   option: computeIterated<{ key: string; label: string; disabled: boolean }>(
 *     ({ key, label, disabled }) => ({
 *       // Do something with the typed props
 *     }),
 * }
 * ```
 */
export const computeIterated = <P extends Record<string, unknown>>(
  iteratedFunc: IteratedHeadlessElementFunc<P>,
) => computed(() => iteratedFunc);
