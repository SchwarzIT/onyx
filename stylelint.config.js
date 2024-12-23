/** @type {import('stylelint').Config} */
export default {
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "plugin/no-unsupported-browser-features": [
      true,
      {
        /** ignore all css features that are safe to expect here */
        ignore: [
          "css-has",
          "css-overscroll-behavior",
          "css-container-query-units",
          "css-container-queries",
          "css-selection",
          "text-size-adjust",
          "css-resize",
          "css-scrollbar",
          "css-touch-action",
        ],
        ignorePartialSupport: true,
      },
    ],
  },
};
