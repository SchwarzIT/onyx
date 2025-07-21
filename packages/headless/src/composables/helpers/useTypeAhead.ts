import { isPrintableCharacter } from "../../utils/keyboard.js";
import { debounce } from "../../utils/timer.js";

/**
 * Enhances typeAhead to combine multiple inputs in quick succession and filter out non-printable characters.
 *
 * @example
 * ```ts
 * const typeAhead = useTypeAhead((inputString) => console.log("Typed string:", inputString));
 * // ...
 * addEventListener("keydown", typeAhead);
 * ```
 */
export const useTypeAhead = (callback: (input: string) => void, timeout = 500) => {
  let inputString = "";
  const debouncedReset = debounce(() => (inputString = ""), timeout);

  return (event: Pick<KeyboardEvent, "key">) => {
    if (!isPrintableCharacter(event.key)) {
      return;
    }
    debouncedReset();
    inputString = `${inputString}${event.key}`;
    callback(inputString);
  };
};
