import { onMounted, onUnmounted } from "vue";

export type UsePluginMessageOptions<T> = {
  type: string;
  onMessage: (data: T) => void;
};

export type PostPluginMessageOptions = {
  type: string;
  data?: unknown;
};

/**
 * Composable for listening to a specific plugin message
 */
export const usePluginMessage = <T>(options: UsePluginMessageOptions<T>) => {
  const listener = (event: MessageEvent) => {
    const message = event.data.pluginMessage;
    if (!message || message.type !== options.type) return;
    options.onMessage(message.data);
  };

  onMounted(() => window.addEventListener("message", listener));
  onUnmounted(() => window.removeEventListener("message", listener));
};

/**
 * Sends a message to the Figma plugin.
 */
export function postPluginMessage(options: PostPluginMessageOptions) {
  parent.postMessage({ pluginMessage: { type: options.type, data: options.data } }, "*");
}
