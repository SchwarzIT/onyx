import { iconPlaceholder } from "@sit-onyx/icons";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { createSSRApp, h, type Component, type VNode } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import { renderToString } from "vue/server-renderer";
import * as ALL_EXPORTS from "./index.js";

type Components = {
  [TKey in Extract<keyof typeof ALL_EXPORTS, `Onyx${string}`>]: {
    props?: ComponentProps<(typeof ALL_EXPORTS)[TKey]>;
    render?: () => VNode;
  };
};

const COMPONENTS: Components = {
  ...Object.keys(ALL_EXPORTS)
    .filter((componentName) => componentName.startsWith("Onyx"))
    .reduce((obj, componentName) => {
      obj[componentName as keyof Components] = {};
      return obj;
    }, {} as Components),
  // add component overrides below that e.g. need custom required props to render correctly
  OnyxUserMenu: {
    props: {
      fullName: "John Doe",
    },
  },
  OnyxTimer: {
    props: {
      label: "Timer",
      endTime: new Date(),
    },
  },
  OnyxNavBar: {
    render: () =>
      h(ALL_EXPORTS.OnyxNavBar, {
        appName: "App name",
        default: () => [
          h(ALL_EXPORTS.OnyxNavItem, { label: "Router Link", link: "#router-link" }),
          h(
            ALL_EXPORTS.OnyxNavItem,
            { label: "Nesting" },
            {
              children: () => [
                h(ALL_EXPORTS.OnyxNavItem, {
                  label: "Nested Router Link",
                  link: "#nested-router-link",
                }),
                h(ALL_EXPORTS.OnyxNavItem, {
                  label: "Nested Button",
                }),
              ],
            },
          ),
        ],
      }),
  },
  OnyxNavItemFacade: {
    props: {
      context: "navbar",
    },
  },
  OnyxLanguageMenuItem: {
    props: {
      modelValue: "en",
      options: [{ label: "English", value: "en" }],
    },
  },
  OnyxColorSchemeMenuItem: {
    props: {
      modelValue: "auto",
    },
  },
  OnyxColorSchemeDialog: {
    props: {
      modelValue: "auto",
    },
  },
  OnyxToastMessage: {
    props: {
      headline: "Toast message",
    },
  },
  OnyxTabs: {
    props: {
      label: "Tabs",
      modelValue: "tab-1",
    },
  },
  OnyxTab: {
    props: {
      value: "tab-1",
    },
  },
  OnyxSelectDialog: {
    props: {
      label: "Select dialog",
      modelValue: "option-1",
      options: [{ label: "Option 1", value: "option-1" }],
    },
  },
  OnyxSelect: {
    props: {
      label: "Select",
      listLabel: "Available options",
      options: [],
    },
  },
  OnyxRouterLink: {
    props: {
      href: "#link",
    },
  },
  OnyxRadioGroup: {
    props: {
      label: "Radio group",
      options: [],
    },
  },
  OnyxRadioButton: {
    props: {
      label: "Radio button",
      name: "radio",
      value: "value-1",
    },
  },
  OnyxProgressSteps: {
    props: {
      steps: [{ label: "Step 1" }, { label: "Step 2" }],
    },
  },
  OnyxProgressItem: {
    props: {
      label: "Progress step",
      value: 1,
    },
  },
  OnyxPagination: {
    props: {
      modelValue: 1,
      pages: 42,
    },
  },
  OnyxNotificationMessage: {
    props: {
      headline: "Headline",
    },
  },
  OnyxNotificationCard: {
    props: {
      headline: "Headline",
      createdAt: new Date(),
    },
  },
  OnyxMoreList: {
    props: {
      injectionKey: Symbol(),
    },
  },
  OnyxMobileNavButton: {
    props: {
      label: "Mobile nav button",
      icon: iconPlaceholder,
    },
  },
  OnyxLink: {
    props: {
      href: "#link",
    },
  },
  OnyxInfoTooltip: {
    props: {
      text: "Text",
    },
  },
  OnyxImage: {
    props: {
      alt: "Image alt text",
      src: "image-url.png",
      width: 128,
      height: 128,
    },
  },
  OnyxIcon: {
    props: {
      icon: iconPlaceholder,
    },
  },
  OnyxHeadline: {
    props: {
      is: "h1",
    },
  },
  OnyxDataGrid: {
    props: {
      columns: [{ key: "id" }, { key: "name" }],
      data: [{ id: 1, name: "Name 1" }],
    },
  },
  OnyxDataGridRenderer: {
    props: {
      columns: [{ key: "id", component: () => ({}) }],
      rows: [],
    },
  },
  OnyxCheckboxGroup: {
    props: {
      label: "Checkbox group",
      options: [{ label: "Option 1", value: "option-1" }],
    },
  },
  OnyxCheckbox: {
    props: {
      label: "Checkbox",
      value: "option-1",
    },
  },
  OnyxBreadcrumbItem: {
    props: {
      href: "#link",
    },
  },
  OnyxBreadcrumb: {
    render: () =>
      h(ALL_EXPORTS.OnyxBreadcrumb, null, {
        default: () => [
          h(ALL_EXPORTS.OnyxBreadcrumbItem, { href: "/foo" }, () => "Foo"),
          h(ALL_EXPORTS.OnyxBreadcrumbItem, { href: "/foo/bar" }, () => "Bar"),
        ],
      }),
  },
  OnyxAvatar: {
    props: {
      fullName: "John Doe",
    },
  },
  OnyxAccordionItem: {
    props: {
      value: "value-1",
    },
  },
  OnyxFileCard: {
    props: {
      filename: "filename.pdf",
      size: "42MiB",
      type: "application/pdf",
    },
  },
  OnyxFileTypeIcon: {
    props: {
      type: "application/pdf",
    },
  },
  OnyxSegmentedControl: {
    props: {
      options: [{ label: "Option 1", value: "option-1" }],
      modelValue: "option-1",
    },
  },
  OnyxSegmentedControlElement: {
    props: {
      label: "Option 1",
      value: "option-1",
    },
  },
  OnyxSlider: {
    props: {
      label: "Slider",
      modelValue: 50,
    },
  },
  OnyxSliderControl: {
    props: {
      control: "value",
      modelValue: 50,
    },
  },
  OnyxUnstableCodeTabs: {
    props: {
      modelValue: "tab-1",
    },
  },
  OnyxUnstableCodeTab: {
    props: {
      value: "tab-1",
      code: "test-code",
    },
  },
  OnyxUnstableGlobalSearchOption: {
    props: {
      label: "Test option",
      value: "test-value",
    },
  },
  OnyxUnstableItemsPerPage: {
    props: {
      modelValue: 5,
      options: [5, 10, 20, 30, 40, 75],
    },
  },
};

describe("components", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test.each(
    Object.entries(COMPONENTS).map(([name, options]) => ({
      name: name as keyof typeof COMPONENTS,
      options,
    })),
  )("should mount $name without errors and console logs", async ({ name, options }) => {
    // ARRANGE
    const errorSpy = vi.spyOn(console, "error");
    const warningSpy = vi.spyOn(console, "warn");
    const render =
      options.render ??
      (() =>
        h(ALL_EXPORTS[name] as Component, {
          // label is a common prop for many components, so we add it here by defaults
          label: name,
          ...options.props,
        }));

    // ACT
    expect(
      () => mount(render),
      `should not throw error when mounting ${name} client-side app`,
    ).not.toThrow();

    // ASSERT
    expect(errorSpy).not.toHaveBeenCalled();
    expect(warningSpy).not.toHaveBeenCalled();

    // ACT
    await expect(
      createSsrTest(render),
      `should not throw error when mounting and hydrating ${name} server-side rendered app`,
    ).resolves.not.toThrow();

    // ASSERT
    // TODO: [Fix hydration mismatch errors #4139](https://github.com/SchwarzIT/onyx/issues/4139)
    expect(
      errorSpy.mock.calls.filter((c) => c.at(0) !== "Hydration completed but contains mismatches."),
    ).toMatchObject([]);
    expect(
      warningSpy.mock.calls.filter((c) => !c.at(0).startsWith("[Vue warn]: Hydration")),
    ).toMatchObject([]);
  });
});

const createSsrTest = (render: Component) =>
  (async () => {
    const appServer = createSSRApp(render);
    const result = await renderToString(appServer);

    document.write(`<div id="app">${result}</div>`);

    const appBrowser = createSSRApp(render);
    appBrowser.mount("#app");
  })();
