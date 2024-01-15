import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { defineLoader } from "vitepress";
import type { ComponentGridProps } from "./.vitepress/components/ComponentGrid.vue";
import type { Tab } from "./.vitepress/components/TabGroup.vue";

export type Data = {
  componentCount: number;
  variantCount: number;
  mergedPRCount: number;
  closedIssueCount: number;
  commitCount: number;
  timestamp: string;
  downloads: number;
  packageCount: number;
  componentTabs: (Tab & ComponentGridProps)[];
};

/** @see https://docs.github.com/en/rest/issues/milestones?apiVersion=2022-11-28#get-a-milestone */
export type GitHubMilestone = {
  title: string;
  due_on?: string;
};

declare const data: Data;
export { data };

/**
 * Build-Time data loader to get a list of available languages
 * @see https://vitepress.dev/guide/data-loading
 */
export default defineLoader({
  watch: ["../../../packages/sit-onyx/src/components/*/*.stories.ts"],
  async load(watchedFiles): Promise<Data> {
    const variantCount = watchedFiles.reduce((total, file) => {
      const fileContent = fs.readFileSync(file, "utf-8");
      return total + countWord(fileContent, "export const");
    }, 0);

    // get package count
    const path = fileURLToPath(new URL("../../../packages", import.meta.url));
    const packageFolders = fs.readdirSync(path);

    const npmPackageNames = packageFolders.map((packageName) =>
      packageName === "sit-onyx" ? packageName : `@sit-onyx/${packageName}`,
    );

    const today = new Date();
    const dateString = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    const mergedPRCount = await searchGitHub("issues", "type:pr is:merged");
    const closedIssueCount = await searchGitHub("issues", "type:issue is:closed");
    const commitCount = await searchGitHub("commits", `committer-date:<=${dateString}`);
    const downloads = await getNpmDownloadCount(npmPackageNames);

    const componentTabs: Data["componentTabs"] = [
      {
        id: "t0",
        label: "Basic components",
        description:
          "Basic components with top priority that we consider as must-have for building a simple web application.",
        dueDate: (await getGitHubMilestone(2)).due_on,
        components: [
          { name: "Button", comingSoon: true },
          { name: "Radio button", comingSoon: true },
          { name: "Simple table", comingSoon: true },
          { name: "Headline", comingSoon: true },
          { name: "Footer", comingSoon: true },
          { name: "Header", comingSoon: true },
          { name: "Dropdown", comingSoon: true },
          { name: "Textarea", comingSoon: true },
          { name: "Input", comingSoon: true },
          { name: "Switch", comingSoon: true },
          { name: "Checkbox", comingSoon: true },
        ],
      },
      {
        id: "t1",
        label: "Priority 2",
        description:
          "Commonly used components but that are not critical to implement simple applications.",
        components: [
          { name: "Advanced Table", comingSoon: true },
          { name: "Filter", comingSoon: true },
          { name: "Notification", comingSoon: true },
          { name: "Sidebar", comingSoon: true },
          { name: "Card", comingSoon: true },
          { name: "Popover", comingSoon: true },
          { name: "Dialog", comingSoon: true },
          { name: "Pagination", comingSoon: true },
        ],
      },
      {
        id: "t2",
        label: "Priority 3",
        description:
          "Nice to have components. A basic or Priority 2 component can be used as alternative in the meantime.",
        components: [
          { name: "Datepicker", comingSoon: true },
          { name: "Timepicker", comingSoon: true },
          { name: "Calendar", comingSoon: true },
          { name: "Accordion", comingSoon: true },
          { name: "Slider", comingSoon: true },
          { name: "Stepper", comingSoon: true },
          { name: "Upload", comingSoon: true },
        ],
      },
      {
        id: "t3",
        label: "Priority 4",
        description: "Low priority components.",
        components: [
          { name: "Breadcrumb", comingSoon: true },
          { name: "Table of Content", comingSoon: true },
          { name: "Wizard", comingSoon: true },
          { name: "Tabs", comingSoon: true },
        ],
      },
    ];

    return {
      componentCount: watchedFiles.length,
      variantCount,
      mergedPRCount,
      closedIssueCount,
      commitCount,
      timestamp: today.toUTCString(),
      downloads,
      packageCount: packageFolders.length,
      componentTabs,
    };
  },
});

/**
 * Counts the occurrences of the word in the given content.
 */
const countWord = (content: string, word: string): number => {
  return content.split(word).length - 1;
};

/**
 * Executes the given GitHub search query and returns the total_count of matched items.
 *
 * @see: https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#about-search
 */
const searchGitHub = async (
  endpoint: "issues" | "commits",
  filterString: string,
): Promise<number> => {
  // see: https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#constructing-a-search-query
  const queryString = encodeURIComponent(`repo:SchwarzIT/onyx ${filterString}`);

  // since we only need the total_count, we can decrease the per_page to 1 to improve request speeds
  const response = await fetch(
    `https://api.github.com/search/${endpoint}?q=${queryString}&per_page=1`,
    {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
  const body = await response.json();

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`GitHub request failed. Response body: ${JSON.stringify(body)}`);
  }

  if (typeof body !== "object" || typeof body.total_count !== "number") {
    throw new Error("GitHub search response does not contain total_count");
  }

  return body.total_count;
};

/**
 * Gets the data for the given GitHub milestone.
 *
 * @see: https://docs.github.com/en/rest/issues/milestones?apiVersion=2022-11-28#get-a-milestone
 */
const getGitHubMilestone = async (milestoneNumber: number): Promise<GitHubMilestone> => {
  const response = await fetch(
    `https://api.github.com/repos/SchwarzIT/onyx/milestones/${milestoneNumber}`,
    {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
  const body = await response.json();

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`GitHub request failed. Response body: ${JSON.stringify(body)}`);
  }

  return body;
};

/**
 * Gets the total download count of the last month for the given packages.
 *
 * @see https://github.com/npm/registry/blob/master/docs/download-counts.md
 */
const getNpmDownloadCount = async (packages: string[]): Promise<number> => {
  const promises = packages.map(async (packageName) => {
    const response = await fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`);
    const body = await response.json();

    if (response.status < 200 || response.status >= 300) {
      // ignore request error if package has not been published yet
      // so we don't get build errors if a new package is added
      if (response.status === 404) return 0;
      throw new Error(`npm request failed. Response body: ${JSON.stringify(body)}`);
    }

    if (typeof body !== "object" || typeof body.downloads !== "number") {
      throw new Error("npm response does not contain downloads");
    }

    return body.downloads as number;
  });

  const downloads = await Promise.all(promises);

  return downloads.reduce((total, downloads) => total + downloads, 0);
};
