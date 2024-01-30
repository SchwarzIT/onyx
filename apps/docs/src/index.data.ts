import fs from "node:fs";
import { defineLoader } from "vitepress";
import type { ComponentGridProps } from "./.vitepress/components/ComponentGrid.vue";
import type { Tab } from "./.vitepress/components/TabGroup.vue";
import { getOnyxNpmPackages } from "./.vitepress/utils";

/**
 * Build-time data for the home page (components, facts/numbers etc.)
 */
export type HomePageData = {
  /** Total number of implemented onyx components. */
  componentCount: number;
  /** Total number of component variants/stories across all implemented components as documented with Storybook. */
  variantCount: number;
  /** Total number of merged pull requests on GitHub. */
  mergedPRCount: number;
  /** Total number of closed issues on GitHub. */
  closedIssueCount: number;
  /** Timestamp when this data has been fetched. */
  timestamp: string;
  /** Total number of npm downloads for all onyx npm packages in the last month. */
  downloads: number;
  /** Number of npm packages inside the `packages` folder of this monorepo. */
  packageCount: number;
  /** Component tabs / sets / roadmap. */
  componentTabs: (Tab & ComponentGridProps)[];
};

declare const data: HomePageData;
export { data };

/**
 * Build-Time data loader to get the home page data
 * @see https://vitepress.dev/guide/data-loading
 */
export default defineLoader({
  watch: ["../../../packages/sit-onyx/src/components/*/*.stories.ts"],
  async load(watchedFiles): Promise<HomePageData> {
    const variantCount = watchedFiles.reduce((total, file) => {
      const fileContent = fs.readFileSync(file, "utf-8");
      // stories are defined using "satisfies Story;" so we can count
      // the occurrences to get the number of stories/variants
      return total + countWord(fileContent, "satisfies Story;");
    }, 0);

    const packageFolders = await getOnyxNpmPackages();
    const npmPackageNames = packageFolders.map((packageName) =>
      packageName === "sit-onyx" ? packageName : `@sit-onyx/${packageName}`,
    );

    const timestamp = new Date();

    // we only want to fetch the data from GitHub / npmjs API on build, not when running locally
    // to improve the startup time and prevent rate limits
    const isDev = process.env.NODE_ENV === "development";

    const downloads = isDev ? 0 : await getNpmDownloadCount(npmPackageNames);
    const mergedPRCount = isDev ? 0 : await searchGitHub("issues", "type:pr is:merged");
    const closedIssueCount = isDev ? 0 : await searchGitHub("issues", "type:issue is:closed");

    /** Checks whether the given component is implemented (meaning a Storybook file exists) */
    const isImplemented = (componentName: string) => {
      return watchedFiles.includes(`${componentName}.stories.ts`);
    };

    const componentTabs: HomePageData["componentTabs"] = [
      {
        id: "basic",
        label: "Basic components",
        description:
          "Basic components with top priority that we consider as must-have for building a simple web application.",
        dueDate: new Date(2024, 3, 15).toISOString(),
        components: [
          { name: "Button", implemented: isImplemented("OnyxButton") },
          { name: "Radio button", implemented: isImplemented("OnyxRadioButton") },
          { name: "Minimalistic table", implemented: isImplemented("OnyxTable") },
          { name: "Headline", implemented: isImplemented("OnyxHeadline") },
          { name: "Footer", implemented: isImplemented("OnyxFooter") },
          { name: "Header", implemented: isImplemented("OnyxHeader") },
          { name: "Dropdown", implemented: isImplemented("OnyxDropdown") },
          { name: "Textarea", implemented: isImplemented("OnyxTextarea") },
          { name: "Input", implemented: isImplemented("OnyxInput") },
          { name: "Switch", implemented: isImplemented("OnyxSwitch") },
          { name: "Checkbox", implemented: isImplemented("OnyxCheckbox") },
        ],
      },
      {
        id: "expansion-2",
        label: "Expansion 2",
        description:
          "Commonly used components which are not critical to implement simple applications.",
        components: [
          // we can not use "isImplemented" for the advanced table because it will be
          // the same component as the "simple" table
          { name: "Advanced Table", implemented: false },
          { name: "Filter", implemented: isImplemented("OnyxFilter") },
          { name: "Notification", implemented: isImplemented("OnyxNotification") },
          { name: "Sidebar", implemented: isImplemented("OnyxSidebar") },
          { name: "Card", implemented: isImplemented("OnyxCard") },
          { name: "Popover", implemented: isImplemented("OnyxPopover") },
          { name: "Dialog", implemented: isImplemented("OnyxDialog") },
          { name: "Pagination", implemented: isImplemented("OnyxPagination") },
        ],
      },
      {
        id: "expansion-3",
        label: "Expansion 3",
        description:
          "Nice to have components. A basic or Expansion 2 component can be used as alternative in the meantime.",
        components: [
          { name: "Datepicker", implemented: isImplemented("OnyxDatepicker") },
          { name: "Timepicker", implemented: isImplemented("OnyxTimepicker") },
          { name: "Calendar", implemented: isImplemented("OnyxCalendar") },
          { name: "Accordion", implemented: isImplemented("OnyxAccordion") },
          { name: "Slider", implemented: isImplemented("OnyxSlider") },
          { name: "Stepper", implemented: isImplemented("OnyxStepper") },
          { name: "Upload", implemented: isImplemented("OnyxUpload") },
        ],
      },
      {
        id: "expansion-4",
        label: "Expansion 4",
        description: "Low priority components.",
        components: [
          { name: "Breadcrumb", implemented: isImplemented("OnyxBreadcrumb") },
          { name: "Table of Content", implemented: isImplemented("OnyxTableOfContent") },
          { name: "Wizard", implemented: isImplemented("OnyxWizard") },
          { name: "Tabs", implemented: isImplemented("OnyxTabs") },
        ],
      },
    ];

    return {
      componentCount: watchedFiles.length,
      variantCount,
      mergedPRCount,
      closedIssueCount,
      timestamp: timestamp.toUTCString(),
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
  const body = await executeGitHubRequest(`search/${endpoint}?q=${queryString}&per_page=1`);

  if (typeof body !== "object" || typeof body.total_count !== "number") {
    throw new Error(
      `GitHub search response does not contain total_count. Response body: ${JSON.stringify(body)}`,
    );
  }

  return body.total_count;
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
      throw new Error(
        `npm response does not contain downloads. Response body: ${JSON.stringify(body)}`,
      );
    }

    return body.downloads as number;
  });

  const downloads = await Promise.all(promises);
  return downloads.reduce((total, downloads) => total + downloads, 0);
};

/**
 * Executes a GET request to the given GitHub API route.
 *
 * @param apiRoute API route without "https://api.github.com/". Must not start with a trailing slash.
 * @throws Error if API request was not successful
 * @returns JSON response body.
 */
const executeGitHubRequest = async (apiRoute: string) => {
  // GitHub token can be used to have a higher rate limit (useful if used in CI)
  // see: https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#about-primary-rate-limits
  const accessToken = process.env.VITEPRESS_GITHUB_ACCESS_TOKEN;

  const response = await fetch(`https://api.github.com/${apiRoute}`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
  const body = await response.json();

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`GitHub request failed. Response body: ${JSON.stringify(body)}`);
  }

  return body;
};
