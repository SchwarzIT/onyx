/**
 * Script to generate changeset based on the changed .svg files
 */
import { readPreState } from "@changesets/pre";
import writeChangeset from "@changesets/write";
import { exec as nodeExec } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { exit } from "node:process";
import { name as packageName } from "../package.json";

const isExecutedDirectly = import.meta.url.endsWith(process.argv[1]);

// if the script is run directly (e.g. with "npm run generate:changeset"), we run the function immediately
// otherwise it is probably imported for testing so we don't want to run it immediately
if (isExecutedDirectly) await generateChangeset();

export async function generateChangeset() {
  const newIcons = await gitLsFiles("--others");
  const deletedIcons = await gitLsFiles("--deleted");
  const modifiedIcons = (await gitLsFiles("--modified")).filter(
    (i) => !newIcons.includes(i) && !deletedIcons.includes(i),
  );

  if (!newIcons.length && !deletedIcons.length && !modifiedIcons.length) {
    console.log("No icons changed.");
    exit();
  }

  console.log(`Found ${newIcons.length} new icons`);
  console.log(`Found ${deletedIcons.length} deleted icons`);
  console.log(`Found ${modifiedIcons.length} modified icons`);

  const changesetCwd = path.join(process.cwd(), "..", "..");

  const changesetId = await writeChangeset(
    {
      releases: [
        {
          name: packageName,
          type: deletedIcons.length > 0 ? "major" : "minor",
        },
      ],
      summary: getChangesetSummary(newIcons, deletedIcons, modifiedIcons),
    },
    changesetCwd,
  );

  // if changeset is in pre-release mode, we need to add the generated changeset to the pre.json file so it is picked up correctly
  const preState = await readPreState(changesetCwd);
  if (preState) {
    preState.changesets.push(changesetId);
    preState.changesets.sort();

    await writeFile(
      path.join(changesetCwd, ".changeset", "pre.json"),
      JSON.stringify(preState, null, 2) + "\n",
    );
  }

  console.log("Wrote changeset");
}

/**
 * Gets a list of tracked git filenames.
 */
async function gitLsFiles(flags: string) {
  const { stdout } = await exec(`git ls-files --exclude-standard ${flags} src/assets`);
  const fileNames = stdout.split("\n");
  return fileNames.filter((i) => !!i).map((i) => path.parse(i).name);
}

/**
 * Gets the changeset summary/description/changelog for the given changed icons.
 */
function getChangesetSummary(newIcons: string[], deletedIcons: string[], modifiedIcons: string[]) {
  let summary = "feat: update icons";

  const addIconList = (headline: string, icons: string[]) => {
    if (!icons.length) return;
    summary += `\n\n#### ${headline}

${icons.map((icon) => `- ${icon}`).join("\n")}`;
  };

  addIconList("Deleted icons", deletedIcons);
  addIconList("New icons", newIcons);
  addIconList("Modified icons", modifiedIcons);

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
