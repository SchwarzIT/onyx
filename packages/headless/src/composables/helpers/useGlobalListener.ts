import { onBeforeMount, onBeforeUnmount, reactive, watchEffect, type Ref } from "vue";

type DocumentEventType = keyof DocumentEventMap;
type GlobalListener<K extends DocumentEventType = DocumentEventType> = (
  event: DocumentEventMap[K],
) => unknown;

export type UseGlobalEventListenerOptions<K extends DocumentEventType> = {
  type: K;
  listener: GlobalListener<K>;
  disabled?: Ref<boolean>;
};

const GLOBAL_LISTENERS = reactive(new Map<DocumentEventType, Set<GlobalListener>>());

const updateRemainingListeners = (type: DocumentEventType, remaining?: Set<GlobalListener>) => {
  if (remaining?.size) {
    GLOBAL_LISTENERS.set(type, remaining);
    return;
  }
  GLOBAL_LISTENERS.delete(type);
  document.removeEventListener(type, GLOBAL_HANDLER);
};

const removeGlobalListener = <K extends DocumentEventType>(
  type: K,
  listener: GlobalListener<K>,
) => {
  const globalListener = GLOBAL_LISTENERS.get(type);
  globalListener?.delete(listener as GlobalListener);

  updateRemainingListeners(type, globalListener);
};

const addGlobalListener = <K extends DocumentEventType>(type: K, listener: GlobalListener<K>) => {
  const globalListener = GLOBAL_LISTENERS.get(type) ?? new Set();
  globalListener.add(listener as GlobalListener);
  GLOBAL_LISTENERS.set(type, globalListener);

  document.addEventListener(type, GLOBAL_HANDLER);
};

/**
 * A single and unique function for all event types.
 * We use the fact that `addEventListener` and `removeEventListener` are idempotent when called with the same function reference.
 */
const GLOBAL_HANDLER = (event: Event) => {
  const type = event.type as DocumentEventType;
  GLOBAL_LISTENERS.get(type)?.forEach((cb) => cb(event));
};

export const useGlobalEventListener = <K extends DocumentEventType>({
  type,
  listener,
  disabled,
}: UseGlobalEventListenerOptions<K>) => {
  onBeforeMount(() =>
    watchEffect(() =>
      disabled?.value ? removeGlobalListener(type, listener) : addGlobalListener(type, listener),
    ),
  );

  onBeforeUnmount(() => removeGlobalListener(type, listener));
};
