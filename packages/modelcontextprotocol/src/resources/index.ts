import { getComponentApi } from "./get-component-api.js";
import { listComponents } from "./list-components.js";
import { listCssDesignTokens } from "./list-css-design-tokens.js";
import { listIcons } from "./list-icons.js";
import { allSkills } from "./skills.js";

export const resources = [
  getComponentApi,
  listComponents,
  listIcons,
  listCssDesignTokens,
  ...allSkills,
];
