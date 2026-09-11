import type { HeadlineType } from "sit-onyx";

export type GenerateDataGridPayload = {
  mode: "basic" | "advanced";
  columns: ColumnDefinition[];
  rows: RowDefinition;
  headline?: Exclude<HeadlineType, "h5" | "h6">;
  pagination?: "select" | "button";
};

export type ColumnDefinition = {
  id: string;
  headline: string;
  type: ColumnType;
  width: "hug" | "auto" | number;
};

export type ColumnType = "text" | "checkbox" | "icon" | "systemButton" | "tag";

export type RowDefinition = {
  count: number;
  style: "flat" | "striped";
  stroke: "horizontal" | "grid";
};
