import type { Collections } from "@nuxt/content";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useCollection } from "../../../app/composables/useCollection.js";

const TEST_COLLECTION = "docs" as keyof Collections;

const mockLocale = ref("en");
const mockRoute = reactive({ path: "/" });

const mockFirst = vi.fn();
const mockPath = vi.fn().mockReturnValue({ first: mockFirst });
const mockQueryCollection = vi.fn().mockReturnValue({ path: mockPath });

vi.mock("vue-i18n", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    useI18n: () => ({ locale: mockLocale }),
  };
});

mockNuxtImport("useRoute", () => () => mockRoute);
vi.stubGlobal("useI18n", () => ({ locale: mockLocale }));
vi.stubGlobal("queryCollection", mockQueryCollection);

describe("useCollection", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockLocale.value = "en";
    mockRoute.path = "/";

    mockFirst.mockReset().mockResolvedValue({ id: "doc-1", title: "Test Doc" });
    mockPath.mockClear().mockReturnValue({ first: mockFirst });
    mockQueryCollection.mockClear().mockReturnValue({ path: mockPath });
  });

  describe("path resolution", () => {
    test("should use explicitly provided path string", async () => {
      // ARRANGE
      mockRoute.path = "/en/some-other-page";
      mockLocale.value = "en";

      // ACT
      await useCollection({ collection: TEST_COLLECTION, path: "/custom/path" });

      // ASSERT
      expect(mockPath).toHaveBeenCalledWith("/custom/path");
    });

    test("should support path as a ref and react to changes on refresh", async () => {
      // ARRANGE
      mockRoute.path = "/en/ignored";
      const pathRef = ref("/initial-path");

      // ACT
      const result = await useCollection({
        collection: "path-ref-test" as keyof Collections,
        path: pathRef,
      });

      // ASSERT
      expect(mockPath).toHaveBeenCalledWith("/initial-path");

      // ACT
      pathRef.value = "/updated-path";
      await result.refresh();

      // ASSERT
      expect(mockPath).toHaveBeenCalledWith("/updated-path");
    });

    test.each([
      {
        description: "exact locale route without trailing slash",
        routePath: "/en",
        locale: "en",
        expectedPath: "/",
      },
      {
        description: "exact locale route with different locale",
        routePath: "/de",
        locale: "de",
        expectedPath: "/",
      },
      {
        description: "exact locale route with trailing slash",
        routePath: "/en/",
        locale: "en",
        expectedPath: "/",
      },
      {
        description: "route starting with locale prefix",
        routePath: "/en/getting-started",
        locale: "en",
        expectedPath: "/getting-started",
      },
      {
        description: "nested route starting with locale prefix",
        routePath: "/de/nested/deep/page",
        locale: "de",
        expectedPath: "/nested/deep/page",
      },
      {
        description: "route without locale prefix",
        routePath: "/getting-started",
        locale: "en",
        expectedPath: "/getting-started",
      },
      {
        description: "root route without locale prefix",
        routePath: "/",
        locale: "en",
        expectedPath: "/",
      },
      {
        description: "route that starts with locale letters but not as a path prefix",
        routePath: "/enterprise",
        locale: "en",
        expectedPath: "/enterprise",
      },
      {
        description: "route with a different locale prefix than current locale",
        routePath: "/de/getting-started",
        locale: "en",
        expectedPath: "/de/getting-started",
      },
    ])(
      "should resolve path to '$expectedPath' when $description",
      async ({ description, routePath, locale, expectedPath }) => {
        // ARRANGE
        mockLocale.value = locale;
        mockRoute.path = routePath;

        // ACT
        await useCollection({
          collection: `route-${description}` as keyof Collections,
        });

        // ASSERT
        expect(mockPath).toHaveBeenCalledWith(expectedPath);
      },
    );

    test("should reactively update path when route.path changes on refresh", async () => {
      // ARRANGE
      mockRoute.path = "/en/page-a";
      mockLocale.value = "en";

      // ACT
      const result = await useCollection({
        collection: "reactive-route-test" as keyof Collections,
      });

      // ASSERT
      expect(mockPath).toHaveBeenCalledWith("/page-a");

      // ACT
      mockRoute.path = "/en/page-b";
      await result.refresh();

      // ASSERT
      expect(mockPath).toHaveBeenCalledWith("/page-b");
    });

    test("should reactively update path when locale changes on refresh", async () => {
      // ARRANGE
      mockRoute.path = "/de/overview";
      mockLocale.value = "en";

      // ACT
      const result = await useCollection({
        collection: "reactive-locale-test" as keyof Collections,
      });

      // ASSERT
      expect(mockPath).toHaveBeenCalledWith("/de/overview");

      // ACT
      mockLocale.value = "de";
      await result.refresh();

      // ASSERT
      expect(mockPath).toHaveBeenCalledWith("/overview");
    });
  });

  describe("collection resolution", () => {
    test("should support collection as a string value", async () => {
      // ACT
      await useCollection({ collection: "custom" as keyof Collections, path: "/test-collection" });

      // ASSERT
      expect(mockQueryCollection).toHaveBeenCalledWith("custom");
      expect(mockPath).toHaveBeenCalledWith("/test-collection");
    });

    test("should support collection as a ref and react to changes on refresh", async () => {
      // ARRANGE
      const collectionRef = ref<keyof Collections>("docs" as keyof Collections);

      // ACT
      const result = await useCollection({
        collection: collectionRef,
        path: "/test-collection-ref",
      });

      // ASSERT
      expect(mockQueryCollection).toHaveBeenCalledWith("docs");

      // ACT
      collectionRef.value = "blog" as keyof Collections;
      await result.refresh();

      // ASSERT
      expect(mockQueryCollection).toHaveBeenCalledWith("blog");
    });
  });

  describe("error handling", () => {
    test("should return 404 error when document is not found (null)", async () => {
      // ARRANGE
      mockFirst.mockResolvedValueOnce(null);

      // ACT
      const result = await useCollection({ collection: TEST_COLLECTION, path: "/missing" });

      // ASSERT
      expect(result.data.value).toBeNull();
      expect(result.error.value).toMatchObject({
        message: "Page not found",
        fatal: true,
        status: 404,
      });
    });

    test("should return 404 error when document is undefined", async () => {
      // ARRANGE
      mockFirst.mockResolvedValueOnce(undefined);

      // ACT
      const result = await useCollection({ collection: TEST_COLLECTION, path: "/undefined-page" });

      // ASSERT
      expect(result.error.value).toMatchObject({
        message: "Page not found",
        fatal: true,
        status: 404,
      });
    });

    test("should return no error when document is found", async () => {
      // ARRANGE
      const mockDoc = { title: "Available Page" };
      mockFirst.mockResolvedValueOnce(mockDoc);

      // ACT
      const result = await useCollection({ collection: TEST_COLLECTION, path: "/available-page" });

      // ASSERT
      expect(result.data.value).toEqual(mockDoc);
      expect(result.error.value).toBeNull();
    });

    test("should return query error when error occurs", async () => {
      // ARRANGE
      const customError = new Error("Failed to fetch content");
      mockFirst.mockRejectedValueOnce(customError);

      // ACT
      const result = await useCollection({ collection: TEST_COLLECTION, path: "/error-page" });

      // ASSERT
      expect(result.error.value).toMatchObject(customError);
    });

    test("should reactively update error when data becomes available after refresh", async () => {
      // ARRANGE
      mockFirst.mockResolvedValueOnce(null);

      // ACT
      const result = await useCollection({ collection: TEST_COLLECTION, path: "/recovery-page" });

      // ASSERT
      expect(result.data.value).toBeNull();
      expect(result.error.value).toMatchObject({
        message: "Page not found",
        fatal: true,
        status: 404,
      });

      // ARRANGE
      mockFirst.mockResolvedValueOnce({ id: "recovered", title: "Recovered Page" });

      // ACT
      await result.refresh();

      // ASSERT
      expect(result.error.value).toBeNull();
      expect(result.data.value).toEqual({ id: "recovered", title: "Recovered Page" });
    });
  });
});
