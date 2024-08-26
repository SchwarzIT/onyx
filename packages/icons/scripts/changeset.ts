/**
 * Script to generate changeset based on the changed .svg files
 */
import { readPreState } from "@changesets/pre";
import writeChangeset from "@changesets/write";
import cp from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { exit } from "node:process";
import { promisify } from "node:util";
import { name as packageName } from "../package.json";

const exec = promisify(cp.exec);

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

${icons.map((icon) => `- ${icon}`).join("\n")}    `;
  };

  addIconList("Deleted icons", deletedIcons);
  addIconList("New icons", newIcons);
  addIconList("Modified icons", modifiedIcons);

  return summary;
}
