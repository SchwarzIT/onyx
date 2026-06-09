import { beforeEach, describe, expect, test, vi } from "vitest";
import { ref } from "vue";
import { createTreeViewItem } from "./createTreeViewItem.js";

describe("createTreeViewItem", () => {
  let mockEmitSelect: () => void;

  beforeEach(() => {
    mockEmitSelect = vi.fn();
    document.body.innerHTML = "";
  });

  describe("ARIA Attributes (treeItem)", () => {
    test("should return correct default ARIA attributes", () => {
      // ARRANGE
      const isOpen = ref(false);
      const hasChildren = ref(false);
      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: false,
        currentDepth: 1,
        isOpen,
        hasChildren,
        emitSelect: mockEmitSelect,
      });

      // ASSERT
      expect(treeItem.value).toMatchObject({
        role: "treeitem",
        "aria-expanded": undefined,
        "aria-level": 1,
        "aria-disabled": undefined,
        tabindex: 0,
      });
    });

    test("should set aria-expanded when item has children", () => {
      // ARRANGE
      const isOpen = ref(false);
      const hasChildren = ref(true);
      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: false,
        currentDepth: 2,
        isOpen,
        hasChildren,
        emitSelect: mockEmitSelect,
      });

      // ASSERT
      expect(treeItem.value["aria-expanded"]).toBe(false);

      // ACT
      isOpen.value = true;

      // ASSERT
      expect(treeItem.value["aria-expanded"]).toBe(true);
    });

    test("should adjust attributes when disabled", () => {
      // ARRANGE
      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: true,
        currentDepth: 1,
        isOpen: ref(false),
        hasChildren: ref(false),
        emitSelect: mockEmitSelect,
      });

      // ASSERT
      expect(treeItem.value["aria-disabled"]).toBe("true");
      expect(treeItem.value.tabindex).toBe(-1);
    });
  });

  describe("toggleOpen Interaction", () => {
    test("should toggle open state and emit select on toggleOpen call", () => {
      // ARRANGE
      const isOpen = ref(false);
      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: false,
        currentDepth: 1,
        isOpen,
        hasChildren: ref(true),
        emitSelect: mockEmitSelect,
      });

      // ACT - Trigger via element's onClick handler
      treeItem.value.onClick();

      // ASSERT
      expect(isOpen.value).toBe(true);
      expect(mockEmitSelect).toHaveBeenCalledTimes(1);
    });

    test("should not toggle but still emit select if item has no children", () => {
      // ARRANGE
      const isOpen = ref(false);
      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: false,
        currentDepth: 1,
        isOpen,
        hasChildren: ref(false),
        emitSelect: mockEmitSelect,
      });

      // ACT - Trigger via element's onClick handler
      treeItem.value.onClick();

      // ASSERT
      expect(isOpen.value).toBe(false);
      expect(mockEmitSelect).toHaveBeenCalledTimes(1);
    });

    test("should do nothing if disabled", () => {
      // ARRANGE
      const isOpen = ref(false);
      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: true,
        currentDepth: 1,
        isOpen,
        hasChildren: ref(true),
        emitSelect: mockEmitSelect,
      });

      // ACT - Trigger via element's onClick handler
      treeItem.value.onClick();

      // ASSERT
      expect(isOpen.value).toBe(false);
      expect(mockEmitSelect).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation (handleKeyDown)", () => {
    const setupMockDomTree = () => {
      document.body.innerHTML = `
        <ul role="tree" id="tree">
          <li class="onyx-tree-view-item" id="item1-li">
            <div role="treeitem" id="item1" tabindex="0">Item 1</div>
            <ul role="group" id="group1">
              <li class="onyx-tree-view-item" id="item1-1-li">
                <div role="treeitem" id="item1-1" tabindex="-1">Item 1.1</div>
              </li>
            </ul>
          </li>
          <li class="onyx-tree-view-item" id="item2-li">
            <div role="treeitem" id="item2" tabindex="-1">Item 2</div>
          </li>
        </ul>
      `;

      Object.defineProperties(HTMLElement.prototype, {
        offsetWidth: { get: () => 100 },
        offsetHeight: { get: () => 20 },
      });
    };

    test("should toggle state on Enter and Space key", () => {
      // ARRANGE
      setupMockDomTree();
      const isOpen = ref(false);
      const trigger = document.getElementById("item1")!;

      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: false,
        currentDepth: 1,
        isOpen,
        hasChildren: ref(true),
        emitSelect: mockEmitSelect,
      });

      // ACT - Enter
      const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
      Object.defineProperty(enterEvent, "currentTarget", { value: trigger });
      treeItem.value.onKeydown(enterEvent);

      // ASSERT
      expect(isOpen.value).toBe(true);

      // ACT - Space
      const spaceEvent = new KeyboardEvent("keydown", { key: " " });
      Object.defineProperty(spaceEvent, "currentTarget", { value: trigger });
      treeItem.value.onKeydown(spaceEvent);

      // ASSERT
      expect(isOpen.value).toBe(false);
    });

    test("should move focus to next element on ArrowDown", () => {
      // ARRANGE
      setupMockDomTree();
      const trigger = document.getElementById("item1")!;
      const nextTrigger = document.getElementById("item1-1")!;

      const spyFocus = vi.spyOn(nextTrigger, "focus");

      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: false,
        currentDepth: 1,
        isOpen: ref(true),
        hasChildren: ref(true),
        emitSelect: mockEmitSelect,
      });

      // ACT
      const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
      Object.defineProperty(event, "currentTarget", { value: trigger });
      treeItem.value.onKeydown(event);

      // ASSERT
      expect(spyFocus).toHaveBeenCalled();
    });

    test("should move focus to previous element on ArrowUp", () => {
      // ARRANGE
      setupMockDomTree();
      const firstTrigger = document.getElementById("item1")!;
      const secondTrigger = document.getElementById("item1-1")!;

      const spyFocus = vi.spyOn(firstTrigger, "focus");

      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: false,
        currentDepth: 2,
        isOpen: ref(false),
        hasChildren: ref(false),
        emitSelect: mockEmitSelect,
      });

      // ACT
      const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
      Object.defineProperty(event, "currentTarget", { value: secondTrigger });
      treeItem.value.onKeydown(event);

      // ASSERT
      expect(spyFocus).toHaveBeenCalled();
    });

    test("should focus first element on Home and last on End", () => {
      // ARRANGE
      setupMockDomTree();
      const trigger = document.getElementById("item1-1")!;
      const firstTrigger = document.getElementById("item1")!;
      const lastTrigger = document.getElementById("item2")!;

      const spyFirstFocus = vi.spyOn(firstTrigger, "focus");
      const spyLastFocus = vi.spyOn(lastTrigger, "focus");

      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: false,
        currentDepth: 2,
        isOpen: ref(false),
        hasChildren: ref(false),
        emitSelect: mockEmitSelect,
      });

      // ACT - Home
      const homeEvent = new KeyboardEvent("keydown", { key: "Home" });
      Object.defineProperty(homeEvent, "currentTarget", { value: trigger });
      treeItem.value.onKeydown(homeEvent);
      expect(spyFirstFocus).toHaveBeenCalled();

      // ACT - End
      const endEvent = new KeyboardEvent("keydown", { key: "End" });
      Object.defineProperty(endEvent, "currentTarget", { value: trigger });
      treeItem.value.onKeydown(endEvent);
      expect(spyLastFocus).toHaveBeenCalled();
    });

    test("should open collapsed item or focus child on ArrowRight", () => {
      // ARRANGE
      setupMockDomTree();
      const trigger = document.getElementById("item1")!;
      const childTrigger = document.getElementById("item1-1")!;
      const isOpen = ref(false);

      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: false,
        currentDepth: 1,
        isOpen,
        hasChildren: ref(true),
        emitSelect: mockEmitSelect,
      });

      // ACT - First ArrowRight (Opens item)
      const event1 = new KeyboardEvent("keydown", { key: "ArrowRight" });
      Object.defineProperty(event1, "currentTarget", { value: trigger });
      treeItem.value.onKeydown(event1);

      // ASSERT
      expect(isOpen.value).toBe(true);

      // ACT - Second ArrowRight (Focuses child since it is now open)
      const spyChildFocus = vi.spyOn(childTrigger, "focus");
      const event2 = new KeyboardEvent("keydown", { key: "ArrowRight" });
      Object.defineProperty(event2, "currentTarget", { value: trigger });
      treeItem.value.onKeydown(event2);

      // ASSERT
      expect(spyChildFocus).toHaveBeenCalled();
    });

    test("should close open item or focus parent item on ArrowLeft", () => {
      // ARRANGE
      setupMockDomTree();
      const parentTrigger = document.getElementById("item1")!;
      const childTrigger = document.getElementById("item1-1")!;
      const isOpen = ref(true);

      const {
        elements: { treeItem },
      } = createTreeViewItem({
        disabled: false,
        currentDepth: 2,
        isOpen,
        hasChildren: ref(true),
        emitSelect: mockEmitSelect,
      });

      // ACT - First ArrowLeft on open parent item (Closes it)
      const event1 = new KeyboardEvent("keydown", { key: "ArrowLeft" });
      Object.defineProperty(event1, "currentTarget", { value: parentTrigger });
      treeItem.value.onKeydown(event1);

      // ASSERT
      expect(isOpen.value).toBe(false);

      // ACT - ArrowLeft on child item (Focuses parent)
      const spyParentFocus = vi.spyOn(parentTrigger, "focus");
      const event2 = new KeyboardEvent("keydown", { key: "ArrowLeft" });
      Object.defineProperty(event2, "currentTarget", { value: childTrigger });
      treeItem.value.onKeydown(event2);

      // ASSERT
      expect(spyParentFocus).toHaveBeenCalled();
    });
  });
});
