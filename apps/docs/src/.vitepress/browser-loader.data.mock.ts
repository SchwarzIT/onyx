import type { Data } from "./browser-loader.data.js";

// We need to mock the Data for Storybook
export const data: Data = {
  browsers: [
    {
      coverage: 96.86,
      id: "chrome",
      name: "Chrome",
      versions: {
        "108.0.0": 108,
        "107.0.0": 107,
      },
    },
    {
      coverage: 91.86,
      id: "firefox",
      name: "Firefox",
      versions: {
        "108.0.0": 108,
        "107.0.0": 107,
      },
    },
  ],
};
