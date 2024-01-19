const getValidityStateProperties = () =>
  Object.entries(Object.getOwnPropertyDescriptors(ValidityState.prototype))
    .filter(([_, value]) => value.enumerable)
    .map(([key]) => key) as (keyof ValidityState)[];

/**
 * The standard HTML ValidityState is an object with getter properties.
 * This makes it hard to compare changes. With below function, we iterate through all
 * getters and transform them to properties of a new blanc object.
 */
export const transformValidityStateToObject = (validityState: ValidityState): ValidityState => {
  return getValidityStateProperties().reduce<Record<keyof ValidityState, boolean>>(
    (validityStateCopy, key) => {
      validityStateCopy[key] = validityState[key];
      return validityStateCopy;
    },
    {} as Record<keyof ValidityState, boolean>,
  );
};

/**
 * Extracts the first invalid validity type from the given HTML ValidityState.
 * "valueMissing" is prioritized over other types to align with the default browser behavior.
 */
export const getFirstInvalidType = (validity: ValidityState) => {
  // prefer valueMissing to align with the default browser behavior
  if (validity.valueMissing) return "valueMissing";

  // since the types are getters of the ValidityState we need to get the keys using "Object.getOwnPropertyDescriptors"
  const availableValidityTypes = getValidityStateProperties().filter(
    (key) => key !== "valid",
  ) as Exclude<keyof ValidityState, "valid">[];

  // get first invalid type
  for (const type of availableValidityTypes) {
    if (type in validity && validity[type]) return type;
  }
};
