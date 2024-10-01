import writeChangeset from "@changesets/write";
import { exec } from "node:child_process";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { generateChangeset } from "./changeset";

vi.mock("node:child_process");
vi.mock("node:fs/promises");
vi.mock("@changesets/write");

const mockExec = (output: string[]) => {
  const spy =
    vi.mocked<
      (command: Parameters<typeof exec>["0"], callback: Parameters<typeof exec>["2"]) => unknown
    >(exec);

  spy.mockImplementation((command, callback) => {
    callback?.(null, output.join("\n"), "");
    return {};
  });

  return spy;
};

describe("changeset.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should generate changeset based on changed .svg icons", async () => {
    // ARRANGE
    const writeChangesetSpy = vi.mocked(writeChangeset);

    mockExec([
      "A dir/newIcon1.svg",
      "A newIcon2.svg",
      "D deletedIcon.svg",
      "M modifiedIcon1.svg",
      "M modifiedIcon2.svg",
      "R oldPath.svg -> newPath.svg",
    ]);

    // ACT
    await generateChangeset();

    // ASSERT
    expect(writeChangesetSpy).toHaveBeenCalledWith(
      {
        releases: [{ name: "@sit-onyx/icons", type: "major" }],
        summary: `feat: update icons

#### Deleted icons

- deletedIcon

#### Renamed icons

- oldPath => newPath

#### New icons

- newIcon1
- newIcon2

#### Modified icons

- modifiedIcon1
- modifiedIcon2`,
      },
      expect.any(String), // file path,
    );
  });

  test.each([
    {
      name: "icons were added/modified",
      files: ["A newIcon1.svg", "M modifiedIcon1.svg"],
      releaseType: "minor",
    },
    {
      name: "icons were deleted",
      files: ["D deletedIcon.svg"],
      releaseType: "major",
    },
    {
      name: "icons were renamed",
      files: ["R oldPath.svg -> newPath.svg"],
      releaseType: "major",
    },
  ])("should release $releaseType version if $name", async ({ files, releaseType }) => {
    // ARRANGE
    const writeChangesetSpy = vi.mocked(writeChangeset);
    mockExec(files);

    // ACT
    await generateChangeset();

    // ASSERT
    expect(writeChangesetSpy).toHaveBeenCalledWith(
      {
        releases: [{ name: "@sit-onyx/icons", type: releaseType }],
        summary: expect.any(String),
      },
      expect.any(String), // file path,
    );
  });

  test("should use fallback status if git status is unknown", async () => {
    // ARRANGE
    const writeChangesetSpy = vi.mocked(writeChangeset);

    mockExec(["?? testIcon.svg"]);

    // ACT
    await generateChangeset();

    // ASSERT
    expect(writeChangesetSpy).toHaveBeenCalledWith(
      {
        releases: [{ name: "@sit-onyx/icons", type: "minor" }],
        summary: `feat: update icons

#### New icons

- testIcon`,
      },
      expect.any(String), // file path,
    );
  });
});
