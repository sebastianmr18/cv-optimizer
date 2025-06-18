"use client";

import { FileText, FileWarning } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PDFViewerProps {
  fileUrl: string | null;
  fileError?: string | null;
}

export default function PDFViewer({ fileUrl, fileError }: PDFViewerProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (!fileUrl || !fileUrl.toLowerCase().endsWith(".pdf")) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/generate-presigned-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileUrl,
            disposition: "inline",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate presigned URL");
        }

        const { signedUrl } = await response.json();
        setSignedUrl(signedUrl);
      } catch (error) {
        console.log("Error al generar el enlace del PDF:", error);
        setError("Hubo un error al generar el enlace del PDF.");
        setSignedUrl(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSignedUrl();
  }, [fileUrl]);

  if (fileError) {
    return (
      <div className="flex flex-col gap-4 h-full py-3">
        <div className="flex items-center justify-between bg-red-800 px-6 py-3 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <FileWarning className="w-5 h-5" />
            Error con el archivo
          </h2>
        </div>
        <div className="flex items-center justify-center h-full text-red-600">
          {fileError}
        </div>
      </div>
    );
  }

  // 📁 No se ha cargado ningún archivo
  if (!fileUrl) {
    return (
      <div className="flex flex-col gap-4 h-full py-3">
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <FileText className="w-12 h-12 mb-2" />
          <p className="text-sm">No se ha cargado ningún archivo.</p>
        </div>
      </div>
    );
  }

  // ❌ No es PDF
  if (!fileUrl.endsWith(".pdf") && !fileUrl.endsWith(".docx")) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-yellow-600">
        <FileWarning className="w-12 h-12 mb-2" />
        <p className="text-sm text-center">
          La vista previa solo está disponible para archivos PDF o DOCX.
        </p>
        <p className="text-sm mt-1">
          Archivo subido: <strong>{fileUrl.split("/").pop()}</strong>
        </p>
      </div>
    );
  }

  // ⏳ Cargando PDF
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Cargando vista previa del PDF...
      </div>
    );
  }

  // ⚠️ Error
  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-600 text-sm">
        {error}
      </div>
    );
  }

  // ✅ Mostrar PDF
  return (
    <div className="flex flex-col gap-4 h-full py-3">
      <div className="flex items-center justify-between bg-green-800 px-6 py-3 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Vista Previa del Documento
        </h2>
      </div>

      <div className="relative flex-1 border border-gray-200 dark:border-gray-700 rounded-b-xl shadow-lg overflow-hidden">
        {signedUrl ? (
          <iframe
            src={signedUrl}
            className="w-full h-full"
            title="Vista previa del PDF"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400">
              Cargando documento...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
