export function createPlaygroundUrl(codeSnippet: string): string {
  const files: Record<string, string> = {
    "src/App.vue": codeSnippet,
  };

  const bytes = new TextEncoder().encode(JSON.stringify(files));
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  const hash = btoa(binary);

  return `https://playground.onyx.schwarz#${hash}`;
}
