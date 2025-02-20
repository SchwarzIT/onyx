import { test } from "../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../playwright/screenshots";
import OnyxImage from "./OnyxImage.vue";
import TEST_IMAGE from "./test-image.jpg";
import { IMAGE_SHAPES } from "./types";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Image",
    columns: ["default", "error"],
    rows: ["default", ...IMAGE_SHAPES],
    component: (column, row) => (
      <OnyxImage
        src={column === "error" ? "#does-not-exist" : TEST_IMAGE}
        alt="Example alt text that describes the image"
        width={256}
        height={128}
        shape={row === "default" ? undefined : row}
      />
    ),
  });
});
