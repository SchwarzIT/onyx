import { ref } from "vue";

/**
 * Execute a callback, when the latest promise is settled (either resolved or rejected).
 * This ensures that out-of-order settling promises are ignored and only the latest promise is considered.
 *
 * @param cb callback to execute when the last promise, that was added to the queue, is settled.
 * @returns the active state of the last settled promise and a queue function to add new promises to the queue.
 */
export const useLastSettled = <T>(cb: (success: boolean, resolved?: T) => void) => {
  const active = ref(false);
  let lastId = -1;

  const queue = (promise: Promise<T>) => {
    const promiseId = ++lastId;
    active.value = true;

    const onFinally = (success: boolean) => (resolved?: T) => {
      if (promiseId === lastId) {
        active.value = false;
        if (success) {
          cb(success, resolved);
        } else {
          cb(success);
        }
      }
    };

    promise.then(onFinally(true)).catch(onFinally(false));
  };

  const cancel = () => {
    active.value = false;
    lastId++;
  };

  return { active, queue, cancel };
};
