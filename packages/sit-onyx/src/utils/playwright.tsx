import type { JSX } from "vue/jsx-runtime";
import { expect, test } from "../playwright-axe";

type Permutation<T extends Record<string, readonly string[]>> = {
  [key in keyof T]: T[key][number];
};

/**
 * recursive generate permutations function
 */
const _generatePermutations = <
  T extends Readonly<Record<string, readonly string[]>>,
  K extends keyof T,
  R extends Permutation<T>,
>(
  obj: T,
  keys: K[],
  current: Partial<R> = {},
  result: R[] = [],
): R[] => {
  if (keys.length === 0) {
    result.push({ ...current } as R);
  } else {
    const [key, ...restKeys] = keys;
    const values = obj[key];
    for (const value of values) {
      current[key] = value as R[K];
      _generatePermutations(obj, restKeys, current, result);
    }
  }
  return result;
};

/**
 * Creates an array of all possible permutations of the values of an object
 */
const generatePermutations = <T extends Record<string, readonly string[]>>(obj: T) => {
  const keys = Object.keys(obj) as (keyof T)[];
  return _generatePermutations(obj, keys);
};

/**
 * Builds a grid-template-area value for the screenshot matrix test.
 *
 * @example
 * ```
 * ". rowHeadline0 rowHeadline1 rowHeadline2"
 * "colHeadline0 case0 case1 case2"
 * "colHeadline1 case3 case4 case5"
 * "colHeadline2 case6 case7 case8"
 * "colHeadline3 case9 case10 case11"
 * ```
 */
const buildGridTemplate = (rows: number, columns: number) =>
  Array.from({ length: rows + 1 })
    .map((_, rowIndex) =>
      Array.from({ length: columns + 1 })
        .map((_, colIndex) => {
          if (rowIndex === 0 && colIndex === 0) return ".";
          if (rowIndex === 0) return `colHeadline${colIndex - 1}`;
          if (colIndex === 0) return `rowHeadline${rowIndex - 1}`;
          else return `case${(rowIndex - 1) * columns + colIndex - 1}`;
        })
        .join(" "),
    )
    .map((v) => `"${v}"`) // every row is surrounded by "
    .join("\n"); // every column has its own line

type ComponentStates = Readonly<Record<string, ReadonlyArray<string>>>;
type CaseBuilder<S extends ComponentStates> = (c: Permutation<S>, i: number) => JSX.Element;

/**
 * Generates a test case in the grid and places it accordingly.
 */
const createTestCases = <S extends ComponentStates>(
  testCases: Permutation<S>[],
  caseBuilder: CaseBuilder<S>,
) =>
  testCases.map((testCase, i) => (
    <div
      style={{ gridArea: `case${i}` }}
      key={i}
      // Handle common cases
      {...{ [`data-sim-${testCase["focusState"]}`]: !!testCase["focusState"] || undefined }}
      class={{
        "onyx-use-optional": testCase["state"] === "optional",
      }}
    >
      {caseBuilder(testCase, i)}
    </div>
  ));

/**
 * Generates the jsx for the screenshot matrix test.
 * It uses a grid with named areas to place all test cases, the row and column headlines.
 */
const generateScreenshotMatrix = <S extends ComponentStates>(
  states: S,
  caseBuilder: CaseBuilder<S>,
) => {
  const [rowStates] = Object.values(states);
  const colStates = generatePermutations(Object.fromEntries(Object.entries(states).slice(1))).map(
    (e) => Object.values(e),
  );

  const columns = colStates.length;
  const rows = rowStates.length;
  const template = buildGridTemplate(rows, columns);

  const testCases = generatePermutations(states);

  return (
    <main
      data-testid="screenshot-root"
      style={{
        fontFamily: "var(--onyx-font-family-mono)",
        padding: "1rem",
        display: "grid",
        gap: "0.75rem",
        "grid-template-areas": template,
      }}
    >
      {
        // Create column headlines
        colStates.map((state, i) => (
          <div
            key={i}
            style={{
              gridArea: `colHeadline${i}`,
              display: "flex",
              flexDirection: "column",
              writingMode: "vertical-lr",
              textOrientation: "mixed",
            }}
          >
            {state.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        ))
      }
      {
        // Create row headlines
        rowStates.map((state, i) => (
          <div key={i} style={{ gridArea: `rowHeadline${i}` }}>
            {state}
          </div>
        ))
      }
      {createTestCases(testCases, caseBuilder)}
    </main>
  );
};

type TestArg = Parameters<Parameters<typeof test>[1]>[0];

/**
 * Creates a playwright screenshot of a matrix with all permutations of the given component states.
 * First define the possible States in an Object.
 * The first key in the object will define the number and naming of the columns.
 * All other keys will be used to define and label the columns.
 *
 * @example
 * ```tsx
 * const STATES = {
 *   state: ["default", "disabled"],
 *   select: ["unselected", "selected"],
 *   focusState: ["", "hover", "focus-visible"],
 * } as const;
 *
 * test(
 *   "Screenshot matrix",
 *   createMatrixScreenshot(STATES, "matrix.png", ({ select, state }, i) => (
 *     <Component
 *       selected={select === "selected"}
 *       disabled={state === "disabled"}
 *       label="label"
 *       id={`id-${i}`}
 *     />
 *   )),
 * );
 * ```
 *
 * @param states All possible states of the matrix for which permutations will be generated. Use `as const` to allow type support for the values. The first key in the object will be used for columns in the table.
 * @param screenshotName Name of the screenshot that will be passed to `expect(...).toHaveScreenshot(screenshotName)`
 * @param caseBuilder Build function that will be called for every permutation to generate JSX for the given component state.
 */
export const createMatrixScreenshot =
  <S extends Readonly<Record<string, ReadonlyArray<string>>>>(
    states: S,
    screenshotName: string,
    caseBuilder: (c: Permutation<S>, i: number) => JSX.Element,
  ) =>
  async ({ mount, page }: TestArg) => {
    // ARRANGE
    const mountable = generateScreenshotMatrix(states, caseBuilder);
    const component = await mount(mountable);

    // We don't want any scrollbars on our screenshot, so we get our element size and add some buffer
    const { width, height } = await page.getByTestId("screenshot-root").evaluate((e) => ({
      height: e.scrollHeight + 50,
      width: e.scrollWidth + 50,
    }));
    await page.setViewportSize({ width, height });

    // ASSERT
    await expect(component).toHaveScreenshot(screenshotName);
  };
