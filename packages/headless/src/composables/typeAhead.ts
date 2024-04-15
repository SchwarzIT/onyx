import { isPrintableCharacter } from "../utils/keyEvent";
import { debounce } from "../utils/timer";

/**
 * Enhances typeahead to combine multiple inputs in quick succession and filter out non-printable characters.
 *
 * @example
 * ```ts
 * const typeAhead = useTypeAhead((inputString) => onTypeAhead(inputString));
 * // ...
 * const onKeydown = (key: KeyboardEvent) => typeAhead(key.event);
 * ```
 */
export const useTypeAhead = (callback: (input: string) => void) => {
  let inputString = "";
  const debouncedReset = debounce(() => (inputString = ""), 500);

  return (event: KeyboardEvent) => {
    if (!isPrintableCharacter(event.key)) {
      return;
    }
    debouncedReset();
    inputString = `${inputString}${event.key}`;
    callback(inputString);
  };
};
