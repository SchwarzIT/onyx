// eslint-disable-next-line @typescript-eslint/no-explicit-any -- needed for typing
const MESSAGE_HANDLERS: Record<string, (data?: any) => Promise<void>> = {
  "generate-data-grid": generateDataGrid,
};

runPlugin();

async function runPlugin() {
  figma.showUI(__html__, { width: 720, height: 560 });

  figma.ui.onmessage = async (msg) => {
    const handler = MESSAGE_HANDLERS[msg.type];
    if (!handler) return;

    try {
      await handler(msg.data);
    } catch (e) {
      // eslint-disable-next-line no-console -- error should be logged
      console.error(e);
      showToast(e as Error);
      figma.closePlugin();
    }
  };
}

async function generateDataGrid(_message: unknown) {
  throw new Error("Not implemented yet");
}

/**
 * Shows a Figma notification / toast.
 */
function showToast(message: string | Error) {
  const msg = typeof message === "string" ? message : message.message;

  figma.notify(msg, {
    timeout: 6_000,
    error: message instanceof Error,
  });
}
