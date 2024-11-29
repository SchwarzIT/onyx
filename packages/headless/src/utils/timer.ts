import { toValue, type MaybeRefOrGetter } from "vue";

/**
 * Debounces a given callback which will only be called when not called for the given timeout.
 *
 * @returns Callback to reset the debounce timer.
 */
export const debounce = <TArgs extends unknown[]>(
  handler: (...args: TArgs) => void,
  timeout: MaybeRefOrGetter<number>,
) => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const func = (...lastArgs: TArgs) => {
    clearTimeout(timer);
    timer = setTimeout(() => handler(...lastArgs), toValue(timeout));
  };
  /** Abort the currently debounced action, if any. */
  func.abort = () => clearTimeout(timer);

  return func;
};
