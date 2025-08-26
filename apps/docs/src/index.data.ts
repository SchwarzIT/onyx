import * as fs from "node:fs";
import { defineLoader } from "vitepress";
import type { HomePageData } from "./.vitepress/components/OnyxHomePage.vue";
import { getOnyxNpmPackages } from "./.vitepress/utils.js";
import { executeGitHubRequest } from "./github-api.js";

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

    const downloads = (await getNpmDownloadCount(npmPackageNames)) ?? 0;
    const mergedPRCount = (await searchGitHub("issues", "type:pr is:merged")) ?? 0;
    const closedIssueCount = (await searchGitHub("issues", "type:issue is:closed")) ?? 0;

    /**
     * Checks whether the given component is implemented (meaning a Storybook file exists).
     * Also returns a `href` property with the link to the implemented component (only if implemented).
     */
    const getImplementedStatus = (componentName: string) => {
      const fileExist = watchedFiles.some((file) => file.endsWith(`${componentName}.stories.ts`));
      return fileExist ? "in-progress" : "planned";
    };

    const components: HomePageData["components"] = [
      {
        name: "Button",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/buttons-button--docs",
      },
      {
        name: "Icon button",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/buttons-iconbutton--docs",
      },
      {
        name: "System button",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/buttons-systembutton--docs",
      },
      {
        name: "Floating Action Button",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/buttons-fab--docs",
      },
      {
        name: "Link",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/navigation-link--docs",
      },
      {
        name: "Radio group",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-elements-radiogroup--docs",
      },
      {
        name: "Table",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/data-table--docs",
      },
      {
        name: "Data grid",
        status: "in-progress",
        href: "https://storybook.onyx.schwarz/?path=/docs/data-datagrid--docs",
      },
      {
        name: "Headline",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/navigation-headline--docs",
      },

      {
        name: "Nav bar",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/navigation-navbar--docs",
      },
      {
        name: "Select",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-elements-select--docs",
      },
      {
        name: "Textarea",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-elements-textarea--docs",
      },
      {
        name: "Input",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-elements-input--docs",
      },
      {
        name: "Switch",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-elements-switch--docs",
      },
      {
        name: "Checkbox group",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-elements-checkboxgroup--docs",
      },
      {
        name: "Icons",
        status: "implemented",
        href: "/icons",
      },
      {
        name: "Flags",
        status: "implemented",
        href: "/flags",
      },
      {
        name: "Loading indicator",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/support-loadingindicator--docs",
      },
      {
        name: "Tooltip",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/feedback-tooltip--docs",
      },
      {
        name: "Tag",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/basic-tag--docs",
      },
      {
        name: "Badge",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/basic-badge--docs",
      },
      {
        name: "Empty",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/data-empty--docs",
      },
      {
        name: "Avatar",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/basic-avatar--docs",
      },
      {
        name: "Modal",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/feedback-modal--docs",
      },
      {
        name: "Dialog",
        status: getImplementedStatus("OnyxDialog"),
      },
      {
        name: "Toast",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/feedback-toast--docs",
      },
      {
        name: "Sidebar",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/navigation-sidebar--docs",
      },
      {
        name: "Card",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/cards-card--docs",
      },
      {
        name: "Pagination",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/data-pagination--docs",
      },
      {
        name: "Datepicker",
        status: "planned",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-elements-datepicker--docs",
      },
      { name: "Timepicker", status: getImplementedStatus("OnyxTimepicker") },
      { name: "Calendar", status: getImplementedStatus("OnyxCalendar") },
      {
        name: "Accordion",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/basic-accordion--docs",
      },
      { name: "Slider", status: getImplementedStatus("OnyxSlider") },
      {
        name: "Stepper",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-elements-stepper--docs",
      },
      {
        name: "File upload",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-elements-fileupload--docs",
      },
      {
        name: "Form",
        status: "in-progress",
        href: "https://storybook.onyx.schwarz/?path=/docs/form-elements-form--docs",
      },
      {
        name: "Grid layout",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/story/examples-gridplayground--default",
      },
      {
        name: "Breadcrumb",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/navigation-breadcrumb--docs",
      },
      { name: "Table of Content", status: getImplementedStatus("OnyxTableOfContent") },
      {
        name: "Progress steps",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/progress-progresssteps--docs",
      },
      { name: "Dual list", status: getImplementedStatus("OnyxDualList") },
      {
        name: "Tabs",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/navigation-tabs--docs",
      },
      { name: "Search", status: getImplementedStatus("OnyxSearch") },
      { name: "Filters", status: getImplementedStatus("OnyxFilters") },
      {
        name: "Bottom bar",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/navigation-bottombar--docs",
      },
      {
        name: "Notifications",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/story/notifications-notificationcenter--default",
      },
      {
        name: "Image",
        status: "implemented",
        href: "https://storybook.onyx.schwarz/?path=/docs/basic-image--docs",
      },
      { name: "Split button", status: getImplementedStatus("OnyxSplitButton") },
      { name: "Shortcut", status: getImplementedStatus("OnyxShortcut") },
      { name: "Feed", status: getImplementedStatus("OnyxFeed") },
      { name: "List", status: getImplementedStatus("OnyxList") },
      { name: "Segmented control", status: getImplementedStatus("OnyxSegmentedControl") },
      { name: "Global search", status: getImplementedStatus("OnyxGlobalSearch") },
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
