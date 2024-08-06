import type { SBType } from "@storybook/csf";

/**
 * Call a function `cb` for every type node in the storybook type tree.
 * @param inputType the root type
 * @param cb the function that is called for every type. If any non-nullish value is returned by `cb` the execution is stopped and this value is returned.
 * @param parent optional, the parent type. Is only used as input for the `cb` function and provided when recursing.
 * @returns the first non-nullish value that is returned by `cb`
 */
export const walkTree = <TValue>(
  inputType: SBType,
  cb: (sb: SBType, parent?: SBType) => TValue,
  parent?: SBType,
): TValue | undefined => {
  const shouldReturn = cb(inputType, parent);
  if (shouldReturn) {
    return shouldReturn;
  }

  if (inputType.name === "union" || inputType.name === "intersection") {
    return inputType.value.reduce<TValue | undefined>(
      (prev, it) => prev ?? walkTree(it, cb, inputType),
      undefined,
    );
  }
  if (inputType.name === "array") {
    return walkTree(inputType.value, cb, inputType);
  }
  if (inputType.name === "object") {
    return Object.values(inputType.value).reduce<TValue | undefined>(
      (prev, it) => prev ?? walkTree(it, cb, inputType),
      undefined,
    );
  }
};
