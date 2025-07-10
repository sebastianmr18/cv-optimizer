"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText } from "lucide-react";

export default function PDFViewerShowPDF({
  signedUrl,
}: {
  signedUrl: string | null;
}) {
  return (
    <div className="flex flex-col gap-4 h-full py-3 w-full">
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="px-6 py-4 text-lg font-semibold bg-green-800 text-white rounded-t-xl hover:bg-green-700 transition-colors">
            <FileText className="w-5 h-5 mr-2" />
            Vista Previa del Documento
          </AccordionTrigger>

          <AccordionContent className="bg-white dark:bg-gray-900 p-4 rounded-b-xl">
            <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden min-h-[400px]">
              {signedUrl ? (
                <iframe
                  id="pdf-viewer"
                  src={signedUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                  <p className="text-gray-500 dark:text-gray-400">
                    Cargando documento...
                  </p>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
