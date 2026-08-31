import { nanoid } from "nanoid";
import type { ColumnDefinition } from "../types/index.js";

/**
 * Gets a new column definition with default values.
 */
export function getDefaultColumnDefinition(): ColumnDefinition {
  return {
    id: nanoid(),
    headline: "Headline",
    type: "text",
  };
}
