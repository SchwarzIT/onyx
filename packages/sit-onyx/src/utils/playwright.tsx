import type { JSX } from "vue/jsx-runtime";
import { expect, test } from "../playwright-axe";
import type { Locator } from "@playwright/test";
import {} from "@playwright/experimental-ct-vue";

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

type TestArg = Parameters<Parameters<typeof test>[1]>[0];
type MountResultJsx = {
  unmount(): Promise<void>;
  update(component: JSX.Element): Promise<void>;
} & Locator;

type ComponentStates = Readonly<Record<string, ReadonlyArray<string>>>;
type WrappedMount = (jsx: JSX.Element, options?: { optional?: boolean }) => Promise<MountResultJsx>;
type CaseBuilder<S extends ComponentStates> = (
  c: Permutation<S>,
  mount: WrappedMount,
  page: TestArg["page"],
) => Promise<MountResultJsx>;

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
 * @param baseName Name of the screenshot that will be passed to `expect(...).toHaveScreenshot(screenshotName)`
 * @param caseBuilder Build function that will be called for every permutation to generate JSX for the given component state.
 */
export const createMatrixScreenshot =
  <S extends Readonly<Record<string, ReadonlyArray<string>>>>(
    states: S,
    baseName: string,
    caseBuilder: CaseBuilder<S>,
  ) =>
  async ({ mount, page }: TestArg) => {
    const permutations = generatePermutations(states);

    for (const testCase of permutations) {
      // ARRANGE
      const wrappedMount = ((jsx: JSX.Element, options?: { optional?: boolean }) =>
        mount(
          <div
            style={{ width: "min-content", padding: "1rem" }}
            class={{
              "onyx-use-optional": options?.optional,
            }}
          >
            {jsx}
          </div>,
        )) as WrappedMount;

      const component = await caseBuilder(testCase, wrappedMount, page);

      // ASSERT
      const screenshotName = [
        baseName,
        ...Object.entries(testCase).map(([key, value]) => `${key}--${value}`),
      ].join("-");
      await expect(component).toHaveScreenshot(`${screenshotName}.png`);
    }
  };
