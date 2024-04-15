export const debounce = <TArgs extends unknown[]>(
  handler: (...args: TArgs) => void,
  timeout: number,
) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...lastArgs: TArgs) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handler(...lastArgs);
    }, timeout);
  };
};
