import { isPrintableCharacter } from "../utils/keyEvent";
import { debounce } from "../utils/timer";

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
