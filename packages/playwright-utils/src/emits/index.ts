import { expect } from "@playwright/test";
import type { Component } from "vue";
import type { ComponentEmitProps } from "./types.js";

export const EMIT_SPY_SYMBOL = Symbol("EMIT_SPY_SYMBOL");

/**
 * Creates a simple, typed spy for recording emits.
 *
 * @example
 * ```tsx
 * // create spy
 * const onUpdateOpen = createEmitSpy<typeof OnyxColorSchemeDialog, "onUpdate:open">();
 * // add spy
 * const component = await mount(<OnyxColorSchemeDialog onUpdate:open={onUpdateOpen} />);
 * // check spy
 * expectEmit(onUpdateOpen, 1, [false]);
 * ```
 */
export const createEmitSpy = <
  C extends Component,
  Key extends keyof Emits,
  Emits = ComponentEmitProps<C>,
  Handler = NonNullable<Emits[Key]>,
  Args extends unknown[] = Handler extends (...args: infer _Args) => unknown ? _Args : unknown[],
>() => {
  const calls: Args[] = [];
  const handler = (...args: Args) => {
    calls.push(args);
  };
  handler[EMIT_SPY_SYMBOL] = calls;
  return handler;
};

/**
 * Asserts the emits recorded from the spy created by `createEmitSpy`.
 * Expects the spy to have recorded `n` calls, and `matches` to match the arguments of the last call.
 * @see `createEmitSpy` documentation for example usage.
 */
export const expectEmit = <Handler extends { [EMIT_SPY_SYMBOL]: unknown[][] }>(
  emitSpy: Handler,
  n: number,
  matches: unknown[],
) => {
  const calls = emitSpy[EMIT_SPY_SYMBOL];
  expect(calls).toHaveLength(n);

  const nthCall = calls[n - 1];
  expect(nthCall).toMatchObject(matches);

  return nthCall;
};
