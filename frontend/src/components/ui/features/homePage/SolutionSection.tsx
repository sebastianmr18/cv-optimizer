"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Brain,
  Zap,
  Shield,
  Upload,
  FileText,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    number: 1,
    icon: Brain,
    title: "Análisis Inteligente",
    description:
      "Nuestra IA examina tu CV completo, identificando áreas de mejora y oportunidades perdidas",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: 2,
    icon: Zap,
    title: "Sugerencias Personalizadas",
    description:
      "Recibe recomendaciones específicas para tu industria y nivel de experiencia",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: 3,
    icon: Shield,
    title: "Optimización ATS",
    description:
      "Asegúrate de que tu CV pase los filtros automáticos y llegue a los reclutadores",
    color: "from-green-500 to-emerald-500",
  },
];

const processSteps = [
  {
    number: 1,
    icon: Upload,
    title: "Sube tu CV",
    description: "Formato PDF",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: 2,
    icon: FileText,
    title: "Pega la descripción del puesto",
    description: "Copia y pega la oferta laboral",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: 3,
    icon: Sparkles,
    title: "Recibe recomendaciones",
    description: "IA analiza y sugiere mejoras",
    color: "from-green-500 to-emerald-500",
  },
];

export default function SolutionSection() {
  return (
    <section
      id="solution"
      className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden"
    >
      {/* Background decorations */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="absolute top-10 right-10 w-64 h-64 bg-green-400 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"
      />

      {/* Additional floating elements */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400 rounded-full opacity-30"
      />
      <motion.div
        animate={{
          y: [20, -20, 20],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-emerald-400 rounded-full opacity-20"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 text-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full mb-6"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">La Solución</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            IA que analiza y optimiza tu CV para cada oportunidad
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            CV Optimizer utiliza inteligencia artificial avanzada para analizar
            tu currículum y la descripción del puesto, generando recomendaciones
            específicas que aumentan tus posibilidades de ser seleccionado.
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, transition: { duration: 0.3 } }}
                  className="flex gap-6 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300 relative overflow-hidden`}
                  >
                    <step.icon className="w-8 h-8 text-white relative z-10" />
                  </motion.div>

                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 mb-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-8 h-8 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md relative overflow-hidden`}
                      >
                        {/* Animated ring */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="absolute inset-0 border-2 border-white/30 rounded-full"
                        />
                        <span className="relative z-10">{step.number}</span>
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                        {step.title}
                      </h3>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="text-gray-600 leading-relaxed"
                    >
                      {step.description}
                    </motion.p>

                    {/* Progress line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                      className={`h-1 bg-gradient-to-r ${step.color} rounded-full mt-4 opacity-30 relative overflow-hidden`}
                    >
                      {/* Animated shimmer effect */}
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: 1 + index * 0.3,
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotateY: -2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
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
                  className="absolute inset-0 rounded-2xl"
                />

                {/* Floating decorative elements */}
                <motion.div
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full opacity-30"
                />
                <motion.div
                  animate={{
                    y: [5, -5, 5],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-4 left-4 w-2 h-2 bg-emerald-400 rounded-full opacity-40"
                />

                <div className="space-y-6 relative z-10">
                  {processSteps.map((processStep, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{
                        x: 5,
                        transition: { duration: 0.2 },
                      }}
                      className="flex items-center space-x-4 group cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`w-12 h-12 bg-gradient-to-br ${processStep.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 relative overflow-hidden`}
                      >
                        <processStep.icon className="w-6 h-6 text-white relative z-10" />
                      </motion.div>

                      <div className="flex-1">
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.8 + index * 0.1,
                          }}
                          className="flex items-center gap-2 mb-1"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center relative overflow-hidden"
                          >
                            {/* Animated ring */}
                            <motion.div
                              animate={{ rotate: -360 }}
                              transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                              className="absolute inset-0 border border-green-300 rounded-full"
                            />
                            <span className="text-green-600 font-bold text-sm relative z-10">
                              {processStep.number}
                            </span>
                          </motion.div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                            {processStep.title}
                          </h4>
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.9 + index * 0.1,
                          }}
                          className="text-sm text-gray-600"
                        >
                          {processStep.description}
                        </motion.p>

                        {/* Animated underline */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                          className={`h-0.5 bg-gradient-to-r ${processStep.color} rounded-full mt-2 opacity-50`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
