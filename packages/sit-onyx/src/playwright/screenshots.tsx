import type { Page } from "@playwright/test";
import { iconEmojiHappy2 } from "@sit-onyx/icons";
import {
  useMatrixScreenshotTest,
  type MatrixScreenshotTestOptions,
} from "@sit-onyx/playwright-utils";
import { createAxeBuilder, DEFAULT_DISABLED_AXE_RULES, expect } from "../playwright/a11y.js";

export type OnyxMatrixScreenshotHookContext = {
  /**
   * Rules to disable when performing the accessibility tests.
   * **IMPORTANT**: Should be avoided! If used, please include a comment why it is needed.
   *
   * @see https://playwright.dev/docs/accessibility-testing#disabling-individual-scan-rules
   */
  disabledAccessibilityRules?: string[];
};

export const { executeMatrixScreenshotTest } =
  useMatrixScreenshotTest<OnyxMatrixScreenshotHookContext>({
    defaults: {
      hooks: {
        afterEach: async (component, page, column, row, context) => {
          // ARRANGE (execute accessibility tests)
          const axeBuilder = createAxeBuilder(page);

          if (context?.disabledAccessibilityRules?.length) {
            axeBuilder.disableRules(
              DEFAULT_DISABLED_AXE_RULES.concat(context.disabledAccessibilityRules),
            );
          }

          const accessibilityScanResults = await axeBuilder.analyze();

          // ASSERT
          expect(
            accessibilityScanResults.violations,
            `should pass accessibility checks for ${column} ${row}`,
          ).toEqual([]);
        },
      },
    },
  });

/**
 * Mock icon to use in Playwright component tests (.tsx files) because Playwright has
 * issues when importing from "@sit-onyx/icons" directly with version 1.42.1.
 *
 * Equivalent to:
 * import { iconEmojiHappy2 } from "@sit-onyx/icons";
 *
 * @deprecated Import the desired icon from "@sit-onyx/icons" directly
 */
export const mockPlaywrightIcon = iconEmojiHappy2;

/**
 * Mock onyx logo URL (onyx logo / "O" letter) to be used in Playwright tests.
 */
export const MOCK_PLAYWRIGHT_LOGO_URL = "/logo.svg";

/**
 * Mock onyx logo URL (onyx logo / "onyx" lettering) to be used in Playwright tests.
 */
export const MOCK_PLAYWRIGHT_LOGO_WIDE_URL = "/logo-wide.svg";

/**
 * Register page route handlers to register mocks for onyx logos that can be used as images
 * during Playwright tests. Use the `MOCK_PLAYWRIGHT_LOGO_URL` or `MOCK_PLAYWRIGHT_LOGO_WIDE_URL` constant
 * as image URL then.
 */
export const defineLogoMockRoutes = async (page: Page) => {
  await page.route(MOCK_PLAYWRIGHT_LOGO_URL, (route) => {
    return route.fulfill({ body: MOCK_PLAYWRIGHT_LOGO, contentType: "image/svg+xml" });
  });
  await page.route(MOCK_PLAYWRIGHT_LOGO_WIDE_URL, (route) => {
    return route.fulfill({ body: MOCK_PLAYWRIGHT_LOGO_WIDE, contentType: "image/svg+xml" });
  });
};

export const MOCK_PLAYWRIGHT_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 821 922"><path d="M48.16 24.48c-1.44-8.17-3.21-14.28-7.18-17.56-3.54-2.93-8.5-3.5-17.09-1.98C7.91 7.75 4.61 13.23 7.84 31.58c2.62 14.87 6.4 20.29 16.3 20.29 2.28 0 4.89-.29 7.89-.82 16.05-2.83 19.36-8.3 16.14-26.58zm-27.8-2.67c0-.12.02-.28.03-.42.68-4.95 2.64-5.5 7.57-5.5 6.58 0 7.88.97 7.88 12.14 0 3.14-.11 5.45-.41 7.18h-.01v.11c-.77 4.27-2.77 4.78-7.45 4.78-6.58 0-7.88-.97-7.88-12.06 0-2.59.07-4.61.26-6.22h.02z" style="fill:#00adba;fill-rule:nonzero" transform="translate(-129.658 -79.541)scale(19.29)"/><path d="M48.12 24.46c-1.44-8.15-3.2-14.25-7.17-17.52-3.53-2.92-8.48-3.51-17.05-2-.18.03-.78.14-.95.17l-2.37 15.21c.81-3.96 2.83-4.43 7.37-4.43 6.57 0 7.86.97 7.86 12.11 0 2.78-.09 4.91-.31 6.55l12.62-10.1z" style="fill:url(#a);fill-rule:nonzero" transform="translate(-129.658 -79.541)scale(19.29)"/><path d="M7.84 31.5c1.44 8.15 3.13 14.27 7.09 17.54 3.53 2.92 8.48 3.51 17.05 2 .18-.03.78-.14.95-.17l2.37-15.21c-.81 3.96-2.83 4.43-7.37 4.43-6.57 0-7.86-.97-7.86-12.11 0-2.78.09-4.91.31-6.55L7.84 31.51z" style="fill:url(#b);fill-rule:nonzero" transform="translate(-129.658 -79.541)scale(19.29)"/><defs><linearGradient id="a" x1="0" x2="1" y1="0" y2="0" gradientTransform="rotate(20 -28.968 63.083)scale(30.27)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#018da0;stop-opacity:1"/><stop offset=".14" style="stop-color:#018da0;stop-opacity:1"/><stop offset=".77" style="stop-color:#00adba;stop-opacity:1"/><stop offset="1" style="stop-color:#00adba;stop-opacity:1"/></linearGradient><linearGradient id="b" x1="0" x2="1" y1="0" y2="0" gradientTransform="rotate(-160 21.757 17.96)scale(30.2)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#018da0;stop-opacity:1"/><stop offset=".14" style="stop-color:#018da0;stop-opacity:1"/><stop offset=".77" style="stop-color:#00adba;stop-opacity:1"/><stop offset="1" style="stop-color:#00adba;stop-opacity:1"/></linearGradient></defs></svg>`;

export const MOCK_PLAYWRIGHT_LOGO_WIDE = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1284 532"><path d="M40.47 34.66c0 13.28-2.32 16.55-13.81 16.55s-13.87-3.27-13.87-16.55 2.38-16.61 13.87-16.61 13.81 3.33 13.81 16.61m-21.97 0c0 9.23.89 11.55 8.16 11.55s8.09-2.32 8.09-11.55-.89-11.61-8.09-11.61-8.16 2.32-8.16 11.61m57.09-2.67v18.04c0 .6-.42.89-1.01.89h-3.81c-.6 0-.89-.3-.89-.89V32.47c0-9.11-1.79-9.4-7.5-9.4h-8.16v26.97c0 .6-.3.89-.89.89H49.4c-.6 0-.89-.3-.89-.89V19.98c0-.77.3-.83.89-.95 4.64-.89 9.52-.95 12.38-.95 10.65 0 13.81 1.31 13.81 13.93zm34.89-13.64c.6 0 .89.3.89.89v28.69c-.06 11.67-2.32 15.06-13.75 15.06-3.69 0-5.89-.12-8.99-.54-.54-.06-.83-.42-.83-.95v-2.56c0-.6.3-.89.89-.89h8.81c6.67 0 8.16-1.61 8.16-6.96v-.36c-2.56.42-4.88.48-7.86.48-11.25 0-13.63-3.39-13.63-16.25V19.25c0-.6.3-.89.89-.89h3.87c.6 0 .89.3.89.89v15.36c0 9.28.95 11.61 8.33 11.61 2.32 0 5.12-.12 7.5-.42V19.25c0-.6.3-.89.89-.89h3.93zm34.76 0c.71 0 .89.48.48 1.07l-10.24 14.23 11.55 16.19c.36.6.18 1.07-.48 1.07h-4.88c-.36 0-.71-.18-.89-.54l-8.63-12.2-8.69 12.2c-.18.36-.48.54-.89.54h-4.82c-.71 0-.89-.48-.54-1.07l11.55-16.19-10.18-14.23c-.48-.6-.3-1.07.42-1.07h4.88c.42 0 .71.18.95.54l7.32 10.24 7.26-10.24c.24-.36.6-.54 1.01-.54z" style="fill:#00adba;fill-rule:nonzero" transform="translate(-121.647 -67.105)scale(9.51111)"/><path d="m132.18 29.15 7.25-10.23c.24-.36.59-.54 1.01-.54h4.82c.71 0 .89.48.48 1.07L135.5 33.68" style="fill:url(#a);fill-rule:nonzero" transform="translate(-121.647 -67.105)scale(9.51111)"/><path d="m132.18 29.15 7.25-10.23c.24-.36.59-.54 1.01-.54h4.82c.71 0 .89.48.48 1.07L135.5 33.68l-3.33-4.53z" style="fill:url(#b);fill-rule:nonzero" transform="translate(-121.647 -67.105)scale(9.51111)"/><path d="M98.16 46.21c-2.35 0-4.04-.24-5.27-.86v5.54c1.42.22 3.03.32 4.91.32 2.97 0 5.29-.06 7.85-.47V45.8c-2.38.3-5.18.42-7.5.42z" style="fill:url(#c);fill-rule:nonzero" transform="translate(-121.647 -67.105)scale(9.51111)"/><path d="M54.23 23.06h8.14c2.5 0 4.25.06 5.43.89v-5.58c-1.67-.24-3.66-.3-6.02-.3-1.86 0-4.59.03-7.55.3v4.7z" style="fill:url(#d);fill-rule:nonzero" transform="translate(-121.742 -67.105)scale(9.51111)"/><path d="M26.66 18.06c-1.44 0-2.74.05-3.91.17l-3.5 8.32.05.02c.96-2.66 3.01-3.51 7.36-3.51s6.25.8 7.23 3.31l2.63-6.25c-2.1-1.51-5.24-2.05-9.86-2.05z" style="fill:url(#e);fill-rule:nonzero" transform="translate(-121.742 -67.105)scale(9.51111)"/><defs><linearGradient id="a" x1="0" x2="1" y1="0" y2="0" gradientTransform="rotate(-20 146.025 -359.996)scale(16.49997)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#018da0;stop-opacity:.64"/><stop offset=".14" style="stop-color:#018da0;stop-opacity:.64"/><stop offset=".77" style="stop-color:#00adba;stop-opacity:.64"/><stop offset="1" style="stop-color:#00adba;stop-opacity:.64"/></linearGradient><linearGradient id="b" x1="0" x2="1" y1="0" y2="0" gradientTransform="rotate(-20 146.025 -359.996)scale(16.49997)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#018da0;stop-opacity:.51"/><stop offset=".14" style="stop-color:#018da0;stop-opacity:.51"/><stop offset=".77" style="stop-color:#00adba;stop-opacity:.51"/><stop offset="1" style="stop-color:#00adba;stop-opacity:.51"/></linearGradient><linearGradient id="c" x1="0" x2="1" y1="0" y2="0" gradientTransform="translate(92.89 48.28)scale(12.76)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#00adba;stop-opacity:.8"/><stop offset=".23" style="stop-color:#00adba;stop-opacity:.8"/><stop offset=".86" style="stop-color:#018da0;stop-opacity:.8"/><stop offset="1" style="stop-color:#018da0;stop-opacity:.8"/></linearGradient><linearGradient id="d" x1="0" x2="1" y1="0" y2="0" gradientTransform="translate(54.23 21)scale(13.57)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#018da0;stop-opacity:.8"/><stop offset=".14" style="stop-color:#018da0;stop-opacity:.8"/><stop offset=".77" style="stop-color:#00adba;stop-opacity:.8"/><stop offset="1" style="stop-color:#00adba;stop-opacity:.8"/></linearGradient><linearGradient id="e" x1="0" x2="1" y1="0" y2="0" gradientTransform="translate(19.25 22.31)scale(17.27)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#018da0;stop-opacity:.8"/><stop offset=".14" style="stop-color:#018da0;stop-opacity:.8"/><stop offset=".77" style="stop-color:#00adba;stop-opacity:.8"/><stop offset="1" style="stop-color:#00adba;stop-opacity:.8"/></linearGradient></defs></svg>`;

/**
 * Matrix screenshot hooks for illustrations screenshot tests which will apply light/dark theme settings correctly.
 */
export const illustrationScreenshotHooks: MatrixScreenshotTestOptions["hooks"] = {
  beforeEach: async (component, page, column) => {
    if (column !== "dark") return;

    await component.evaluate((element) => {
      element.style.backgroundColor = "var(--onyx-color-base-background-blank)";
      element.classList.add("dark");
    });
  },
};
