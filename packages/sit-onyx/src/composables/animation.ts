/**
 * Tracks for which animations a sync was requested, but not yet executed.
 * Used to "throttle" and avoid triggering the animation sync when it was already requested.
 */
const isAlreadyTriggered = new Set<string>();

/**
 * The maximum time we want to wait for a sync.
 * We choose 200ms, because slower would be noticeable.
 */
const IDLE_TIMEOUT = 200;

/**
 * `requestIdleCallback` is not available in Safari, so we use `setTimeout` with a timeout of 0 as a primitive polyfill.
 */
const onIdleCallback =
  globalThis.window && "requestIdleCallback" in globalThis.window
    ? globalThis.window.requestIdleCallback // eslint-disable-line compat/compat
    : (cb: () => void, _: IdleRequestOptions) => setTimeout(cb, 0);

const syncAnimations = (animationName: string) => {
  isAlreadyTriggered.delete(animationName);

  // get all animations and sync them
  document
    .getAnimations()
    .filter((a): a is CSSAnimation => "animationName" in a && a.animationName === animationName)
    .forEach((animation) => (animation.startTime = 0));
};

/**
 * This composables allows to synchronizes CSS animations with the same name across the entire document.
 * The sync will not be executed immediately and is deemed "low-priority".
 */
export const useAnimationSync = (animationName: string) => {
  const requestAnimationSync = () => {
    if (isAlreadyTriggered.has(animationName)) {
      return;
    }

    isAlreadyTriggered.add(animationName);
    onIdleCallback(() => syncAnimations(animationName), { timeout: IDLE_TIMEOUT });
  };

  return { requestAnimationSync };
};
