import { type DataGridFeatureOptions } from "..";
import type { DataGridEntry } from "../../types";

/**
 * The configuration options for the resizing feature in the OnyxDataGrid component.
 * Includes settings for the individual columns and general resizing behavior.
 */
export type ResizingOptions<TEntry extends DataGridEntry> = DataGridFeatureOptions<TEntry, object>;
