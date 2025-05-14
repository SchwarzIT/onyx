import writeChangeset from "@changesets/write";
import { exec as nodeExec } from "node:child_process";
import path from "node:path";
import { exit } from "node:process";

export type GenerateChangesetOptions = {
  /**
   * Changeset title / headline.
   */
  title: string;
  /**
   * Name of the npm package
   */
  packageName: string;
  /**
   * Directory to find changed files in.
   *
   * @default "."
   */
  directory?: string;
};

/**
 * Creates a changeset with a list of added, changed, removed and renamed files (determined by git).
 * Useful for creating changesets/changelogs for changed icons, flags etc.
 */
export async function generateChangeset(options: GenerateChangesetOptions) {
  const changedFiles = await getChangedFiles(options);

  if (!changedFiles.length) {
    console.log("No files changed.");
    exit();
  }

  console.log(`Found ${changedFiles.length} changed files`);

  const changesetCwd = path.join(process.cwd(), "..", "..");
  const hasBreakingChanges = changedFiles.some(
    (icon) => icon.status === "deleted" || icon.status === "renamed",
  );

  await writeChangeset(
    {
      releases: [
        {
          name: options.packageName,
          type: hasBreakingChanges ? "major" : "minor",
        },
      ],
      summary: getChangesetSummary(changedFiles, options),
    },
    changesetCwd,
  );

  console.log("Wrote changeset");
}

/**
 * Gets a list of changed files based on their git status (added, modifier, deleted or renamed).
 * Will be sorted alphabetically by file path/name.
 */
async function getChangedFiles(options: Pick<GenerateChangesetOptions, "directory">) {
  const { stdout } = await exec(`git status --porcelain ${options.directory ?? "."}`);
  const changes = stdout
    .split("\n")
    .filter((i) => !!i)
    .map((i) => i.trim());

  const gitStatusMap = {
    A: "added",
    M: "modified",
    D: "deleted",
    R: "renamed",
  } satisfies Record<string, GitFileStatus>;

  return changes
    .map<GitStatusFile>((change) => {
      // format: status filename (if renamed: "-> new-path")
      const parts = change
        .split(" ")
        .map((part) => part.trim())
        .filter((part) => !!part);
      const status: GitFileStatus = gitStatusMap[parts[0]] ?? "added";
      const path = parts[1];

      if (status === "renamed") {
        return {
          status: "renamed",
          path: parts.at(-1)!,
          oldPath: path,
        };
      }

      return { status, path };
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}

/**
 * Gets the changeset summary/description/changelog for the given changed icons.
 */
function getChangesetSummary(
  files: GitStatusFile[],
  options: Pick<GenerateChangesetOptions, "title">,
) {
  let summary = options.title;

  const addSection = (headline: string, files: GitStatusFile[], status: GitFileStatus) => {
    const filteredFiles = files.filter((icon) => icon.status === status);
    if (!filteredFiles.length) return;
    summary += `\n\n#### ${headline}

${filteredFiles
  .map((file) => {
    const fileName = path.parse(file.path).name;

    if (file.status === "renamed") {
      return `- ${path.parse(file.oldPath).name} => ${fileName}`;
    }

    return `- ${fileName}`;
  })
  .join("\n")}`;
  };

  addSection("Deleted", files, "deleted");
  addSection("Renamed", files, "renamed");
  addSection("New", files, "added");
  addSection("Modified", files, "modified");

  return summary;
}

function exec(command: string) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    nodeExec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      else resolve({ stdout, stderr });
    });
  });
}

type GitStatusFile = {
  /**
   * Path of the (changed) file.
   */
  path: string;
} & (
  | {
      status: Exclude<GitFileStatus, "renamed">;
    }
  | {
      status: "renamed";
      /**
       * Previous file path before the file was renamed.
       */
      oldPath: string;
    }
);

type GitFileStatus = "added" | "modified" | "deleted" | "renamed";
