import * as changesetPre from "@changesets/pre";
import writeChangeset from "@changesets/write";
import { exec } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { generateChangeset } from "./changeset";

vi.mock("node:child_process");
vi.mock("node:fs/promises");
vi.mock("@changesets/write");

const mockExec = (newIcons: string[], deletedIcons: string[], modifiedIcons: string[]) => {
  const spy =
    vi.mocked<
      (command: Parameters<typeof exec>["0"], callback: Parameters<typeof exec>["2"]) => unknown
    >(exec);

  spy.mockImplementation((command, callback) => {
    if (command.includes("--others")) {
      callback?.(null, newIcons.join("\n"), "");
    } else if (command.includes("--deleted")) {
      callback?.(null, deletedIcons.join("\n"), "");
    } else if (command.includes("--modified")) {
      callback?.(null, modifiedIcons.join("\n"), "");
    }

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
    mockExec(
      ["newIcon1.svg", "newIcon2.svg"],
      ["deletedIcon.svg"],
      ["modifiedIcon1.svg", "modifiedIcon2.svg"],
    );

    // ACT
    await generateChangeset();

    // ASSERT
    expect(writeChangesetSpy).toHaveBeenCalledWith(
      {
        releases: [{ name: "@sit-onyx/icons", type: "major" }],
        summary: `feat: update icons

#### Deleted icons

- deletedIcon

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

  test("should release minor version if icons were added/modified", async () => {
    // ARRANGE
    const writeChangesetSpy = vi.mocked(writeChangeset);
    mockExec(["newIcon1.svg", "newIcon2.svg"], [], ["modifiedIcon1.svg", "modifiedIcon2.svg"]);

    // ACT
    await generateChangeset();

    // ASSERT
    expect(writeChangesetSpy).toHaveBeenCalledWith(
      {
        releases: [{ name: "@sit-onyx/icons", type: "minor" }],
        summary: expect.any(String),
      },
      expect.any(String), // file path,
    );
  });

  test("should release major version if icons were deleted", async () => {
    // ARRANGE
    const writeChangesetSpy = vi.mocked(writeChangeset);
    mockExec(
      ["newIcon1.svg", "newIcon2.svg"],
      ["deletedIcon.svg"],
      ["modifiedIcon1.svg", "modifiedIcon2.svg"],
    );

    // ACT
    await generateChangeset();

    // ASSERT
    expect(writeChangesetSpy).toHaveBeenCalledWith(
      {
        releases: [{ name: "@sit-onyx/icons", type: "major" }],
        summary: expect.any(String),
      },
      expect.any(String), // file path,
    );
  });

  test("should add changeset to pre.json if repo is in pre-release mode", async () => {
    // ARRANGE
    const writeChangesetSpy = vi.mocked(writeChangeset).mockResolvedValue("changeset-id-42");
    const readPreSpy = vi
      .spyOn(changesetPre, "readPreState")
      .mockResolvedValue({ changesets: ["a", "z"], initialVersions: {}, mode: "pre", tag: "" });
    const writeFileMock = vi.mocked(writeFile);

    vi.spyOn(process, "cwd").mockReturnValue("/test/cwd/packages/icons");

    mockExec(["newIcon1.svg", "newIcon2.svg"], [], ["modifiedIcon1.svg", "modifiedIcon2.svg"]);

    // ACT
    await generateChangeset();

    // ASSERT
    expect(writeChangesetSpy).toHaveBeenCalled();
    expect(readPreSpy).toHaveBeenCalled();
    expect(writeFileMock).toHaveBeenCalledWith(
      "/test/cwd/.changeset/pre.json",
      JSON.stringify(
        { changesets: ["a", "changeset-id-42", "z"], initialVersions: {}, mode: "pre", tag: "" },
        null,
        2,
      ) + "\n",
    );
  });
});
