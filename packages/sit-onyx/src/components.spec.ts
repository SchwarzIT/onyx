import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import type { ComponentProps } from "vue-component-type-helpers";
import * as ALL_EXPORTS from "./index.js";

type Components = {
  [TKey in Extract<keyof typeof ALL_EXPORTS, `Onyx${string}`>]: {
    props?: ComponentProps<(typeof ALL_EXPORTS)[TKey]>;
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
  OnyxProgressStep: {
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
      icon: placeholder,
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
      icon: placeholder,
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
};

describe("components", () => {
  test.each(
    Object.entries(COMPONENTS).map(([name, options]) => ({
      name: name as keyof typeof COMPONENTS,
      options,
    })),
  )("should mount $name without errors and console logs", ({ name, options }) => {
    // ARRANGE
    const errorSpy = vi.spyOn(console, "error");
    const warningSpy = vi.spyOn(console, "warn");

    // ACT
    expect(
      () =>
        mount(ALL_EXPORTS[name], {
          ...options,
          props: {
            // label is a common prop for many components, so we add it here by defaults
            label: name,
            ...options.props,
          },
        }),
      `should not throw error when mounting ${name}`,
    ).not.toThrowError();

    // ASSERT
    expect(errorSpy).not.toHaveBeenCalled();
    expect(warningSpy).not.toHaveBeenCalled();
  });
});
