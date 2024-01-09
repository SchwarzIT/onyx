/** Extracts the first invalid validity type from the given validity state. */
export const getFirstInvalidType = (validity: ValidityState) => {
  // since the types are getters of the ValidityState we need to get the keys using "Object.getOwnPropertyDescriptors"
  const availableValidityTypes = Object.entries(
    Object.getOwnPropertyDescriptors(ValidityState.prototype),
  )
    .filter(([key, value]) => key !== "valid" && value.enumerable)
    .map(([key]) => key) as Exclude<keyof ValidityState, "valid">[];

  // sort valueMissing first to align with the default browser behavior
  availableValidityTypes.sort((a, b) => {
    if (a === "valueMissing") return -1;
    if (b === "valueMissing") return 1;
    return 0;
  });

  // get first invalid type
  for (const type of availableValidityTypes) {
    if (type in validity && validity[type]) return type;
  }
};
