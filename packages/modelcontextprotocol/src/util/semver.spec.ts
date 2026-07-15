import { describe, expect, test } from "vitest";
import { isPreRelease, parseSemver, versionCompare } from "./semver.js";

describe("versionCompare", () => {
  test.each([
    { a: "1.0.0", b: "2.0.0", result: -1 },
    { a: "1.0.0", b: "1.1.0", result: -1 },
    { a: "1.0.0", b: "1.0.1", result: -1 },
    { a: "1.0.0", b: "1.0.1", result: -1 },
    { a: "1.0.0", b: "1.0.0", result: 0 },
    { a: "1.0.0", b: "0.9.0", result: 1 },
    { a: "2.0.0", b: "1.0.0", result: 1 },
    { a: "1.1.0", b: "1.0.0", result: 1 },
    { a: "1.0.1", b: "1.0.0", result: 1 },
    { a: "1.0.1", b: "1.0.0", result: 1 },
    { a: "1.0.0-alpha", b: "1.0.0-alpha.1", result: -1 },
    { a: "1.0.0-alpha.1", b: "1.0.0-alpha.beta", result: -1 },
    { a: "1.0.0-alpha.beta", b: "1.0.0-beta", result: -1 },
    { a: "1.0.0-beta", b: "1.0.0-beta.2", result: -1 },
    { a: "1.0.0-beta.2", b: "1.0.0-beta.11", result: -1 },
    { a: "1.0.0-beta.11", b: "1.0.0-rc.1", result: -1 },
    { a: "1.0.0-rc.1", b: "1.0.0", result: -1 },
  ])("should return $result if $b is bigger than $a", ({ a, b, result }) => {
    expect(Math.sign(versionCompare(a, b))).toBe(result);
  });

  test("should be able to sort correctly", () => {
    const random = [
      "2.0.0",
      "1.0.0-beta.11",
      "1.0.0-alpha",
      "1.0.0-alpha.1",
      "1.0.0-rc.1",
      "1.0.0-beta.2",
      "1.0.0",
      "1.0.0-beta",
      "1.0.0-alpha.beta",
      "2.1.1",
      "2.1.0",
    ];

    const sorted = random.toSorted(versionCompare);

    expect(sorted).toMatchObject([
      "1.0.0-alpha",
      "1.0.0-alpha.1",
      "1.0.0-alpha.beta",
      "1.0.0-beta",
      "1.0.0-beta.2",
      "1.0.0-beta.11",
      "1.0.0-rc.1",
      "1.0.0",
      "2.0.0",
      "2.1.0",
      "2.1.1",
    ]);
  });
});

describe("parseSemver", () => {
  test.each([
    {
      version: "1.0.0",
      result: {
        major: 1,
        minor: 0,
        patch: 0,
        preRelease: "",
        buildMetadata: "",
      },
    },
    {
      version: "2.0.0",
      result: {
        major: 2,
        minor: 0,
        patch: 0,
        preRelease: "",
        buildMetadata: "",
      },
    },
    {
      version: "1.1.0",
      result: {
        major: 1,
        minor: 1,
        patch: 0,
        preRelease: "",
        buildMetadata: "",
      },
    },
    {
      version: "1.0.1",
      result: {
        major: 1,
        minor: 0,
        patch: 1,
        preRelease: "",
        buildMetadata: "",
      },
    },
    {
      version: "1.0.0-alpha",
      result: {
        major: 1,
        minor: 0,
        patch: 0,
        preRelease: "alpha",
        buildMetadata: "",
      },
    },
    {
      version: "1.0.0-alpha.1",
      result: {
        major: 1,
        minor: 0,
        patch: 0,
        preRelease: "alpha.1",
        buildMetadata: "",
      },
    },
    {
      version: "1.0.0-0.3.7",
      result: {
        major: 1,
        minor: 0,
        patch: 0,
        preRelease: "0.3.7",
        buildMetadata: "",
      },
    },
    {
      version: "1.0.0-x.7.z.92",
      result: {
        major: 1,
        minor: 0,
        patch: 0,
        preRelease: "x.7.z.92",
        buildMetadata: "",
      },
    },
    {
      version: "1.0.0-x-y-z.--",
      result: {
        major: 1,
        minor: 0,
        patch: 0,
        preRelease: "x-y-z.--",
        buildMetadata: "",
      },
    },
    {
      version: "1.0.0-alpha+001",
      result: {
        major: 1,
        minor: 0,
        patch: 0,
        preRelease: "alpha",
        buildMetadata: "001",
      },
    },
    {
      version: "1.0.0+20130313144700",
      result: {
        major: 1,
        minor: 0,
        patch: 0,
        preRelease: "",
        buildMetadata: "20130313144700",
      },
    },
    {
      version: "1.0.0-beta+exp.sha.5114f85",
      result: {
        major: 1,
        minor: 0,
        patch: 0,
        preRelease: "beta",
        buildMetadata: "exp.sha.5114f85",
      },
    },
    {
      version: "1.0.0+21AF26D3----117B344092BD.",
      result: {
        major: 1,
        minor: 0,
        patch: 0,
        preRelease: "",
        buildMetadata: "21AF26D3----117B344092BD.",
      },
    },
  ])('should return $result for version string "$version"', ({ version, result }) => {
    expect(parseSemver(version)).toMatchObject(result);
  });
});

describe("isPreRelease", () => {
  test.each([
    { version: "1.0.0", result: false },
    { version: "2.0.0", result: false },
    { version: "1.1.0", result: false },
    { version: "1.0.1", result: false },
    { version: "1.0.1", result: false },
    { version: "1.0.0-alpha", result: true },
    { version: "1.0.0-alpha.1", result: true },
    { version: "1.0.0-0.3.7", result: true },
    { version: "1.0.0-x.7.z.92", result: true },
    { version: "1.0.0-x-y-z.--", result: true },
    { version: "1.0.0-alpha+001", result: true },
    { version: "1.0.0+20130313144700", result: false },
    { version: "1.0.0-beta+exp.sha.5114f85", result: true },
    { version: "1.0.0+21AF26D3----117B344092BD.", result: false },
  ])('should return $result for version string "$version"', ({ version, result }) => {
    expect(isPreRelease(version)).toBe(result);
  });
});
