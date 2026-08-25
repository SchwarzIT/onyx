export type GenerateDataGridPayload = {
  mode: "basic" | "advanced";
  columns: ColumnDefinition[];
};

export type ColumnDefinition = {
  headline: string;
};
