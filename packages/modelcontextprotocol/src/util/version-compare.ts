export const versionCompare = (a: string, b: string) => {
  const [aMajor, aMinor, aPatch] = (a.split("-").at(0) || "").split(".");
  const [bMajor, bMinor, bPatch] = (b.split("-").at(0) || "").split(".");

  const resMajor = Number(bMajor) - Number(aMajor);
  const resMinor = Number(bMinor) - Number(aMinor);
  const resPatch = Number(bPatch) - Number(aPatch);

  return Math.sign(resMajor || resMinor || resPatch);
};
