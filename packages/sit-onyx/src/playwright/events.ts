import type { Component } from "vue";
import type { ComponentExposed } from "vue-component-type-helpers";
import type { PickEmitsFromProps } from "../types/utils.js";
import { expect } from "./a11y.js";

export type ComponentEmitHandler<C extends Component> = PickEmitsFromProps<
  ComponentExposed<C>["$props"]
>;

export const EVENT_SPY_SYMBOL = Symbol("EVENT_SPY_SYMBOL");

/**
 * Creates a simple, typed spy for recording emits.
 *
 * @example
 * ```tsx
 * // create spy
 * const onUpdateOpen = createEventSpy<typeof OnyxColorSchemeDialog, "onUpdate:open">();
 * // add spy
 * const component = await mount(<OnyxColorSchemeDialog onUpdate:open={onUpdateOpen} />);
 * // check spy
 * expectEventCall(onUpdateOpen, 1, [false]);
 * ```
 */
export const createEventSpy = <
  C extends Component,
  Key extends keyof Emits,
  Emits = ComponentEmitHandler<C>,
  Handler = NonNullable<Emits[Key]>,
  Args extends unknown[] = Handler extends (...args: infer _Args) => unknown ? _Args : unknown[],
>() => {
  const calls: Args[] = [];
  const handler = (...args: Args) => {
    calls.push(args);
  };
  handler[EVENT_SPY_SYMBOL] = calls;
  return handler;
};

/**
 * Checks the event spy created by `createEventSpy`.
 * Expects the spy to have recorded `n` calls, and `matches` to match the arguments of the last call.
 * @see `createEventSpy` documentation for example usage.
 */
export const expectEventCall = <Handler extends { [EVENT_SPY_SYMBOL]: unknown[][] }>(
  eventSpy: Handler,
  n: number,
  matches: unknown[] | Record<string, unknown>,
) => {
  const calls = eventSpy[EVENT_SPY_SYMBOL];
  expect(calls).toHaveLength(n);

  const nthCall = calls.at(n - 1);
  expect(nthCall).toMatchObject(matches);

  return nthCall;
};
