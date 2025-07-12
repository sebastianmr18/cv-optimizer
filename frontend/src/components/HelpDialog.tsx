"use client";

import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HelpCircle,
  FileText,
  Upload,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Target,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const routeToSection: Record<string, string> = {
  "/analyzer": "analyzer",
};

const helpSections = {
  analyzer: {
    id: "analyzer",
    title: "Análisis de CV",
    description: "Aprende a usar nuestro analizador de CV con IA",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    available: true,
    route: "/analyzer",
    steps: [
      {
        id: 1,
        title: "Sube tu CV",
        description: "Selecciona tu archivo PDF desde tu dispositivo",
        icon: Upload,
        details: [
          "Formatos soportados: PDF únicamente",
          "Tamaño máximo: 10MB",
          "Asegúrate de que el texto sea legible",
          "Evita imágenes como fondo del texto",
        ],
      },
      {
        id: 2,
        title: "Pega la descripción del puesto",
        description: "Copia y pega la oferta laboral completa",
        icon: Target,
        details: [
          "Incluye todos los requisitos del puesto",
          "Copia responsabilidades y habilidades requeridas",
          "Mientras más detallada, mejor será el análisis",
          "Puedes usar múltiples ofertas similares",
        ],
      },
      {
        id: 3,
        title: "Recibe sugerencias personalizadas",
        description: "Nuestra IA analiza y proporciona mejoras específicas",
        icon: Sparkles,
        details: [
          "Análisis de palabras clave faltantes",
          "Sugerencias de habilidades a destacar",
          "Recomendaciones de formato y estructura",
          "Puntuación de compatibilidad con el puesto",
        ],
      },
    ],
  },
};

const generalTips = [
  {
    icon: Lightbulb,
    title: "Consejos Generales",
    tips: [
      "Usa palabras clave relevantes del sector",
      "Cuantifica tus logros con números específicos",
      "Adapta tu CV para cada aplicación",
      "Mantén un formato limpio y profesional",
    ],
  },
  {
    icon: CheckCircle,
    title: "Mejores Prácticas",
    tips: [
      "Revisa la ortografía y gramática",
      "Usa verbos de acción en tiempo pasado",
      "Incluye solo información relevante",
      "Mantén la consistencia en el formato",
    ],
  },
];

interface HelpDialogProps {
  children: React.ReactNode;
}

export default function HelpDialog({ children }: HelpDialogProps) {
  const pathname = usePathname();
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  // Detectar la sección basada en la ruta actual
  useEffect(() => {
    console.log(pathname);
    const currentSection = routeToSection[pathname];
    setSelectedSection(currentSection);
  }, [pathname]);

  const currentSection =
    helpSections[selectedSection as keyof typeof helpSections];

  // Obtener el título contextual basado en la ruta
  const getContextualTitle = () => {
    const section =
      helpSections[routeToSection[pathname] as keyof typeof helpSections];
    if (section) {
      return `Ayuda - ${section.title}`;
    }
    return "Centro de Ayuda";
  };

  const getContextualDescription = () => {
    const section =
      helpSections[routeToSection[pathname] as keyof typeof helpSections];
    if (section) {
      return `Aprende a usar ${section.title.toLowerCase()}`;
    }
    return "Aprende a aprovechar al máximo CV Optimizer";
  };

  if (!currentSection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-white border-green-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Background decorative elements */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-2xl opacity-30"
          />
          <DialogHeader className="relative z-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-2"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`w-10 h-10 bg-gradient-to-br ${currentSection?.color || "from-green-500 to-emerald-500"} rounded-xl flex items-center justify-center shadow-lg`}
              >
                {currentSection?.icon ? (
                  <currentSection.icon className="w-6 h-6 text-white" />
                ) : (
                  <HelpCircle className="w-6 h-6 text-white" />
                )}
              </motion.div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {getContextualTitle()}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  {getContextualDescription()}
                </DialogDescription>
              </div>
            </motion.div>
          </DialogHeader>

          <div className="grid gap-6 mt-6 max-h-[60vh] overflow-y-auto">
            {currentSection.steps && (
              <div className="space-y-4">
                {currentSection.steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-10 h-10 bg-gradient-to-br ${currentSection.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}
                      >
                        <step.icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {step.id}
                          </span>
                          <h3 className="font-semibold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        <ul className="space-y-1">
                          {step.details.map((detail, detailIndex) => (
                            <motion.li
                              key={detailIndex}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.5 + detailIndex * 0.1,
                              }}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <ArrowRight className="w-3 h-3 text-green-500" />
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* General Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 grid md:grid-cols-2 gap-4"
            >
              {generalTips.map((tipSection, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <tipSection.icon className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">
                      {tipSection.title}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {tipSection.tips.map((tip, tipIndex) => (
                      <li
                        key={tipIndex}
                        className="flex items-start gap-2 text-sm text-green-700"
                      >
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
