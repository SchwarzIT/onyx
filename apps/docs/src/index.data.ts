import fs from "node:fs";
import { defineLoader } from "vitepress";
import type { ComponentCardProps } from "./.vitepress/components/ComponentCard.vue";
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
  /** Component information. */
  components: ComponentCardProps[];
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
    const skipGitHubFetch = process.env.VITEPRESS_SKIP_GITHUB_FETCH === "true";

    const downloads = skipGitHubFetch ? 0 : await getNpmDownloadCount(npmPackageNames);
    const mergedPRCount = skipGitHubFetch ? 0 : await searchGitHub("issues", "type:pr is:merged");
    const closedIssueCount = skipGitHubFetch
      ? 0
      : await searchGitHub("issues", "type:issue is:closed");

    /**
     * Checks whether the given component is implemented (meaning a Storybook file exists).
     * Also returns a `href` property with the link to the implemented component (only if implemented).
     */
    const getImplementedStatus = (componentName: string) => {
      const fileExist = watchedFiles.some((file) => file.endsWith(`${componentName}.stories.ts`));
      return fileExist ? "in-progress" : "planned";
    };

    const basicComponentsDueDate = "Q2/2024";

    const components: HomePageData["components"] = [
      {
        name: "Button",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/buttons-button--docs",
      },
      {
        name: "Icon button",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/buttons-iconbutton--docs",
      },
      {
        name: "Radio group",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-radiogroup--docs",
      },
      {
        name: "Table",
        dueDate: "11/2024",
        status: getImplementedStatus("OnyxTable"),
        href: "https://storybook.onyx.schwarz/?path=/docs/data-table--docs",
      },
      {
        name: "DataGrid",
        dueDate: "12/2024",
        status: "in-progress",
      },
      {
        name: "Headline",
        dueDate: "10/2024",
        status: getImplementedStatus("OnyxHeadline"),
        href: "https://storybook.onyx.schwarz/?path=/docs/basic-headline--docs",
      },

      {
        name: "Nav bar",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/navigation-navbar--docs",
      },
      {
        name: "Select",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-select--docs",
      },
      {
        name: "Textarea",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-textarea--docs",
      },
      {
        name: "Input",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-input--docs",
      },
      {
        name: "Switch",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-switch--docs",
      },
      {
        name: "Checkbox group",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-checkboxgroup--docs",
      },
      {
        name: "Icons",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "/icons",
      },
      {
        name: "Loading indicator",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/support-loadingindicator--docs",
      },
      {
        name: "Tooltip",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/feedback-tooltip--docs",
      },
      {
        name: "Tag",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/basic-tag--docs",
      },
      {
        name: "Badge",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/basic-badge--docs",
      },
      {
        name: "Empty",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/data-empty--docs",
      },
      {
        name: "Avatar",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/basic-avatar--docs",
      },
      {
        name: "Dialog",
        status: getImplementedStatus("OnyxDialog"),
        href: "https://storybook.onyx.schwarz/?path=/docs/feedback-dialog--docs",
        dueDate: "01/2025",
      },
      {
        name: "Toast",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/feedback-toastprovider--docs",
      },
      { name: "Footer", status: getImplementedStatus("OnyxFooter") },
      { name: "Data grid", status: getImplementedStatus("OnyxDataGrid") },
      { name: "Filter", status: getImplementedStatus("OnyxFilter") },
      { name: "Sidebar", status: "in-progress", dueDate: "12/2024" },
      { name: "Card", status: getImplementedStatus("OnyxCard") },
      { name: "Popover", status: getImplementedStatus("OnyxPopover") },
      {
        dueDate: "10/2024",
        name: "Pagination",
        status: getImplementedStatus("OnyxPagination"),
        href: "https://storybook.onyx.schwarz/?path=/docs/data-pagination--docs",
      },
      { name: "Datepicker", status: getImplementedStatus("OnyxDatepicker"), dueDate: "01/2025" },
      { name: "Timepicker", status: getImplementedStatus("OnyxTimepicker"), dueDate: "01/2025" },
      { name: "Calendar", status: getImplementedStatus("OnyxCalendar") },
      { name: "Accordion", status: getImplementedStatus("OnyxAccordion") },
      { name: "Slider", status: getImplementedStatus("OnyxSlider") },
      {
        name: "Stepper",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-stepper--docs",
      },
      { name: "Upload", status: getImplementedStatus("OnyxUpload") },
      { name: "Breadcrumb", status: getImplementedStatus("OnyxBreadcrumb") },
      { name: "Table of Content", status: getImplementedStatus("OnyxTableOfContent") },
      { name: "Wizard", status: getImplementedStatus("OnyxWizard") },
      { name: "Tabs", status: getImplementedStatus("OnyxTabs") },
      { name: "Search", status: "in-progress", dueDate: "11/2024" },
      { name: "Filters", status: "in-progress", dueDate: "11/2024" },
    ];

    return {
      componentCount: watchedFiles.length,
      variantCount,
      mergedPRCount,
      closedIssueCount,
      timestamp: timestamp.toUTCString(),
      downloads,
      packageCount: packageFolders.length,
      components,
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
