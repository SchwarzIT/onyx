import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { ICON_SIZES } from "../OnyxIcon/types";
import OnyxAvatar from "./OnyxAvatar.vue";

/**
 * Mock custom image (onyx logo).
 */
const MOCK_CUSTOM_IMAGE =
  `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 80 80"><path d="M80 8c0-4.415-3.585-8-8-8H8C3.585 0 0 3.585 0 8v64c0 4.415 3.585 8 8 8h64c4.415 0 8-3.585 8-8z" style="fill:#101f2c"/><path d="M48.16 24.48c-1.44-8.17-3.21-14.28-7.18-17.56-3.54-2.93-8.5-3.5-17.09-1.98C7.91 7.75 4.61 13.23 7.84 31.58c2.62 14.87 6.4 20.29 16.3 20.29 2.28 0 4.89-.29 7.89-.82 16.05-2.83 19.36-8.3 16.14-26.58zm-27.8-2.67c0-.12.02-.28.03-.42.68-4.95 2.64-5.5 7.57-5.5 6.58 0 7.88.97 7.88 12.14 0 3.14-.11 5.45-.41 7.18h-.01v.11c-.77 4.27-2.77 4.78-7.45 4.78-6.58 0-7.88-.97-7.88-12.06 0-2.59.07-4.61.26-6.22h.02z" style="fill:#00adba;fill-rule:nonzero" transform="translate(8.42 8.45)scale(1.12783)"/><path d="M48.12 24.46c-1.44-8.15-3.2-14.25-7.17-17.52-3.53-2.92-8.48-3.51-17.05-2-.18.03-.78.14-.95.17l-2.37 15.21c.81-3.96 2.83-4.43 7.37-4.43 6.57 0 7.86.97 7.86 12.11 0 2.78-.09 4.91-.31 6.55l12.62-10.1z" style="fill:url(#a);fill-rule:nonzero" transform="translate(8.42 8.45)scale(1.12783)"/><path d="M7.84 31.5c1.44 8.15 3.13 14.27 7.09 17.54 3.53 2.92 8.48 3.51 17.05 2 .18-.03.78-.14.95-.17l2.37-15.21c-.81 3.96-2.83 4.43-7.37 4.43-6.57 0-7.86-.97-7.86-12.11 0-2.78.09-4.91.31-6.55L7.84 31.51z" style="fill:url(#b);fill-rule:nonzero" transform="translate(8.42 8.45)scale(1.12783)"/><defs><linearGradient id="a" x1="0" x2="1" y1="0" y2="0" gradientTransform="rotate(20 -28.968 63.083)scale(30.27)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#018da0;stop-opacity:1"/><stop offset=".14" style="stop-color:#018da0;stop-opacity:1"/><stop offset=".77" style="stop-color:#00adba;stop-opacity:1"/><stop offset="1" style="stop-color:#00adba;stop-opacity:1"/></linearGradient><linearGradient id="b" x1="0" x2="1" y1="0" y2="0" gradientTransform="rotate(-160 21.757 17.96)scale(30.2)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#018da0;stop-opacity:1"/><stop offset=".14" style="stop-color:#018da0;stop-opacity:1"/><stop offset=".77" style="stop-color:#00adba;stop-opacity:1"/><stop offset="1" style="stop-color:#00adba;stop-opacity:1"/></linearGradient></defs></svg>` as const;

const MOCK_IMAGE_URL = "/custom-image.svg" as const;

/**
 * @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter#examples
 */
const UNSUPPORTED_USERNAME_EXAMPLE = "吾輩は猫である。名前はたぬき。";

test.beforeEach(async ({ page }) => {
  await page.route(MOCK_IMAGE_URL, (route) => {
    return route.fulfill({ body: MOCK_CUSTOM_IMAGE, contentType: "image/svg+xml" });
  });
});

test.describe("Screenshot tests", () => {
  const [_, ...AVATAR_SIZES] = ICON_SIZES;

  executeMatrixScreenshotTest({
    name: "Avatar",
    columns: ["default", "custom", "unsupported-characters"],
    rows: AVATAR_SIZES,
    component: (column, row) => (
      <OnyxAvatar
        username={column === "unsupported-characters" ? UNSUPPORTED_USERNAME_EXAMPLE : "John Doe"}
        size={row}
        src={column === "custom" ? MOCK_IMAGE_URL : undefined}
      />
    ),
    hooks: {
      beforeEach: async (component, page, column) => {
        const username =
          column === "unsupported-characters" ? UNSUPPORTED_USERNAME_EXAMPLE : "John Doe";
        await expect(component.getByLabel(`Avatar of ${username}`)).toBeVisible();
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Avatar (custom content)",
    columns: ["default", "truncation"],
    rows: AVATAR_SIZES,
    component: (column, row) => (
      <OnyxAvatar
        username="Custom content"
        size={row}
        initials={column === "truncation" ? "+999999" : "+42"}
      />
    ),
  });
});

test("should contain correct initials", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxAvatar, {
    props: {
      username: "A B C D",
    },
  });

  // ASSERT
  await expect(component).toContainText("AD");

  // ACT
  await component.update({ props: { username: "abcd" } });

  // ASSERT
  await expect(component).toContainText("AB");

  // ACT
  await component.update({ props: { username: "a" } });

  // ASSERT
  await expect(component).toContainText("A");

  // ACT
  await component.update({ props: { username: "abcd", initials: "HI" } });

  // ASSERT
  await expect(component).toContainText("HI");
});

test("should show custom image", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(OnyxAvatar, {
    props: {
      username: "Custom image",
      src: MOCK_IMAGE_URL,
    },
  });

  const initials = component.getByText("CI");

  // ASSERT
  await expect(initials).toBeHidden();

  // ARRANGE (should display fallback if image error occurs)
  await page.route("https:/does-not-exist", (route) => route.fulfill({ status: 404 }));

  // ACT
  await component.update({ props: { src: "https://does-not-exist" } });

  // ASSERT
  await expect(initials).toBeVisible();

  // ACT (should reset error if image is changed)
  await component.update({ props: { src: MOCK_IMAGE_URL } });

  // ASSERT
  await expect(initials).toBeHidden();
});
