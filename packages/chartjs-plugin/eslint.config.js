// @ts-check
import baseConfig from "../../eslint.config";

export default [
  ...baseConfig,
  {
    rules: {
      "no-console": "error",
      "no-debugger": "error",
    },
  },
];
