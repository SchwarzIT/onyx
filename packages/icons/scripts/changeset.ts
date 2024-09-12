/**
 * Script to generate changeset based on the changed .svg files
 */
import writeChangeset from "@changesets/write";
import { exec as nodeExec } from "node:child_process";
import path from "node:path";
import { exit } from "node:process";
import { name as packageName } from "../package.json";

const isExecutedDirectly = import.meta.url.endsWith(process.argv[1]);

// if the script is run directly (e.g. with "npm run generate:changeset"), we run the function immediately
// otherwise it is probably imported for testing so we don't want to run it immediately
if (isExecutedDirectly) await generateChangeset();

export async function generateChangeset() {
  const changedIcons = await getChangedIcons();

  if (!changedIcons.length) {
    console.log("No icons changed.");
    exit();
  }

  console.log(`Found ${changedIcons.length} changed icons`);

  const changesetCwd = path.join(process.cwd(), "..", "..");
  const hasBreakingChanges = changedIcons.some(
    (icon) => icon.status === "deleted" || icon.status === "renamed",
  );

  await writeChangeset(
    {
      releases: [
        {
          name: packageName,
          type: hasBreakingChanges ? "major" : "minor",
        },
      ],
      summary: getChangesetSummary(changedIcons),
    },
    changesetCwd,
  );

  console.log("Wrote changeset");
}

/**
 * Gets a list of changed icons based on their git status (added, modifier, deleted or renamed).
 * Will be sorted alphabetically by file path/name.
 */
async function getChangedIcons() {
  const { stdout } = await exec("git status --porcelain src/assets");
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
function getChangesetSummary(files: GitStatusFile[]) {
  let summary = "feat: update icons";

  const addIconList = (headline: string, files: GitStatusFile[], status: GitFileStatus) => {
    const filteredFiles = files.filter((icon) => icon.status === status);
    if (!filteredFiles.length) return;
    summary += `\n\n#### ${headline}

${filteredFiles
  .map((file) => {
    const iconName = path.parse(file.path).name;

    if (file.status === "renamed") {
      return `- ${path.parse(file.oldPath).name} => ${iconName}`;
    }

    return `- ${iconName}`;
  })
  .join("\n")}`;
  };

  addIconList("Deleted icons", files, "deleted");
  addIconList("Renamed icons", files, "renamed");
  addIconList("New icons", files, "added");
  addIconList("Modified icons", files, "modified");

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
