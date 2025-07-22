import type { Badge, TagBadgeParameters } from "storybook-addon-tag-badges";
import { addons } from "storybook/internal/manager-api";

addons.setConfig({
  toolbar: {
    "storybook/background": { hidden: true },
  },
  tagBadges: [
    {
      tags: {
        prefix: "new:*",
      },
      display: {
        toolbar: false,
      },
      badge: ({ getTagSuffix, tag }) => {
        const type: string = getTagSuffix(tag);

        const TAG_TYPES: Record<string, Omit<Badge, "text">> = {
          component: {
            bgColor: "#7392aa",
            fgColor: "#fff",
          },
          feature: {
            bgColor: "#e3eaf0",
            borderColor: "#7392aa",
            fgColor: "#697985",
          },
        };

        return {
          text: "New",
          ...TAG_TYPES[type],
        };
      },
    },
  ] satisfies TagBadgeParameters,
});
