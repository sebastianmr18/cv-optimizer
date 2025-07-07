import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SolutionSection() {
  return (
    <section id="solucion" className="py-20 px-4 md:px-6 bg-green-50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-green-600 text-white">Nuestra Solución</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              IA que analiza y optimiza tu CV para cada oportunidad
            </h2>
            <p className="text-lg text-gray-600">
              CV Optimizer utiliza inteligencia artificial avanzada para
              analizar tu currículum y la descripción del puesto, generando
              recomendaciones específicas que aumentan tus posibilidades de ser
              seleccionado.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Análisis Inteligente
                  </h3>
                  <p className="text-gray-600">
                    Compara tu CV con los requisitos específicos del puesto
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Recomendaciones Personalizadas
                  </h3>
                  <p className="text-gray-600">
                    Sugerencias específicas para mejorar tu perfil
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Resultados Inmediatos
                  </h3>
                  <p className="text-gray-600">
                    Obtén tu análisis en segundos, no en días
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sube tu CV</h4>
                  <p className="text-sm text-gray-600">Formato PDF</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">
                    Pega la descripción del puesto
                  </h4>
                  <p className="text-sm text-gray-600">
                    Copia y pega la oferta laboral
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">Recibe recomendaciones</h4>
                  <p className="text-sm text-gray-600">
                    IA analiza y sugiere mejoras
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
