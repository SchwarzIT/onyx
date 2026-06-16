async function fetchRemoteFile(fileKey: string, accessToken: string) {
  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
      "X-Figma-Token": accessToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Error occurred while fetching: ${await response.text()}`);
  }
  const data = await response.json();
  return data;
}

const CONFIG = {
  remote: {
    /**
     * File key of the SIT icon library Figma file.
     */
    fileKey: "ZtlUPkO9ATUCV42Wkg7P0o",
    /**
     * Node ID of the icons page.
     */
    nodeId: "3270:179",
  },
  /**
   * Variables to apply to the new icons synched to the onyx library.
   */
  variables: {
    iconColor: "onyx/color/text+icons/neutral/medium",
    borderColor: "onyx/color/base/neutral/300",
    backgroundColor: "onyx/color/base/background/blank",
  },
  /**
   * Node ID of the page that the icons should be synched to in the onyx library.
   */
  nodeId: "6:854",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- needed for typing
const MESSAGE_HANDLERS: Record<string, (data?: any) => Promise<void>> = {
  "get-stored-data": getStoredData,
  "sync-icons": syncIcons,
};

runPlugin();

async function runPlugin() {
  figma.showUI(__html__, { width: 720, height: 384 });

  figma.ui.onmessage = async (msg) => {
    const handler = MESSAGE_HANDLERS[msg.type];
    if (!handler) return;

    try {
      await handler(msg.data);
    } catch (e) {
      // eslint-disable-next-line no-console -- error should be logged
      console.error(e);
      figma.notify((e as Error).message);
      figma.closePlugin();
    }
  };
}

async function getStoredData() {
  const accessToken = await figma.clientStorage.getAsync("accessToken");
  const data = { accessToken };
  figma.ui.postMessage({ type: "set-stored-data", data });
}

async function syncIcons(message: { accessToken: string }) {
  await figma.clientStorage.setAsync("accessToken", message.accessToken);
  const data = await fetchRemoteFile(CONFIG.remote.fileKey, message.accessToken);

  const remotePage = data.document.children.find(
    (node: SceneNode) => node.id === CONFIG.remote.nodeId,
  );
  const components = data.components;
  if (!remotePage || !components) throw new Error("Source icon page in remote file not found");

  const destinationPage = figma.root.children.find(
    (page) => page.type === "PAGE" && page.id === CONFIG.nodeId,
  );
  if (!destinationPage) throw new Error("Icon page in onyx library not found");

  await destinationPage.loadAsync();

  const variables = await figma.variables.getLocalVariablesAsync();
  const iconColor = variables.find((variable) => variable.name === CONFIG.variables.iconColor);
  const borderColor = variables.find((variable) => variable.name === CONFIG.variables.borderColor);
  const backgroundColor = variables.find(
    (variable) => variable.name === CONFIG.variables.backgroundColor,
  );

  if (!iconColor || !borderColor || !backgroundColor) {
    throw new Error("Unable to find onyx variables to apply to new icons");
  }

  const structure = remotePage.children;
  const remoteFrameNames = structure.map((frame: FrameNode) => frame.name);

  for (const child of [...(destinationPage.children as FrameNode[])]) {
    if (!remoteFrameNames.includes(child.name)) {
      child.remove();
      continue;
    }
    const remoteFrame = structure.find((frame: FrameNode) => frame.name === child.name);
    const remoteIconNames = remoteFrame?.children.map((icon: SceneNode) => icon.name) ?? [];

    for (const icon of [...child.children]) {
      if (!remoteIconNames.includes(icon.name)) {
        icon.remove();
      }
    }
  }

  let addedIcons = 0;

  for (const frame of structure) {
    const existingFramesMap = new Map(
      destinationPage.children
        .filter((node) => node.type === "FRAME")
        .map((frame) => [frame.name, frame as FrameNode]),
    );
    const existingFrame = existingFramesMap.get(frame.name);
    let newFrame = existingFrame;

    if (!existingFrame) {
      newFrame = figma.createFrame();
      newFrame.name = frame.name;
      const { x, y, width, height } = frame.absoluteBoundingBox;
      newFrame.x = x;
      newFrame.y = y;
      newFrame.resize(width, height);
      newFrame.cornerRadius = 32;

      newFrame.fills = [
        {
          type: "SOLID",
          color: { r: 0, g: 0, b: 0 },
          boundVariables: {
            color: {
              type: "VARIABLE_ALIAS",
              id: backgroundColor.id,
            },
          },
        },
      ];
      newFrame.strokes = [
        {
          type: "SOLID",
          color: { r: 0, g: 0, b: 0 },
          boundVariables: {
            color: {
              type: "VARIABLE_ALIAS",
              id: borderColor.id,
            },
          },
        },
      ];
      newFrame.strokeWeight = 1;
      destinationPage.appendChild(newFrame);
    }

    if (!newFrame) {
      throw new Error(`Something went wrong creating a frame for: ${frame.name}`);
    }
    const existingIconNames = new Set([...newFrame.children].map((child: SceneNode) => child.name));
    const missingIcons = frame.children.filter(
      (icon: SceneNode) => !existingIconNames.has(icon.name),
    );

    const iconPromises = missingIcons.map(async (icon: SceneNode) => {
      const iconKey = components[icon.id]?.key;
      if (!iconKey) return null;

      try {
        const component = await figma.importComponentByKeyAsync(iconKey);

        // create a fresh, local component
        // cloning does not work here since the component would be hidden from publishing which can not be changed
        // via the Figma plugin API so we only clone the SVG contents below
        const clone = figma.createComponent();

        // 2. Inherit base dimensions and properties
        clone.name = component.name;
        clone.resize(component.width, component.height);
        clone.fills = component.fills;
        clone.clipsContent = component.clipsContent;

        // 3. Deep-clone the inner vector shapes from the remote component
        for (const child of component.children) {
          clone.appendChild(child.clone());
        }

        if (icon.absoluteBoundingBox && frame.absoluteBoundingBox) {
          clone.x = icon.absoluteBoundingBox.x - frame.absoluteBoundingBox.x;
          clone.y = icon.absoluteBoundingBox.y - frame.absoluteBoundingBox.y;
        }

        for (const child of clone.children) {
          if (child.type === "VECTOR") {
            child.fills = [
              {
                type: "SOLID",
                color: { r: 1, g: 1, b: 1 },
                boundVariables: {
                  color: {
                    type: "VARIABLE_ALIAS",
                    id: iconColor.id,
                  },
                },
              },
            ];
          }
        }

        return clone;
      } catch (error) {
        figma.notify(
          `Error importing component: ${error instanceof Error ? error.message : error}`,
        );
      }
      return null;
    });

    const importedInstances = (await Promise.all(iconPromises)).filter((instance) => !!instance);
    importedInstances.forEach((instance) => newFrame.appendChild(instance));
    addedIcons += importedInstances.length;
  }

  figma.notify(`Synched ${addedIcons} new icons`);
  figma.closePlugin();
}
