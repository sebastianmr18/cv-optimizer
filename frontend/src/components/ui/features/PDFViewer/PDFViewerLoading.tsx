"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function PDFViewerLoading() {
  return (
    <div className="flex flex-col gap-4 h-full py-3 w-full">
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                Cargando documento
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Preparando la vista previa del PDF...
              </p>
            </div>
          </div>

          {/* Skeleton del accordion */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
