"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function PDFViewerNotFileUrl() {
  return (
    <div className="flex flex-col gap-4 h-full py-3">
      <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                No hay archivo seleccionado
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                Selecciona un archivo PDF para ver su vista previa aquí
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
