import type { Data } from "./browser-loader.data.js";

// We need to mock the Data for Storybook
export const data: Data = {
  browsers: [
    {
      id: "chrome",
      name: "Chrome",
      version: "107",
      image: "/images/browsers/chrome.svg",
    },
    {
      id: "firefox",
      name: "Firefox",
      version: "42",
      image: "/images/browsers/firefox.svg",
    },
  ],
};
