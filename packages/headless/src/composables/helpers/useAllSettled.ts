import { ref } from "vue";

/**
 * Execute a callback, when all added promise are settled (either resolved or rejected).
 * It allows for more promises to be added while waiting.
 *
 * @param cb callback to execute when all added promise are settled.
 * @returns an object with an add function and the active state which is true as long as any promise is running.
 */
export const useAllSettled = (cb?: () => void) => {
  const active = ref(false);
  const allPromises: Promise<unknown>[] = [];
  let latestPromise = Promise.resolve();

  const add = (promise: Promise<unknown>) => {
    active.value = true;
    allPromises.push(promise);

    const newAllSettled = Promise.allSettled(allPromises).then(() => {
      if (newAllSettled === latestPromise) {
        active.value = false;
        allPromises.splice(0, allPromises.length);
        cb?.();
      }
    });
    latestPromise = newAllSettled;
  };

  return { add, active };
};
