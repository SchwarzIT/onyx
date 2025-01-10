import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { ICON_SIZES } from "../OnyxIcon/types";
import OnyxAvatar from "./OnyxAvatar.vue";

/**
 * Mock custom image (onyx logo).
 */
const MOCK_CUSTOM_IMAGE =
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 80 80"><defs><linearGradient id="a" x1="30.78" x2="62.86" y1="23.88" y2="35.56" gradientUnits="userSpaceOnUse"><stop offset=".14" stop-color="#018da0"/><stop offset=".77" stop-color="#00adba"/></linearGradient><linearGradient xlink:href="#a" id="b" x1="7328.02" x2="7360.04" y1="2920.96" y2="2932.61" gradientTransform="rotate(-180 3688.56 1488.53)"/></defs><rect width="80" height="80" rx="8" ry="8" style="fill:#101f2c"/><path d="M62.74 36.03c-1.62-9.21-3.62-16.1-8.1-19.81-3.99-3.3-9.58-3.95-19.27-2.23-18.03 3.18-21.75 9.36-18.1 30.06 2.96 16.77 7.21 22.89 18.38 22.89 2.58 0 5.52-.33 8.89-.92 18.1-3.19 21.84-9.36 18.2-29.98Zm-31.36-3.02c0-.13.03-.32.03-.47.76-5.59 2.98-6.2 8.53-6.2 7.43 0 8.88 1.1 8.88 13.69 0 3.55-.12 6.15-.46 8.1h-.01v.12c-.87 4.81-3.12 5.39-8.4 5.39-7.43 0-8.88-1.09-8.88-13.61 0-2.92.08-5.2.3-7.02h.02Z" style="fill:#00adba"/><path d="M62.7 36.01c-1.62-9.19-3.61-16.07-8.08-19.76-3.98-3.29-9.56-3.96-19.23-2.26-.2.04-.88.15-1.07.19l-2.67 17.16c.92-4.47 3.19-4.99 8.31-4.99 7.41 0 8.86 1.1 8.86 13.66 0 3.14-.1 5.53-.35 7.39l14.24-11.39Z" style="fill:url(#a)"/><path d="M17.27 43.95c1.62 9.19 3.53 16.1 8 19.79 3.98 3.29 9.56 3.96 19.23 2.26.2-.04.88-.15 1.07-.19l2.67-17.16c-.92 4.47-3.19 4.99-8.31 4.99-7.41 0-8.86-1.1-8.86-13.66 0-3.14.1-5.53.35-7.39L17.27 43.96Z" style="fill:url(#b)"/></svg>` as const;

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
