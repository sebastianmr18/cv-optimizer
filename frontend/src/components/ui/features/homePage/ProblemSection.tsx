"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Target, FileX } from "lucide-react";

const problems = [
  {
    icon: FileX,
    title: "Formato Inadecuado",
    description:
      "Los sistemas ATS rechazan CVs con formatos complejos o poco legibles",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Falta de Palabras Clave",
    description:
      "Sin las palabras clave correctas, tu CV nunca llegará a manos de un reclutador",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: AlertTriangle,
    title: "Contenido Genérico",
    description:
      "CVs que no destacan logros específicos ni se adaptan al puesto deseado",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 0.05, x: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-100 to-transparent"
      />

      <div className="max-w-6xl mx-auto relative z-10">
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
            className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-6"
          >
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">Problema Común</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            ¿Por qué tu CV no está{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
              generando entrevistas?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Muchos profesionales talentosos luchan por conseguir entrevistas
            debido a CVs mal optimizados
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                  className={`absolute inset-0 bg-gradient-to-br ${problem.color}`}
                />

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 bg-gradient-to-br ${problem.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <problem.icon className="w-8 h-8 text-white" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-800"
                >
                  {problem.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-gray-600 leading-relaxed"
                >
                  {problem.description}
                </motion.p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  className={`h-1 bg-gradient-to-r ${problem.color} rounded-full mt-6`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
