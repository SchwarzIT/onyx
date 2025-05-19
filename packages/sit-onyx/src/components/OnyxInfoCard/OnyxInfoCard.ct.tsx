import { DENSITIES } from "../../composables/density";
import { expect, test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import { ONYX_COLORS } from "../../types";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxInfoCard from "./OnyxInfoCard.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Info card",
    columns: DENSITIES,
    rows: ONYX_COLORS,
    component: (column, row) => (
      <OnyxInfoCard
        color={row}
        density={column}
        headline="This is an example multiline headline for the info card component"
        style={{ width: "24rem" }}
        closable
      >
        Lorem ipsum dolor sit amet consectetur. Felis euismod sit amet nulla nulla amet libero sed.
        <template v-slot:buttons>
          <OnyxButton label="Button" color="neutral" />
          <OnyxButton label="Button" color="neutral" />
        </template>
      </OnyxInfoCard>
    ),
  });
});

test.describe("Screenshot tests (closeable)", () => {
  executeMatrixScreenshotTest({
    name: "Info card (closeable)",
    columns: ["default", "hover", "focus-visible"],
    rows: ONYX_COLORS,
    component: (column, row) => (
      <OnyxInfoCard color={row} headline="Example headline" style={{ width: "24rem" }} closable>
        Lorem ipsum dolor sit amet consectetur. Felis euismod sit amet nulla nulla amet libero sed.
      </OnyxInfoCard>
    ),
    hooks: {
      beforeEach: async (component, page, column) => {
        const closeButton = component.getByRole("button", { name: "Close" });
        if (column === "hover") await closeButton.hover();
        if (column === "focus-visible") await page.keyboard.press("Tab");
      },
    },
  });
});

test.describe("Screenshot tests (slots)", () => {
  executeMatrixScreenshotTest({
    name: "Info card (slots)",
    columns: ["default", "closeable"],
    rows: ["headline", "headline+description", "description", "headline+description+no-icon"],
    component: (column, row) => (
      <OnyxInfoCard
        headline={row.includes("headline") ? "Headline" : undefined}
        style={{ width: "24rem" }}
        closable={column === "closeable"}
        icon={row.includes("no-icon") ? false : undefined}
      >
        {row.includes("description") &&
          "Lorem ipsum dolor sit amet consectetur. Felis euismod sit amet nulla nulla amet libero sed."}
      </OnyxInfoCard>
    ),
  });
});

test("should be closable", async ({ mount }) => {
  // ARRANGE
  let closeEvents = 0;

  const component = await mount(
    <OnyxInfoCard headline="Headline" closable onClose={() => closeEvents++} />,
  );

  // ACT
  await component.getByRole("button", { name: "Close" }).click();

  // ASSERT
  await expect(() => expect(closeEvents).toBe(1)).toPass();
});

test("should have compact density for buttons by default", async ({ mount }) => {
  // ARRANGE
  const component = await mount(
    <OnyxInfoCard headline="Headline">
      <template v-slot:buttons>
        <OnyxButton label="Button" color="neutral" />
      </template>
    </OnyxInfoCard>,
  );

  const buttons = component.locator(".onyx-info-card__buttons");

  // ASSERT
  await expect(buttons).toHaveClass(/onyx-density-compact/);
});
