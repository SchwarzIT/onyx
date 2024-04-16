/**
 * Debounces a given callback which will only be called when not called for the given timeout.
 *
 * @returns Callback to reset the debounce timer.
 */
export const debounce = <TArgs extends unknown[]>(
  handler: (...args: TArgs) => void,
  timeout: number,
) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...lastArgs: TArgs) => {
    clearTimeout(timer);
    timer = setTimeout(() => handler(...lastArgs), timeout);
  };
};
