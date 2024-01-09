/** Extracts the first invalid validity type from the given validity state. */
export const getFirstInvalidType = (validity: ValidityState) => {
  // since the types are getters of the ValidityState we need to get the keys using "Object.getOwnPropertyDescriptors"
  const availableValidityTypes = Object.entries(
    Object.getOwnPropertyDescriptors(ValidityState.prototype),
  )
    .filter(([key, value]) => key !== "valid" && value.enumerable)
    .map(([key]) => key) as Exclude<keyof ValidityState, "valid">[];

  // get first invalid type
  for (const type of availableValidityTypes) {
    if (type in validity && validity[type]) return type;
  }
};
