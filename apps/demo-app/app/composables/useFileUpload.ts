export type UploadStatus = "ready" | "paused" | "canceled" | "processing" | "done";

export type UseFileUploadOptions = {
  /**
   * Time in milliseconds that the dummy file upload should take.
   *
   * @default 4000
   */
  duration?: number;
};

/**
 * Re-usable composable for managing the mocked/faked file upload state.
 */
export const useFileUpload = (options?: UseFileUploadOptions) => {
  const progress = ref(0);
  const status = ref<UploadStatus>("ready");

  let intervalId: ReturnType<typeof setInterval> | undefined;

  const removeInterval = () => {
    clearInterval(intervalId);
    intervalId = undefined;
  };

  onUnmounted(removeInterval);

  const start = () => {
    if (intervalId != undefined) return;
    status.value = "processing";

    const intervalDelay = (options?.duration || 4000) / 100;

    // usually the upload progress would be given e.g. by the server ar the upload request
    // for this demo purpose, we will just use a interval
    intervalId = setInterval(() => {
      progress.value++;

      if (progress.value >= 100) {
        removeInterval();
        status.value = "done";
        progress.value = 0;
      }
    }, intervalDelay);
  };

  const pause = () => {
    removeInterval();
    status.value = "paused";
  };

  const cancel = () => {
    removeInterval();
    status.value = "canceled";
    progress.value = 0;
  };

  return { progress, status, start, pause, cancel };
};
