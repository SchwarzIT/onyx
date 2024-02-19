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
    .map((_, ri) =>
      Array.from({ length: columns + 1 })
        .map((_, ci) => {
          if (ri === 0 && ci === 0) return ".";
          if (ri === 0) return `colHeadline${ci - 1}`;
          if (ci === 0) return `rowHeadline${ri - 1}`;
          else return `case${(ri - 1) * columns + ci - 1}`;
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
  testCases.map((tC, i) => (
    <div
      style={{ gridArea: `case${i}` }}
      key={i}
      // Handle common cases
      class={{
        [`pw-${tC["focusState"]}`]: tC["focusState"],
        "onyx-use-optional": tC["state"] === "optional",
      }}
    >
      {caseBuilder(tC, i)}
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

    // We don't want any scrollbars on our screenshot, so we get our element height and add some buffer
    const { width, height } = await page.getByTestId("screenshot-root").evaluate((e) => ({
      height: e.scrollHeight + 50,
      width: e.scrollWidth + 50,
    }));
    await page.setViewportSize({ width, height });

    // ASSERT
    await expect(component).toHaveScreenshot(screenshotName);
  };
