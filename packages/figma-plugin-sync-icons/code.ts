/* eslint-disable @typescript-eslint/no-explicit-any -- for simplicity we use any here */
async function fetchRemoteFile(fileKey: string, token: string) {
  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
      "X-Figma-Token": token,
    },
  });
  if (!response.ok) {
    throw new Error(`Error occurred while fetching: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function runPlugin() {
  const fileKey = process.env.FIGMA_ICON_PLUGIN_ACCESS_TOKEN;
  const token = process.env.FIGMA_ICON_PLUGIN_TOKEN;
  const destinationPageName = "Icons";
  const iconColorVariable = "onyx/color/text+icons/neutral/medium";
  const borderColorVariable = "onyx/color/base/neutral/300";
  const backgroundColorVariable = "onyx/color/base/background/blank";

  const data = await fetchRemoteFile(fileKey, token);
  const components = data.components;
  const structure = data.document.children.find((canvas: any) => {
    return canvas.name === "Icons";
  }).children;

  const destinationPage = figma.root.children.find(
    (page) => page.type === "PAGE" && page.name === destinationPageName,
  ) as PageNode | undefined;

  if (!components || !destinationPage) {
    figma.notify("Eine der Seiten wurde nicht gefunden.");
    figma.closePlugin();
    return;
  }
  await destinationPage.loadAsync();

  const variables = await figma.variables.getLocalVariablesAsync();
  const iconColor = variables.find((variable) => variable.name === iconColorVariable);
  const borderColor = variables.find((variable) => variable.name === borderColorVariable);
  const backgroundColor = variables.find(
    (variable: any) => variable.name === backgroundColorVariable,
  );

  const remoteFrameNames = structure.map((frame: any) => frame.name);

  for (const child of [...(destinationPage.children as any)]) {
    if (!remoteFrameNames.includes(child.name)) {
      child.remove();
      continue;
    }
    const remoteFrame = structure.find((frame: any) => frame.name === child.name);
    const remoteIconNames = remoteFrame?.children.map((icon: any) => icon.name) ?? [];

    for (const icon of [...child.children]) {
      if (!remoteIconNames.includes(icon.name)) {
        icon.remove();
      }
    }
  }
  for (const frame of structure) {
    const existingFrame = destinationPage.findOne(
      (node) => node.type === "FRAME" && node.name === frame.name,
    ) as FrameNode;

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

    const existingIconNames = new Set([...newFrame.children].map((child) => child.name));
    const missingIcons = frame.children.filter((icon: any) => !existingIconNames.has(icon.name));

    const iconPromises = missingIcons.map(async (icon: any) => {
      const iconKey = components[icon.id].key;
      if (!iconKey) {
        return null;
      }

      try {
        const component = await figma.importComponentByKeyAsync(iconKey);
        if (component) {
          const instance = component.createInstance();
          instance.x = icon.absoluteBoundingBox.x - frame.absoluteBoundingBox.x;
          instance.y = icon.absoluteBoundingBox.y - frame.absoluteBoundingBox.y;

          if (iconColor) {
            for (const child of instance.children) {
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
          return instance;
        }
      } catch (error: any) {
        figma.notify(`Error importing component: ${error.message}`);
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

/* eslint-enable */
runPlugin();
