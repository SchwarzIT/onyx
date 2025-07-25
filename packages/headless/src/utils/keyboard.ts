import { isSubsetMatching } from "./object.js";

export type PressedKey =
  | string
  | Partial<Pick<KeyboardEvent, "altKey" | "key" | "ctrlKey" | "metaKey" | "shiftKey" | "code">>;

/**
 * Check if a specified key was pressed.
 * @param event The KeyboardEvent
 * @param key The key, either the [key property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) as a string (e.g. "m")
 * or an object with the relevant key parameters, e.g. `{ key: "m", altKey: true }`
 * @returns true, if the key was pressed with the specified parameters
 */
export const wasKeyPressed = (event: KeyboardEvent, key: PressedKey) => {
  if (typeof key === "string") {
    return event.key === key;
  }
  return isSubsetMatching(
    { altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...key },
    event,
  );
};

const GRAPHEME_SEGMENTER = new Intl.Segmenter("en-US");

/**
 * Check if the `key` property of a KeyboardEvent is a printable character.
 *
 * There is no standardized or specified algorithm to check for [named keys](https://www.w3.org/TR/uievents-key/#named-key-attribute-values) vs printable characters.
 * For this check we assume that any `key` value that is a single Grapheme is a printable characters.
 * This way we can ensure that combining characters and emojis are correctly recognized without need to keep a list of all named key.
 */
export const isPrintableCharacter = (key: string) =>
  [...GRAPHEME_SEGMENTER.segment(key)].length === 1;
