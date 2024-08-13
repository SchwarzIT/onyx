export function detectOpenDirection(
  // parentElement: HTMLElement,
  inputRef: HTMLElement | undefined,
  flyoutRef: HTMLElement | undefined,
) {
  const viewportHeight = window.visualViewport?.height ?? 0;
  const parentElementTop = getParentElementTop(inputRef);
  const selectTop = inputRef?.getBoundingClientRect().top ?? 0;
  const selectBottom = inputRef?.getBoundingClientRect().bottom ?? 0;
  const selectFlyoutHeight = flyoutRef?.scrollHeight ?? 0;

  let freeSpaceBelow = viewportHeight - selectBottom - selectFlyoutHeight;
  let freeSpaceAbove = parentElementTop
    ? parentElementTop - selectTop
    : selectTop - selectFlyoutHeight;

  if (freeSpaceAbove < 0 && freeSpaceBelow < 0) {
    freeSpaceAbove = Math.abs(freeSpaceAbove);
    freeSpaceBelow = Math.abs(freeSpaceBelow);
  }

  return freeSpaceAbove > freeSpaceBelow ? "top" : "bottom";
}

const getParentElementTop = (inputRef: HTMLElement | undefined): number | undefined => {
  if (inputRef == undefined) return undefined;
  let el = inputRef;

  while (el.parentElement != undefined) {
    if (
      getComputedStyle(el.parentElement).overflow === "hidden" ||
      el.parentElement === undefined
    ) {
      return el.parentElement.getBoundingClientRect().top;
    } else {
      el = el.parentElement;
    }
  }
};
