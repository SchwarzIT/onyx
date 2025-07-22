import { escapeGridAreaName } from "./utils.js";

export type ScreenshotMatrixProps = {
  /**
   * Test name. Will be displayed above the matrix screenshot and be used as filename.
   */
  name: string;
  /**
   * Matrix columns. Must not contain spaces.
   */
  columns: readonly string[];
  /**
   * Matrix rows. Must not contain spaces.
   */
  rows: readonly string[];
  /**
   * Current Playwright browser name.
   */
  browserName: string;
  /**
   * Matrix children. Must contain column/row labels and screenshots for each column-row combination.
   */
  children: unknown[];
};

export const ScreenshotMatrix = (props: ScreenshotMatrixProps) => {
  /**
   * CSS "grid-template-areas" for the current columns and rows.
   * Every grid element must have the "grid-area" set to `{row}-{column}` to place it correctly.
   */
  const getGridTemplateAreas = () => {
    const lines: string[] = [
      `"blank ${props.columns.map((col) => `column-${escapeGridAreaName(col)}`).join(" ")}"`,
    ];

    props.rows.forEach((row) => {
      lines.push(
        `"row-${escapeGridAreaName(row)} ${props.columns.map((col) => `${escapeGridAreaName(row)}-${escapeGridAreaName(col)}`).join(" ")}"`,
      );
    });

    return lines.join("\n");
  };

  return (
    <div style={{ width: "max-content", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.25rem", lineHeight: "1.75rem", margin: "0" }}>
          Screenshot test: {props.name}
        </h1>
        <div>Browser: {props.browserName}</div>
      </div>

      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateRows: "auto",
          width: "max-content",
          alignItems: "center",
          justifyContent: "center",
          gridTemplateColumns: `auto repeat(${props.columns.length}, 1fr)`,
          gridTemplateAreas: getGridTemplateAreas(),
        }}
      >
        <div style={{ gridArea: "blank" }}></div>
        {props.children}
      </div>
    </div>
  );
};
