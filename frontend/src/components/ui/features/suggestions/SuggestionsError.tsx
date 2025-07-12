"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import Link from "next/link"; // Assuming you are using Next.js Link

export default function SuggestionsError() {
  return (
    <div className="mt-6 space-y-6">
      <Card className="bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <AlertTriangle className="h-5 w-5" />
            <span>Error al generar sugerencias</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-red-600 dark:text-red-400">
            Lo sentimos, no pudimos generar las sugerencias para tu CV en este
            momento. Esto podría deberse a un problema técnico.
          </p>
          <p className="text-sm text-red-500 dark:text-red-500">
            Por favor, intenta nuevamente en unos minutos. Si el problema
            persiste, contacta al soporte técnico.
          </p>
          <div className="flex justify-center pt-4">
            <Link href="/" passHref>
              <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800">
                <Home className="h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
