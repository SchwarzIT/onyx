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
      const href = `https://storybook.onyx.schwarz/?path=/docs/components-${componentName.replace("Onyx", "").toLowerCase()}--docs`;

      return {
        status: fileExist ? "in-progress" : "planned",
        href: fileExist ? href : undefined,
      } satisfies Partial<ComponentCardProps>;
    };

    const basicComponentsDueDate = "Q2/2024";

    const components: HomePageData["components"] = [
      {
        name: "Button",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxButton"),
        status: "implemented",
      },
      {
        name: "Icon button",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxIconButton"),
        status: "implemented",
      },
      {
        name: "Radio group",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxRadioGroup"),
        status: "implemented",
      },
      {
        name: "Minimalistic table",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxTable"),
      },
      {
        name: "Headline",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxHeadline"),
      },

      {
        name: "Nav bar",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxNavBar"),
      },
      {
        name: "Select",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxSelect"),
      },
      {
        name: "Textarea",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxTextarea"),
      },
      {
        name: "Input",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxInput"),
      },
      {
        name: "Switch",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxSwitch"),
        status: "implemented",
      },
      {
        name: "Checkbox group",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxCheckboxGroup"),
        status: "implemented",
      },
      {
        name: "Icons",
        dueDate: basicComponentsDueDate,
        status: "implemented",
        href: "/resources/icons",
      },
      {
        name: "Loading indicator",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxLoadingIndicator"),
        status: "implemented",
      },
      {
        name: "Tooltip",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxTooltip"),
      },
      {
        name: "Tag",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxTag"),
        status: "implemented",
      },
      {
        name: "Badge",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxBadge"),
        status: "implemented",
      },
      {
        name: "Empty",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxEmpty"),
        status: "implemented",
      },
      {
        name: "Avatar",
        dueDate: basicComponentsDueDate,
        ...getImplementedStatus("OnyxAvatar"),
      },
      { name: "Footer", ...getImplementedStatus("OnyxFooter") },
      { name: "Advanced Table", ...getImplementedStatus("OnyxTable"), status: "planned" },
      { name: "Filter", ...getImplementedStatus("OnyxFilter") },
      { name: "Toast", ...getImplementedStatus("OnyxToast") },
      { name: "Sidebar", ...getImplementedStatus("OnyxSidebar") },
      { name: "Card", ...getImplementedStatus("OnyxCard") },
      { name: "Popover", ...getImplementedStatus("OnyxPopover") },
      { name: "Dialog", ...getImplementedStatus("OnyxDialog") },
      { name: "Pagination", ...getImplementedStatus("OnyxPagination") },
      { name: "Datepicker", ...getImplementedStatus("OnyxDatepicker") },
      { name: "Timepicker", ...getImplementedStatus("OnyxTimepicker") },
      { name: "Calendar", ...getImplementedStatus("OnyxCalendar") },
      { name: "Accordion", ...getImplementedStatus("OnyxAccordion") },
      { name: "Slider", ...getImplementedStatus("OnyxSlider") },
      { name: "Stepper", ...getImplementedStatus("OnyxStepper") },
      { name: "Upload", ...getImplementedStatus("OnyxUpload") },
      { name: "Breadcrumb", ...getImplementedStatus("OnyxBreadcrumb") },
      { name: "Table of Content", ...getImplementedStatus("OnyxTableOfContent") },
      { name: "Wizard", ...getImplementedStatus("OnyxWizard") },
      { name: "Tabs", ...getImplementedStatus("OnyxTabs") },
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
