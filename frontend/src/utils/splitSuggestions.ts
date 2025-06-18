export function splitSuggestions(markdownText: string): string[] {
  const lines = markdownText.split("\n");

  const blocks: string[] = [];
  let currentBlock = "";

  for (const line of lines) {
    const trimmed = line.trim();

    // Detecta inicio de una nueva sugerencia (puedes ajustar según el estilo de tus sugerencias)
    if (
      trimmed.startsWith("**") ||
      trimmed.startsWith("-") ||
      trimmed.match(/^\d+\./) ||
      trimmed.startsWith("####") ||
      trimmed.startsWith("###") ||
      trimmed.startsWith("##") ||
      trimmed.startsWith("#")
    ) {
      if (currentBlock) {
        blocks.push(currentBlock.trim());
        console.log(currentBlock.trim());
      }
      currentBlock = trimmed;
    } else {
      currentBlock += " " + trimmed;
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock.trim());
  }

  return blocks.filter(Boolean);
}
