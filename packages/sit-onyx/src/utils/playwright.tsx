import { type MountOptions } from "@playwright/experimental-ct-vue";
import type { Page } from "@playwright/test";
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

type TestArg = Parameters<Parameters<typeof test>[2]>[0];
type MountResultJsx = Awaited<ReturnType<TestArg["mount"]>>;

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
      const wrappedMount = ((jsx, options) =>
        mount(
          <div
            style={{ width: "max-content", padding: "1rem" }}
            class={{
              "onyx-use-optional": options?.useOptional,
            }}
          >
            {jsx}
          </div>,
        )) satisfies WrappedMount;

      await page.getByRole("document").focus(); // reset focus
      await page.getByRole("document").hover(); // reset mouse
      await page.mouse.up(); // reset mouse
      const component = await caseBuilder(testCase, wrappedMount, page);

      // ASSERT
      const screenshotName = [
        baseName,
        ...Object.entries(testCase).map(([key, value]) => `${key}--${value}`),
      ].join("-");
      await expect(component).toHaveScreenshot(`${screenshotName}.png`);
    }
  };

/**
 * Mock icon to use in Playwright component tests (.tsx files) because Playwright has
 * issues when importing from "@sit-onyx/icons" directly with version 1.42.1.
 *
 * Equivalent to:
 * import mockPlaywrightIcon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
 */
export const mockPlaywrightIcon = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 32 32"><path d="M16 2C8.28 2 2 8.28 2 16s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2m0 26C9.383 28 4 22.617 4 16S9.383 4 16 4s12 5.383 12 12-5.383 12-12 12"/><path d="M11 13c.552 0 1 .449 1 1h2c0-1.654-1.346-3-3-3s-3 1.346-3 3h2c0-.551.448-1 1-1m10-2c-1.654 0-3 1.346-3 3h2a1.001 1.001 0 0 1 2 0h2c0-1.654-1.346-3-3-3m-5 11a5.01 5.01 0 0 1-4.325-2.501l-1.73 1.002C11.193 22.659 13.514 24 16 24s4.807-1.341 6.056-3.499l-1.73-1.002A5.02 5.02 0 0 1 16 22"/></svg>`;

export type MatrixScreenshotOptions<
  T = unknown,
  S extends Readonly<Record<string, ReadonlyArray<string>>> = Readonly<
    Record<string, ReadonlyArray<string>>
  >,
> = {
  states: S;
  component: T;
  props: (state: Permutation<S>) => MountOptions<object, T>["props"];
  baseName: string;
  slots?: (state: Permutation<S>) => MountOptions<object, T>["slots"];
  useOptional?: (state: Permutation<S>) => boolean;
  onAfterUpdate?: (
    state: Permutation<S>,
    context: { component: MountResultJsx; page: Page },
  ) => void | Promise<void>;
};

export const matrixScreenshotTest = <T, S extends Readonly<Record<string, ReadonlyArray<string>>>>(
  options: MatrixScreenshotOptions<T, S>,
) => {
  const permutations = generatePermutations(options.states);
  const rootSelector = "#root" as const;

  return async ({ mount, page }: TestArg) => {
    // default test timeout is 10s (see playwright.config.ts), so we increase it here
    // so that the timeout is applied to every permutation
    test.setTimeout(permutations.length * 10 * 1000);

    let component = await mount(options.component);

    await page.evaluate((selector) => {
      const root = document.querySelector<HTMLElement>(selector);
      if (!root) return;
      root.style.padding = "1rem";
      root.style.maxWidth = "max-content";
    }, rootSelector);

    for (const testCase of permutations) {
      await page.getByRole("document").focus(); // reset focus
      await page.getByRole("document").hover(); // reset mouse
      await page.mouse.up(); // reset mouse

      const props = options.props(testCase);

      if (options.slots) {
        component = await mount(options.component, {
          props,
          slots: options.slots(testCase),
        });
      } else {
        await component.update({ props });
      }

      const isOptional = options.useOptional?.(testCase);
      if (isOptional) {
        await page.evaluate(
          (selector) => document.querySelector(selector)?.classList.add("onyx-use-optional"),
          rootSelector,
        );
      }

      await options.onAfterUpdate?.(testCase, { component, page });

      // ASSERT
      const screenshotName = [
        options.baseName,
        ...Object.entries(testCase).map(([key, value]) => `${key}--${value}`),
      ].join("-");
      await expect(page.locator(rootSelector)).toHaveScreenshot(`${screenshotName}.png`);
    }
  };
};
