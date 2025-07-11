"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  FileText,
  Lightbulb,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    title: "Análisis de palabras clave",
    delay: 0.1,
  },
  {
    title: "Identificación de habilidades faltantes",
    delay: 0.2,
  },
  {
    title: "Sugerencias de mejora personalizadas",
    delay: 0.3,
  },
  {
    title: "Puntuación de compatibilidad",
    delay: 0.4,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 px-4 md:px-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden"
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
        className="absolute top-10 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          rotate: [360, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl"
      />

      {/* Floating particles */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-green-400 rounded-full opacity-40"
      />
      <motion.div
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-400 rounded-full opacity-30"
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Herramientas Potentes</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Funcionalidades Principales
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600"
          >
            Herramientas potentes para optimizar tu búsqueda de empleo
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Main Feature Card */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              rotateY: -2,
              transition: { duration: 0.3 },
            }}
            className="relative"
          >
            <Card className="p-8 border-green-200 bg-white shadow-2xl h-full flex flex-col justify-between relative overflow-hidden group">
              {/* Animated background gradient */}
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(34, 197, 94, 0.05), rgba(16, 185, 129, 0.05))",
                    "linear-gradient(45deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05))",
                    "linear-gradient(45deg, rgba(5, 150, 105, 0.05), rgba(34, 197, 94, 0.05))",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              />
              <div className="relative z-10">
                <CardHeader className="pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden"
                    >
                      {/* Pulsing effect */}
                      <motion.div
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-green-400 rounded-lg"
                      />
                      <Lightbulb className="h-6 w-6 text-green-600 relative z-10" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">
                        Análisis Inteligente de CV
                      </CardTitle>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge className="bg-green-100 text-green-800 mt-2 hover:bg-green-200 transition-colors duration-300">
                          Disponible Ahora
                        </Badge>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-gray-600 text-lg"
                  >
                    Nuestra IA analiza tu CV y la descripción del puesto para
                    identificar brechas y oportunidades de mejora específicas.
                  </motion.p>

                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.6 + feature.delay,
                        }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        className="flex items-center space-x-3 group/item cursor-pointer"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 group-hover/item:text-green-700 transition-colors" />
                        <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">
                          {feature.title}
                        </span>
                        {/* Animated underline */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          className="h-0.5 bg-green-400 absolute bottom-0 left-0"
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-8 flex justify-center relative z-10"
              >
                <Link href="/analyzer">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                    >
                      Probar ahora
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Success indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
                className="absolute -top-2 -right-2"
              ></motion.div>
            </Card>
          </motion.div>

          {/* Coming Soon Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6 h-full flex flex-col justify-between"
          >
            {/* Optimización Automática */}
            <motion.div
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="relative"
            >
              <Card className="p-6 border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50 h-full relative overflow-hidden group">
                {/* Animated background pattern */}

                <CardHeader className="pb-4 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center shadow-md relative overflow-hidden"
                    >
                      {/* Subtle pulse */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-blue-400 rounded-lg"
                      />
                      <Zap className="h-5 w-5 text-gray-500 relative z-10" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-lg text-gray-500">
                        Optimización Automática
                      </CardTitle>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge
                          variant="secondary"
                          className="mt-1 hover:bg-gray-300 transition-colors duration-300"
                        >
                          Próximamente
                        </Badge>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="text-gray-500"
                  >
                    Generación automática de versiones optimizadas de tu CV para
                    diferentes ofertas de trabajo.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Plantillas Profesionales */}
            <motion.div
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="relative"
            >
              <Card className="p-6 border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50 h-full relative overflow-hidden group">
                {/* Animated background pattern */}
                <motion.div
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50"
                />
                <CardHeader className="pb-4 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -10 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center shadow-md relative overflow-hidden"
                    >
                      {/* Subtle pulse */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                        className="absolute inset-0 bg-purple-400 rounded-lg"
                      />
                      <FileText className="h-5 w-5 text-gray-500 relative z-10" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-lg text-gray-500">
                        Plantillas Profesionales
                      </CardTitle>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge
                          variant="secondary"
                          className="mt-1 hover:bg-gray-300 transition-colors duration-300"
                        >
                          Próximamente
                        </Badge>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    viewport={{ once: true }}
                    className="text-gray-500"
                  >
                    Biblioteca de plantillas de CV profesionales adaptadas a
                    diferentes industrias y roles.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
