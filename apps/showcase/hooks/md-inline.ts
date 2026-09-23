export const mdInlineHook = async (ctx: FileBeforeParseHook) => {
  if (ctx.file.extension !== ".md") {
    return;
  }

  /**
   * 1. Each line starting with "<<< "
   * 2. Put everything until the next linebreak into a group.
   * 3. g=global, m=each line, d=enable indices
   *
   * . . . . . . . . . . | 1. | 2. | 3. |
   */
  const inlineMatcher = /^<<< (.+?)$/dgm;

  const { body, dirname = "." } = ctx.file;
  const regExpMatches = body.matchAll(inlineMatcher);
  // We must handle the matches in reverse order, so that replacing content between indices does not invalidate other indices.
  const matches = Array.from(regExpMatches).reverse();

  let newBody = body;
  for (const match of matches) {
    const [path, ...parameters] = match[1]?.trim().split(" ") || [];
    if (!path) {
      continue;
    }
    const [indices] = match.indices || [];
    const [start, end] = indices || [];

    const { resolve } = createResolver(dirname);
    const componentPath = resolve(path);
    const sourceCode = readFileSync(componentPath, "utf-8");
    if (parameters.includes("preview=true")) {
      const exampleComponentName = `Example${hash("sha-1", componentPath)}`;
      addComponent({ name: exampleComponentName, filePath: componentPath, global: true });
      parameters.push(`previewComponent=${exampleComponentName}`);
    }
    const before = newBody.slice(undefined, start);
    const after = newBody.slice(end);
    const fileType = path.split(".").at(-1);
    const fileName = path.split("/").at(-1);
    newBody = `${before}
\`\`\`${fileType} [${fileName}] ${parameters.join(" ")}
${sourceCode}
\`\`\`
${after}`;
  }
  ctx.file.body = newBody;
};
