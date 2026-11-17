import type { Store } from "@vue/repl";
import * as sass from "sass";
import { watch } from "vue";

/**
 * Adds support for SASS / SCSS preprocessor to the given store.
 */
export const useSass = (store: Store) => {
  const wrappedCompilers = new WeakSet<object>();

  watch(
    () => store.compiler,
    (compiler) => {
      if (!compiler || wrappedCompilers.has(compiler)) return;

      const originalParse = compiler.parse.bind(compiler);

      const patchedCompiler = {
        ...compiler,
        parse(source: string, options?: Parameters<typeof compiler.parse>[1]) {
          const result = originalParse(source, options);

          for (const style of result.descriptor.styles) {
            // Compile both explicit lang="scss"/"sass" and plain <style> blocks
            // (valid CSS is valid SCSS, so BEM `&__` nesting works without `lang="scss"`)
            if (style.lang && ["scss", "sass"].includes(style.lang)) {
              try {
                const compiled = sass.compileString(style.content, {
                  syntax: style.lang === "sass" ? "indented" : "scss",
                });
                style.content = compiled.css;
                // Clear `lang` so @vue/repl doesn't reject it as an unsupported preprocessor
                style.lang = undefined;
              } catch (err) {
                result.errors.push(err instanceof Error ? err : new SyntaxError(String(err)));
              }
            }
          }

          return result;
        },
      };

      wrappedCompilers.add(patchedCompiler);
      store.compiler = patchedCompiler;
    },
    { immediate: true },
  );
};
