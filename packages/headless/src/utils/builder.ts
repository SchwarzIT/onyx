import type { ComputedRef, HtmlHTMLAttributes, Ref } from "vue";
import type { IfDefined } from "./types";

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
  State extends HeadlessState | undefined = undefined,
  Internals extends object | undefined = undefined,
> = {
  elements: Elements;
} & IfDefined<"internals", Internals> &
  IfDefined<"state", State>;

/**
 * We use this identity function to ensure the correct typings of the headless composables
 */
export const createBuilder = <
  Args extends unknown[] = unknown[],
  Elements extends HeadlessElements = HeadlessElements,
  State extends HeadlessState | undefined = undefined,
  Internals extends object | undefined = undefined,
>(
  builder: (...args: Args) => HeadlessComposable<Elements, State, Internals>,
) => builder;
