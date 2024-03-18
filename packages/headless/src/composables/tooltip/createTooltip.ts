import { createId } from "../..";
import { createBuilder } from "../../utils/builder";

export const createTooltip = createBuilder(() => {
  const tooltipId = createId("tooltip");

  return {
    elements: {
      trigger: {
        "aria-describedby": tooltipId,
      },
      tooltip: {
        role: "tooltip",
        id: tooltipId,
      },
    },
    state: {},
  };
});
