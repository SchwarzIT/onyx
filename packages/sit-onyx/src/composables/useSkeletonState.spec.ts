import { expect, it, vi } from "vitest";
import { reactive, toValue } from "vue";
import {
  SKELETON_INJECTED_SYMBOL,
  provideSkeletonContext,
  useSkeletonContext,
  type SkeletonInjected,
} from "./useSkeletonState.js";

let injected: (args: unknown[]) => void;

vi.mock("vue", async (importOriginal) => {
  const mod = await importOriginal<typeof import("vue")>();
  return {
    ...mod,
    inject: () => injected,
    provide: (_: symbol, ctx: (...args: unknown[]) => void) => (injected = ctx),
  };
});

it.for([
  {
    pageLayoutProps: { skeleton: true },
    localProps: { skeleton: true },
    expected: true,
  },
  {
    pageLayoutProps: { skeleton: false },
    localProps: { skeleton: true },
    expected: true,
  },
  {
    pageLayoutProps: { skeleton: true },
    localProps: { skeleton: false },
    expected: false,
  },
  {
    pageLayoutProps: { skeleton: false },
    localProps: { skeleton: false },
    expected: false,
  },
  {
    pageLayoutProps: { skeleton: true },
    localProps: { skeleton: SKELETON_INJECTED_SYMBOL },
    expected: true,
  },
  {
    pageLayoutProps: { skeleton: false },
    localProps: { skeleton: SKELETON_INJECTED_SYMBOL },
    expected: false,
  },
  {
    pageLayoutProps: undefined,
    localProps: { skeleton: SKELETON_INJECTED_SYMBOL },
    expected: false,
  },
  {
    pageLayoutProps: undefined,
    localProps: { skeleton: true },
    expected: true,
  },
  {
    pageLayoutProps: undefined,
    localProps: { skeleton: false },
    expected: false,
  },
] as const)(
  "it should derive expected state when correctly",
  ({ pageLayoutProps, localProps, expected }) => {
    provideSkeletonContext(pageLayoutProps);
    const result = useSkeletonContext(localProps);
    Object.entries(expected).forEach(([value]) => {
      const resultValue = toValue(result);

      expect(
        resultValue,
        `Expected "${value}", got "${resultValue}" for pageLayoutProps "${pageLayoutProps}" and localProps "${localProps}"`,
      ).toBe(value);
    });
  },
);

it("should update when changed", async () => {
  const pageLayoutProps = reactive({ skeleton: false });
  provideSkeletonContext(pageLayoutProps);

  const localProps = reactive({ skeleton: SKELETON_INJECTED_SYMBOL as SkeletonInjected });
  const skeleton = useSkeletonContext(localProps);
  expect(skeleton.value).toBe(false);

  pageLayoutProps.skeleton = true;
  localProps.skeleton = true;
  expect(skeleton.value).toBe(true);
  localProps.skeleton = false;
  expect(skeleton.value).toBe(false);
});
