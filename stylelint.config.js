/** @type {import('stylelint').Config} */
export default {
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "plugin/no-unsupported-browser-features": [
      true,
      {
        severity: "warning",
        ignorePartialSupport: true,
      },
    ],
  },
};
