import type { Page } from "@playwright/test";
import { useMatrixScreenshotTest } from "@sit-onyx/playwright-utils";
import { DEFAULT_DISABLED_AXE_RULES, expect, test } from "../playwright/a11y";

export const { executeMatrixScreenshotTest } = useMatrixScreenshotTest({
  expect,
  test,
  defaults: {
    disabledAccessibilityRules: DEFAULT_DISABLED_AXE_RULES,
  },
});

/**
 * Mock icon to use in Playwright component tests (.tsx files) because Playwright has
 * issues when importing from "@sit-onyx/icons" directly with version 1.42.1.
 *
 * Equivalent to:
 * import mockPlaywrightIcon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
 */
export const mockPlaywrightIcon = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 32 32"><path d="M16 2C8.28 2 2 8.28 2 16s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2m0 26C9.383 28 4 22.617 4 16S9.383 4 16 4s12 5.383 12 12-5.383 12-12 12"/><path d="M11 13c.552 0 1 .449 1 1h2c0-1.654-1.346-3-3-3s-3 1.346-3 3h2c0-.551.448-1 1-1m10-2c-1.654 0-3 1.346-3 3h2a1.001 1.001 0 0 1 2 0h2c0-1.654-1.346-3-3-3m-5 11a5.01 5.01 0 0 1-4.325-2.501l-1.73 1.002C11.193 22.659 13.514 24 16 24s4.807-1.341 6.056-3.499l-1.73-1.002A5.02 5.02 0 0 1 16 22"/></svg>`;

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

const MOCK_PLAYWRIGHT_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
<path d="M19.0332 11.0183C19.0332 19.811 17.3139 22 9.49571 22C1.67756 22 0 19.811 0 11.0183C0 2.18903 1.68278 0 9.50094 0C17.3191 0 19.0385 2.18903 19.0385 11.0183H19.0332ZM4.72957 11.0183C4.72957 16.53 5.31488 17.8936 9.50094 17.8936C13.6818 17.8936 14.2671 16.5248 14.2671 11.0183C14.2671 5.46996 13.6818 4.10116 9.50094 4.10116C5.32011 4.10116 4.72957 5.46996 4.72957 11.0183Z" fill="#00C3CD"/>
<path d="M18.981 13.3536C19.0176 12.6274 19.0385 11.8594 19.0385 11.0183C19.0385 2.18903 17.3191 0 9.50097 0C9.41735 0 7.84432 -1.2456e-07 6.66846 0.135835C5.84274 1.38447 5.29923 5.54833 4.97522 7.05296C5.04838 6.59843 5.28878 5.93493 5.45601 5.63192C5.82184 4.96319 6.31831 4.6445 6.92453 4.4303C7.94884 4.06459 9.09857 4.10639 9.50097 4.10639C13.6818 4.10639 14.2671 5.47518 14.2671 11.0235" fill="url(#paint0_linear_1722_32851)"/>
<defs>
  <linearGradient id="paint0_linear_1722_32851" x1="6.6371" y1="0.167181" x2="19.4003" y2="12.9344" gradientUnits="userSpaceOnUse">
    <stop offset="0.14" stop-color="#008CA0"/>
    <stop offset="0.77" stop-color="#00C3CD"/>
  </linearGradient>
</defs>
</svg>
`;

const MOCK_PLAYWRIGHT_LOGO_WIDE = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1284 509"><path d="m1399.09 387.23 58.42-84.71c2.69-3.21 5.37-4.82 9.11-4.82h59.5c6.43 0 8.05 4.29 4.29 9.66l-92.61 131.38-38.72-51.51z" style="fill:url(#a);fill-rule:nonzero" transform="matrix(1.00003 0 0 1 -259.587 -194.5)"/><path d="m1438.22 438.15 102.92 146.34c3.21 5.36 1.61 9.65-4.82 9.65h-59.5c-3.21 0-5.9-1.61-8.05-4.82l-69.68-100.78-69.69 100.78c-2.13 3.21-4.82 4.82-8.04 4.82h-59.5c-6.43 0-18.17-4.29-14.41-9.65l112.51-146.34-92.2-130.79c-3.76-5.37-2.14-9.66 4.28-9.66h59.5c3.76 0 6.97 1.61 9.11 4.82l58.43 84.71 39.13 50.92zm-917.58 10.71c0 120.61-23.58 150.63-130.79 150.63-107.22 0-130.27-30.02-130.27-150.63 0-121.15 23.05-151.17 130.27-151.17 107.2 0 130.79 30.02 130.79 151.17m-196.19 0c0 75.58 8.04 94.35 65.4 94.35 57.35 0 65.39-18.77 65.39-94.35 0-76.12-8.05-94.88-65.39-94.88-57.37 0-65.4 18.76-65.4 94.88" style="fill:#32b8c6;fill-rule:nonzero" transform="matrix(1.00003 0 0 1 -259.587 -194.5)"/><g transform="matrix(1.00003 0 0 1 -259.587 -194.5)"><clipPath id="b"><path d="M519.88 480.88c.49-9.93.76-20.48.76-32.02 0-121.15-23.58-151.17-130.79-151.17-1.11 0-22.73 0-38.84 1.85-11.32 17.14-18.75 74.27-23.19 94.89 1.01-6.22 4.33-15.35 6.61-19.52 5.01-9.18 11.81-13.52 20.13-16.5 14.03-5.02 29.81-4.43 35.3-4.43 57.36 0 65.4 18.76 65.4 94.88" clip-rule="nonzero"/></clipPath><g clip-path="url(#b)"><use xlink:href="#c" width="192.825" height="183.19" x="68.304" y="103.646" transform="matrix(.99907 0 0 .9956 259.58 194.5)"/></g></g><path d="M662.36 353.99h62.1c50.39 0 62.7 3.21 62.7 82.55v152.23c0 5.37 2.69 8.05 8.05 8.05h48.25c5.36 0 8.57-2.68 8.57-8.05V424.75c0-112.04-27.34-127.05-126.51-127.05-17.73 0-39.91.2-62.8 1.63z" style="fill:url(#d);fill-rule:nonzero" transform="matrix(1.00003 0 0 1 -259.587 -194.5)"/><path d="M662.8 306.45v282.32c0 5.37-2.68 8.05-8.04 8.05h-49.31c-5.37 0-7.51-2.68-7.51-8.05V314.86c0-6.97 2.68-7.51 7.51-8.58 18.18-3.69 38-5.8 57.34-7v7.17z" style="fill:#32b8c6;fill-rule:nonzero" transform="matrix(1.00003 0 0 1 -259.587 -194.5)"/><path d="M1123.83 591.43c-22.9 3.73-43.46 4.76-68.5 4.76-98.53 0-123.55-33.55-123.55-141.13V307.02c0-5.33 2.66-7.99 7.99-7.99h48.46c5.33 0 8 2.66 8 7.99v138.99c0 76.15 9.58 93.72 69.23 93.72 17.58 0 39.41-.53 58.05-3.19l.33 54.89z" style="fill:url(#e);fill-rule:nonzero" transform="matrix(1.00003 0 0 1 -259.587 -194.5)"/><path d="M1123.5 536.54V307.02c0-5.33 2.66-7.99 7.99-7.99h48.47c5.33 0 7.99 2.66 7.99 7.99v269.47c-.54 92.66-18.64 126.21-126.76 126.21-35.67 0-60.71-1.6-90-5.87-4.79-1.06-6.93-3.72-6.93-8.52v-31.42c0-5.86 2.13-7.99 7.46-7.99h85.74c53.25 0 66.03-12.78 66.03-54.85v-57.51z" style="fill:#32b8c6;fill-rule:nonzero" transform="matrix(1.00003 0 0 1 -259.587 -194.5)"/><defs><linearGradient id="a" x1="0" x2="1" y1="0" y2="0" gradientTransform="translate(1399.09 368.22)scale(133.32)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#018da0;stop-opacity:1"/><stop offset="1" style="stop-color:#32b8c6;stop-opacity:1"/></linearGradient><linearGradient id="d" x1="0" x2="1" y1="0" y2="0" gradientTransform="translate(126292 134082)scale(35974.7)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#018da0;stop-opacity:1"/><stop offset="1" style="stop-color:#32b8c6;stop-opacity:1"/></linearGradient><linearGradient id="e" x1="0" x2="1" y1="0" y2="0" gradientTransform="translate(931.78 447.61)scale(192.05)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#32b8c6;stop-opacity:1"/><stop offset="1" style="stop-color:#018da0;stop-opacity:1"/></linearGradient><image xlink:href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAC4AMEDAREAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAgAGAf/EABgQAQEBAQEAAAAAAAAAAAAAAAEAAhFh/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEDAgYH/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ayl7V8MUFBQUFBQUFAggQRTCBhQIIEFFMIHkimEDCBBAwgQQIKBhB3kVmLtmoKCgoKCgoEECCKYQIKBhAgophAwgYRTCBBAwgQQIKBhAgilyDK3bNQUFBQUFAggQRTCBBQMIEFFMIGEDyRTCBBAwgQQIKBhAgimEHeRWTu2SgoKCgoEECCKYQIKBhAgophAwgeSKYQIIGECCBBQMIEEUwgQUUuQZC0ZKCgoKBBAgimECCgYQIKKYQMIp5IGECCBhAggQUDCBBFMIEFFMIO88gx1oyUFBQIIEEUwgQUDCBBRTCBhFPJAwgQQMIEECCgYQIIphAgophAggXKDF2rJQUCCBBFMIEFAwgQUUwgYRTyQMIEEDCBBAgoGECCKYQIKKYQIIGFB3nkGJtWSgQQIIphAgoGECCimEDCKeSBhAggYQIIEFAwgQRTCBBRTCBBAwoGEHeQYa1ZEECCKYQIKBhAgophAwinkgYQIIGECCBBAwoEEUwgQUUwgQQMKBhAgg7yDDBasiCKYQIKBhAgophAwinkgYQIIGECCBBAwoEEUwgQUUwgQQMKBhAggYQd5BhQtWZhAgoGECCimEDCKeSBhAggYQIIEEDCgQRTCBBRTCBBAwoGECCBhAggXIMKFqzIKBhAgophAwinkgYQIIGECCBBAwoEEUwgQUUwgQQMKBBAwgYQIIGEUuQYQLRkYQIKKYQMIp5IGECCBhAggQQMKBBFMIEFFMIEEDCgQQMIGECCBhFMIFyDCBaMiCimEDyQMIphAggYQIIEEDCgQRTCBBRTCBBAwoEEDCBhAggYRTCBEHYMKF2zMIGEDCKQQMIEEDCBBAwoEEUwgQUUwgQQMKBBAwgYQIIGEUwgRB2CgxAXbMwgYRSCBhAggYQIKBhAgimECCimECCBhQIIGEDCBBAwimECIOwUFBiwu2ZhFIIGECCBhAgoGECCKYQIKKYQIIGFAggYQMIEEDCKYQIg7BQUFBjgu3BBAwgQQMIEFAwgQRTCBBRTCBBAwoEEDCBhAggYRTCBEHYKCgoKDIBduDCBBAwgQUDCBBFMIEFFMIEEDCgQQMIGECCBhFMIEQdgoKCgoKDJhduCCBhAgoGECCKYQIKKYQIIGFAggYQMIEEDCKYQIg7BQUFBQUFBlQu3BhAgoGECCKYQIKKYQIIGFAggYQMIEEDCKYQIg7BQUFBQUFBQZgLtwQUDCBBFMIEFFMIEEDCgQQMIGECCBhFMIEQdgoKCgoKCgoKDNBdODCBBFMIEFFMIEEDCgQQMIEEDyQMIphAiDsFBQUFBQUFBQUH/9k=" id="c" width="193" height="184"/></defs></svg>`;
