import { expect, test } from "@playwright/test";
import type { Component, Events } from "vue";
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
 * await expectEmit(onUpdateOpen, 1, [false]);
 * ```
 */
export const createEmitSpy = <
  C extends Component,
  Key extends keyof Emits | keyof Events | string,
  Emits = ComponentEmitProps<C>,
  Handler = Key extends keyof Emits
    ? NonNullable<Emits[Key]>
    : Key extends keyof Events
      ? (arg: Events[Key]) => void
      : unknown,
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
  matches?: unknown[],
) =>
  test.step(
    "check emitted events",
    async () => {
      await expect
        .poll(() => emitSpy[EMIT_SPY_SYMBOL], "Should have emitted at least n times.")
        .toHaveLength(n);

      const nthCall = emitSpy[EMIT_SPY_SYMBOL][n - 1];
      if (matches) {
        expect(nthCall, "Should match expected emit details.").toMatchObject(matches);
      }
      return nthCall;
    },
    { box: true },
  );
