import {} from "@playwright/experimental-ct-vue";
import type { Locator } from "@playwright/test";
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

type TestArg = Parameters<Parameters<typeof test>[1]>[0];
type MountResultJsx = {
  unmount(): Promise<void>;
  update(component: JSX.Element): Promise<void>;
} & Locator;

type ComponentStates = Readonly<Record<string, ReadonlyArray<string>>>;
type WrappedMount = (
  jsx: JSX.Element,
  options?: { useOptional?: boolean },
) => Promise<MountResultJsx>;
type CaseBuilder<S extends ComponentStates> = (
  c: Permutation<S>,
  mount: WrappedMount,
  page: TestArg["page"],
) => Promise<MountResultJsx>;

/**
 * Creates screenshots for all permutations of the given component states.
 * Will create a screenshot for each permutation.
 * Define the possible States in an `const` object literal.
 *
 * @example
 * ```tsx
 * const STATES = {
 *   state: ["default", "required", "optional", "disabled"],
 *   select: ["unselected", "selected"],
 *   focusState: ["", "hover", "focus-visible"],
 * } as const;
 *
 *
 * test(
 *   "Screenshot matrix",
 *   createScreenshotsForAllStates(
 *     STATES,
 *     "component-name",
 *     async ({ select, state, focusState }, mount, page) => {
 *       const component = await mount(
 *         <Component
 *           modelValue={select === "selected"}
 *           disabled={state === "disabled"}
 *           required={state === "required"}
 *         />,
 *         { useOptional: state === "optional" },
 *       );
 *
 *       const input = component.getByRole("textbox");
 *       if (focusState === "focus-visible") await page.keyboard.press("Tab");
 *       if (focusState === "hover") await input.hover();
 *       return component;
 *     },
 *   ),
 * );
 * ```
 *
 * @param states All possible states for which permutations will be generated. Use `as const` to allow type support for the values.
 * @param baseName Prefix of the generated screenshot file names.
 * @param caseBuilder Build function that will be called for every permutation to generate JSX and perform setup interactions for the given component state.
 */
export const createScreenshotsForAllStates =
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
            style={{ width: "max-content", padding: "1rem" }}
            class={{
              "onyx-use-optional": options?.optional,
            }}
          >
            {jsx}
          </div>,
        )) as WrappedMount;

      await page.getByRole("document").focus(); // reset focus
      await page.getByRole("document").hover(); // reset mouse
      const component = await caseBuilder(testCase, wrappedMount, page);

      // ASSERT
      const screenshotName = [
        baseName,
        ...Object.entries(testCase).map(([key, value]) => `${key}--${value}`),
      ].join("-");
      await expect(component).toHaveScreenshot(`${screenshotName}.png`);
    }
  };
