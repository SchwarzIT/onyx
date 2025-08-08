async function fetchRemoteFile(fileKey: string, accessToken: string) {
  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
      "X-Figma-Token": accessToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Error occurred while fetching: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function runPlugin() {
  figma.showUI(__html__, { width: 400, height: 300 });

  figma.ui.onmessage = async (msg) => {
    if (msg.type === "get-stored-data") {
      const accessToken = await figma.clientStorage.getAsync("accessToken");
      const fileKey = await figma.clientStorage.getAsync("fileKey");

      figma.ui.postMessage({ type: "set-prefilled-data", accessToken, fileKey });
    }

    if (msg.type === "save-and-run") {
      const { accessToken, fileKey } = msg;

      if (accessToken && fileKey) {
        await figma.clientStorage.setAsync("accessToken", accessToken);
        await figma.clientStorage.setAsync("fileKey", fileKey);

        figma.notify("Settings saved!");

        const destinationPageName = "Icons";
        const iconColorVariable = "onyx/color/text+icons/neutral/medium";
        const borderColorVariable = "onyx/color/base/neutral/300";
        const backgroundColorVariable = "onyx/color/base/background/blank";

        const data = await fetchRemoteFile(fileKey, accessToken);
        const components = data.components;
        const canvas = data.document.children.find((canvas: SceneNode) => canvas.name === "Icons");

        if (!canvas) {
          figma.notify(`No page named "Icons" found in remote file`);
          figma.closePlugin();
          return;
        }
        const structure = canvas.children;

        const destinationPage = figma.root.children.find(
          (page) => page.type === "PAGE" && page.name === destinationPageName,
        );

        if (!components || !destinationPage) {
          figma.notify("One of the Pages could not be found");
          figma.closePlugin();
          return;
        }
        await destinationPage.loadAsync();

        const variables = await figma.variables.getLocalVariablesAsync();
        const iconColor = variables.find((variable) => variable.name === iconColorVariable);
        const borderColor = variables.find((variable) => variable.name === borderColorVariable);
        const backgroundColor = variables.find(
          (variable) => variable.name === backgroundColorVariable,
        );

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

            if (backgroundColor) {
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
            }
            if (borderColor) {
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
            }

            destinationPage.appendChild(newFrame);
          }
          if (!newFrame) {
            figma.notify("SomeThing went wrong creating a Frame for: " + frame.name);
            figma.closePlugin();
            return;
          }
          const existingIconNames = new Set(
            [...newFrame.children].map((child: SceneNode) => child.name),
          );
          const missingIcons = frame.children.filter(
            (icon: SceneNode) => !existingIconNames.has(icon.name),
          );

          const iconPromises = missingIcons.map(async (icon: SceneNode) => {
            const componentMeta = components[icon.id];
            if (!componentMeta) return null;
            const iconKey = componentMeta.key;
            if (!iconKey) {
              return null;
            }

            try {
              const component = await figma.importComponentByKeyAsync(iconKey);
              if (component) {
                const clone = component.clone();
                if (icon.absoluteBoundingBox && frame.absoluteBoundingBox) {
                  clone.x = icon.absoluteBoundingBox.x - frame.absoluteBoundingBox.x;
                  clone.y = icon.absoluteBoundingBox.y - frame.absoluteBoundingBox.y;
                }

                if (iconColor) {
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
                }
                return clone;
              }
            } catch (error) {
              figma.notify(
                `Error importing component: ${error instanceof Error ? error.message : error}`,
              );
            }
            return null;
          });

          const importedInstances = await Promise.all(iconPromises);

          importedInstances.forEach((instance) => {
            if (instance) {
              newFrame.appendChild(instance);
            }
          });
        }

        figma.closePlugin();
      }
    } else {
      figma.notify("Please fill out the inputs.");
    }
  };
}

runPlugin();
