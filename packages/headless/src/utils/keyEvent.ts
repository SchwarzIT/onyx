import { NAMED_KEYS_SET } from "./NamedKeys";

/**
 * Check if the `key` property of a KeyboardEvent is a printable character.
 *
 * There is no standardized or specified algorithm to check for [named keys](https://www.w3.org/TR/uievents-key/#named-key-attribute-values) vs printable characters.
 * For this check we use the provided list provided by the standard, which might be incomplete.
 */
export const isPrintableCharacter = (key: string) => !NAMED_KEYS_SET.has(key);
