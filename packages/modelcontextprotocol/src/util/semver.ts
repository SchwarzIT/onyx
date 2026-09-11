/**
 * Compares two semver version strings.
 * Precedence is considered based on https://semver.org.
 */
export const versionCompare = (a: string, b: string) => {
  const aParsed = parseSemver(a);
  const bParsed = parseSemver(b);

  const diffMajor = aParsed.major - bParsed.major;
  const diffMinor = aParsed.minor - bParsed.minor;
  const diffPatch = aParsed.patch - bParsed.patch;

  const result = Math.sign(diffMajor || diffMinor || diffPatch);
  if (result !== 0) {
    return result;
  }
  if (aParsed.preRelease === bParsed.preRelease) {
    return 0;
  }
  // Prerelease has a lower precedence
  if (aParsed.preRelease && !bParsed.preRelease) {
    return -1;
  }
  if (!aParsed.preRelease && bParsed.preRelease) {
    return 1;
  }
  // If both have a prerelease string, special handling is necessary
  if (aParsed.preRelease && bParsed.preRelease) {
    return preReleaseCompare(aParsed.preRelease, bParsed.preRelease);
  }
  return 0;
};

/**
 * Prerelease strings have special rules for version comparisons
 */
const preReleaseCompare = (a: string, b: string) => {
  const aIdentifier = a.split(".");
  const bIdentifier = b.split(".");
  const maxLength = Math.max(aIdentifier.length, bIdentifier.length);
  // compare each dot separated identifier
  for (let i = 0; i < maxLength; i++) {
    const aI = aIdentifier.at(i);
    const bI = bIdentifier.at(i);
    if (aI === bI) {
      continue;
    }
    // more identifiers has more precedence
    if (aI === undefined || bI === undefined) {
      return aI === undefined ? -1 : 1;
    }
    const aNum = /^\d+$/.test(aI) ? Number(aI) : undefined;
    const bNum = /^\d+$/.test(bI) ? Number(bI) : undefined;
    // Identifiers with letters or hyphens are compared lexically
    if (aNum === undefined && bNum === undefined) {
      return aI.localeCompare(bI);
    }
    // Numeric identifiers always have lower precedence
    if (aNum === undefined || bNum === undefined) {
      return aNum === undefined ? 1 : -1;
    }
    // Identifiers consisting of only digits are compared numerically
    if (aNum !== bNum) {
      return aNum - bNum;
    }
  }
  return 0;
};

export const parseSemver = (semver: string) => {
  // Build metadata MAY be denoted by appending a plus sign [...] immediately following the patch or pre-release version
  const [rest, ...buildMetadata] = semver.split("+");
  // A pre-release version MAY be denoted by appending a hyphen [...] immediately following the patch version.
  const [versions, ...preRelease] = rest.split("-");
  const [major, minor, patch] = versions.split(".");
  return {
    major: Number.parseInt(major),
    minor: Number.parseInt(minor),
    patch: Number.parseInt(patch),
    buildMetadata: buildMetadata.join("+"),
    preRelease: preRelease.join("-"),
  };
};

export const isPreRelease = (version: string) => parseSemver(version).preRelease !== "";
