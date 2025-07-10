"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { FileWarning, AlertCircle } from "lucide-react";

export default function PDFViewerFileError({
  fileError,
}: {
  fileError: string | null;
}) {
  return (
    <div className="flex flex-col gap-4 h-full py-3">
      <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
              <FileWarning className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">
                Error con el archivo
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                No se pudo procesar el archivo seleccionado
              </p>
            </div>
          </div>
          <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {fileError}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
