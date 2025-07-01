"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileWarning } from "lucide-react";

export default function PDFViewerNotPDF({ fileUrl }: { fileUrl: string }) {
  return (
    <div className="flex flex-col gap-4 h-full py-3">
      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <FileWarning className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">
                Vista previa no disponible
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Este tipo de archivo no se puede previsualizar
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              La vista previa solo está disponible para archivos PDF.
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Archivo:{" "}
              <span className="font-medium">{fileUrl.split("/").pop()}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
