"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, TrendingUp } from "lucide-react";

export default function TargetAudience() {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          ¿Para quién es CV Optimizer?
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Diseñado para profesionales que buscan maximizar sus oportunidades
          laborales
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-green-200 hover:border-green-400 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">
                Profesionales en Búsqueda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Profesionales activos que buscan nuevas oportunidades y quieren
                destacar en cada aplicación.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:border-green-400 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Recién Graduados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Estudiantes y recién graduados que buscan su primera oportunidad
                profesional en el mercado laboral.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:border-green-400 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">
                Cambio de Carrera
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Profesionales que buscan transicionar a nuevas industrias o
                roles y necesitan adaptar su perfil.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
