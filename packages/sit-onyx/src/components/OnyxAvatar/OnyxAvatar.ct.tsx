import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { ICON_SIZES } from "../OnyxIcon/types";
import OnyxAvatar from "./OnyxAvatar.vue";

/**
 * Mock custom image (onyx logo).
 */
const MOCK_CUSTOM_IMAGE =
  `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 64 64"><path d="M64 8c0-4.415-3.585-8-8-8H8C3.585 0 0 3.585 0 8v48c0 4.415 3.585 8 8 8h48c4.415 0 8-3.585 8-8z" style="fill:#0c1f2d"/><path d="M379.75 250.27c0 119.9-23.44 149.73-130.01 149.73-106.58 0-129.49-29.84-129.49-149.73 0-120.43 22.91-150.27 129.49-150.27 106.56 0 130.01 29.84 130.01 150.27m-195.02 0c0 75.13 7.99 93.79 65.01 93.79 57.01 0 65-18.66 65-93.79 0-75.66-8-94.31-65-94.31-57.02 0-65.01 18.65-65.01 94.31" style="fill:#32b8c6;fill-rule:nonzero" transform="translate(-4.666 -4.665)scale(.14666)"/><path d="M378.99 282.09c.49-9.87.76-20.36.76-31.83 0-120.43-23.44-150.27-130.02-150.27-1.11 0-22.59 0-38.61 1.84-11.26 17.04-18.64 73.83-23.05 94.32 1-6.19 4.3-15.26 6.57-19.41 4.98-9.12 11.74-13.44 20.01-16.4 13.95-4.99 29.63-4.4 35.09-4.4 57.02 0 65.01 18.65 65.01 94.31" style="fill:url(#a);fill-rule:nonzero" transform="translate(-4.666 -4.665)scale(.14666)"/><defs><linearGradient id="a" x1="0" x2="1" y1="0" y2="0" gradientTransform="rotate(45 -18.064 305.488)scale(246.16)" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#018da0;stop-opacity:1"/><stop offset=".14" style="stop-color:#018da0;stop-opacity:1"/><stop offset=".77" style="stop-color:#32b8c6;stop-opacity:1"/><stop offset="1" style="stop-color:#32b8c6;stop-opacity:1"/></linearGradient></defs></svg>
` as const;

const MOCK_IMAGE_URL = "/custom-image.svg" as const;

test.beforeEach(async ({ page }) => {
  await page.route(MOCK_IMAGE_URL, (route) => {
    return route.fulfill({ body: MOCK_CUSTOM_IMAGE, contentType: "image/svg+xml" });
  });
});

test.describe("Screenshot tests", () => {
  const [_, ...AVATAR_SIZES] = ICON_SIZES;

  executeMatrixScreenshotTest({
    name: "Avatar",
    columns: ["default", "custom"],
    rows: AVATAR_SIZES,
    component: (column, row) => (
      <OnyxAvatar
        label="John Doe"
        size={row}
        src={column === "custom" ? MOCK_IMAGE_URL : undefined}
      />
    ),
    hooks: {
      beforeEach: async (component) => {
        await expect(component.getByTitle("John Doe")).toBeVisible();
      },
    },
  });

  executeMatrixScreenshotTest({
    name: "Avatar (custom content)",
    columns: ["default", "truncation"],
    rows: AVATAR_SIZES,
    component: (column, row) => (
      <OnyxAvatar label="Custom content" size={row}>
        {column === "truncation" ? "+999999" : "+42"}
      </OnyxAvatar>
    ),
  });
});

test("should contain correct initials", async ({ mount }) => {
  // ARRANGE
  const component = await mount(OnyxAvatar, {
    props: {
      label: "A B C D",
    },
  });

  // ASSERT
  await expect(component).toContainText("AB");

  // ACT
  await component.update({ props: { label: "abcd" } });

  // ASSERT
  await expect(component).toContainText("AB");

  // ACT
  await component.update({ props: { label: "a" } });

  // ASSERT
  await expect(component).toContainText("A");
});

test("should show custom image", async ({ mount, page }) => {
  // ARRANGE
  const component = await mount(OnyxAvatar, {
    props: {
      label: "Custom image",
      src: MOCK_IMAGE_URL,
    },
  });

  // ASSERT
  await expect(component).not.toContainText("CI");
  await expect(component.getByAltText("Custom image")).toBeVisible();

  // ARRANGE (should display fallback if image error occurs)
  await page.route("https:/does-not-exist", (route) => route.fulfill({ status: 404 }));

  // ACT
  await component.update({ props: { src: "https://does-not-exist" } });

  // ASSERT
  await expect(component.getByAltText("Custom image")).toBeHidden();
  await expect(component).toContainText("CI");

  // ACT (should reset error if image is changed)
  await component.update({ props: { src: MOCK_IMAGE_URL } });

  // ASSERT
  await expect(component).not.toContainText("CI");
  await expect(component.getByAltText("Custom image")).toBeVisible();
});
