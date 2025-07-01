import axios from "axios";
import type { CVOptimizationResult } from "@/types/CVOptimization";

export function validatePDFFile(file: File): boolean {
  const isValidMime = file.type === "application/pdf";
  const isValidExt = file.name.toLowerCase().endsWith(".pdf");
  if (file.size > 10000000) {
    return false;
  }
  return isValidMime && isValidExt;
}

export function getUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const sanitized = originalName.replace(/\s+/g, "_");
  return `${timestamp}_${sanitized}`;
}

export async function uploadToS3(file: File, fileName: string): Promise<string> {
  const res = await axios.post("/api/upload-aws", {
    fileName,
    contentType: file.type,
  });

  const { url, fields } = res.data;

  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  formData.append("file", file);

  const uploadRes = await fetch(url, {
    method: "POST",
    body: formData,
    headers: { "Content-Disposition": "inline" },
  });

  if (!uploadRes.ok) {
    throw new Error("Falló la carga del archivo");
  }

  return `${url.split("?")[0]}${fields.key.startsWith("/") ? fields.key.slice(1) : fields.key}`;
}

export async function generateSuggestions(
  file: File,
  jobDescription: string
): Promise<CVOptimizationResult> {
  const formData = new FormData();
  formData.append("cv", file);
  formData.append("jobDescription", jobDescription);

  const response = await axios.post("/api/adapt-cv", formData);
  return response.data.suggestions;
}
