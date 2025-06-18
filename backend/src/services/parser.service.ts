import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function parseFile(
  filePath: string,
  mimetype: string,
): Promise<string> {
  const buffer = fs.readFileSync(filePath);
  if (mimetype === "application/pdf") {
    const data = await pdfParse(buffer);
    return data.text;
  } else if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else {
    throw new Error("Formato no soportado");
  }
}
