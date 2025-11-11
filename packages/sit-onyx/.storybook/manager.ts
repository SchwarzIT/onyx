import type { Badge, TagBadgeParameters } from "storybook-addon-tag-badges";
import { addons } from "storybook/manager-api";

const TAG_TYPES = {
  "new:component": {
    text: "New ✨",
    style: {
      backgroundColor: "#7392aa",
      color: "#fff",
    },
  },
  "new:feature": {
    text: "New ✨",
    style: {
      backgroundColor: "#e3eaf0",
      border: "solid 1px #7392aa",
      color: "#697985",
    },
  },
  unstable: {
    text: "Unstable 🧪",
    style: {
      backgroundColor: "#ffe0fa",
      color: "#4a4a4a",
    },
  },
} as const satisfies Record<string, Badge>;

addons.setConfig({
  toolbar: {
    // Per onyx storybook configuration, there is only a single, default (dynamic) theme.
    // Therefore the background select is redundant.
    "storybook/background": { hidden: true },
  },
  tagBadges: [
    {
      tags: Object.keys(TAG_TYPES),
      display: {
        toolbar: false,
      },
      badge: ({ tag }) => TAG_TYPES[tag as keyof typeof TAG_TYPES] ?? { text: tag },
    },
  ] satisfies TagBadgeParameters,
});
