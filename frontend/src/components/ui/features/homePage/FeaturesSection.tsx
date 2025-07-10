"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Lightbulb, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Funcionalidades Principales
          </h2>
          <p className="text-xl text-gray-600">
            Herramientas potentes para optimizar tu búsqueda de empleo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <Card className="p-8 border-green-200 bg-white shadow-lg h-full flex flex-col justify-between">
            <div>
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900">
                      Análisis Inteligente de CV
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-800 mt-2">
                      Disponible Ahora
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-lg">
                  Nuestra IA analiza tu CV y la descripción del puesto para
                  identificar brechas y oportunidades de mejora específicas.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">
                      Análisis de palabras clave
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">
                      Identificación de habilidades faltantes
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">
                      Sugerencias de mejora personalizadas
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">
                      Puntuación de compatibilidad
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/analyzer">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Probar ahora
                </Button>
              </Link>
            </div>
          </Card>

          <div className="space-y-6 h-full flex flex-col justify-between">
            <Card className="p-6 border-gray-200 bg-gray-100 h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-500">
                      Optimización Automática
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      Próximamente
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Generación automática de versiones optimizadas de tu CV para
                  diferentes ofertas de trabajo.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-gray-200 bg-gray-100 h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-500">
                      Plantillas Profesionales
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      Próximamente
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Biblioteca de plantillas de CV profesionales adaptadas a
                  diferentes industrias y roles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
