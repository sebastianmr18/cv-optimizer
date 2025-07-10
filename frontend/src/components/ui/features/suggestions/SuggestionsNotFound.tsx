"use client";

import { Lightbulb } from "lucide-react";

export default function SuggestionsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
      <Lightbulb className="w-8 h-8 text-muted-foreground" />
      <h3 className="text-lg font-semibold text-muted-foreground">
        Genera tu analisis
      </h3>
      <p className="text-sm text-muted-foreground max-w-md">
        Carga tu CV y pega una descripción de oferta laboral para recibir
        sugerencias personalizadas.
      </p>
    </div>
  );
}
