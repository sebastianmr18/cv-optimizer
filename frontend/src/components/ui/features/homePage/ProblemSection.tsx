"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, TrendingUp } from "lucide-react";

export default function ProblemSection() {
  return (
    <section id="problema" className="py-20 px-4 md:px-6 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          El problema que resolvemos
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Encontrar trabajo en el mercado actual es más competitivo que nunca
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-red-800">CV Genérico</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">
                Los candidatos envían el mismo CV para todas las ofertas, sin
                adaptarlo a los requisitos específicos.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-orange-800">
                Alta Competencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700">
                Cientos de candidatos aplican para la misma posición,
                dificultando destacar entre la multitud.
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle className="text-yellow-800">
                Baja Tasa de Respuesta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700">
                Solo el 2-3% de las aplicaciones reciben respuesta, generando
                frustración y pérdida de oportunidades.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
