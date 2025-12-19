import { ref } from "vue";

export const useAllSettled = (cb: () => void) => {
  const active = ref(false);
  const allPromises: Promise<unknown>[] = [];
  let latestPromise = Promise.resolve();

  const queue = (promise: Promise<unknown>) => {
    active.value = true;
    allPromises.push(promise);

    const newAllSettled = Promise.allSettled(allPromises).then(() => {
      if (newAllSettled === latestPromise) {
        active.value = false;
        allPromises.splice(0, allPromises.length);
        cb();
      }
    });
    latestPromise = newAllSettled;
  };

  return { queue, active };
};
