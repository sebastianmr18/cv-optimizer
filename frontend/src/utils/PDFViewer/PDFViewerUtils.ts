export async function generatePresignedUrl(fileUrl: string): Promise<string> {
  const response = await fetch("/api/generate-presigned-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileUrl, disposition: "inline" }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate presigned URL");
  }

  const data = await response.json();
  return data.signedUrl;
}

export function isValidPDF(fileUrl: string): boolean {
  return fileUrl.toLowerCase().endsWith(".pdf");
}
