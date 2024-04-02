import type { ComputedRef, HtmlHTMLAttributes, Ref } from "vue";

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

export type HeadlessComposable<
  Elements extends HeadlessElements,
  State extends HeadlessState,
  Internals extends object | undefined = undefined,
> = {
  elements: Elements;
  state: State;
} & (Internals extends object
  ? {
      internals: Internals;
    }
  : {
      internals?: undefined;
    });

/**
 * We use this identity function to ensure the correct typings of the headless composables
 */
export const createBuilder = <
  P,
  Elements extends HeadlessElements,
  State extends HeadlessState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Internals extends object | undefined = undefined,
>(
  builder: (props: P) => HeadlessComposable<Elements, State, Internals>,
) => builder;
