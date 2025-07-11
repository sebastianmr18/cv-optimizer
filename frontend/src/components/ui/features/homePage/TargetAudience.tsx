"use client";

import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  Briefcase,
  RefreshCw,
  Crown,
} from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Recién Graduados",
    description:
      "Destaca tu potencial y habilidades académicas de manera profesional",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Briefcase,
    title: "Profesionales",
    description: "Optimiza tu experiencia y logros para avanzar en tu carrera",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    icon: RefreshCw,
    title: "Cambio de Carrera",
    description: "Resalta habilidades transferibles para tu nueva industria",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Crown,
    title: "Ejecutivos",
    description:
      "Presenta tu liderazgo y impacto estratégico de forma convincente",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
  },
];

export default function TargetAudience() {
  return (
    <section
      id="target"
      className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"
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
            className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full mb-6"
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Para Todos</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            ¿Para quién es{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              CV Optimizer?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Nuestra herramienta está diseñada para profesionales en todas las
            etapas de su carrera
          </motion.p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="group cursor-pointer"
            >
              <div
                className={`${audience.bgColor} p-8 rounded-3xl transition-all duration-500 hover:shadow-2xl border border-gray-100 relative overflow-hidden h-full`}
              >
                {/* Animated background on hover */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${audience.color} rounded-3xl`}
                />

                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 bg-gradient-to-br ${audience.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <audience.icon className="w-8 h-8 text-white" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
                  className="text-lg font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors"
                >
                  {audience.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
                  className="text-gray-600 text-sm leading-relaxed"
                >
                  {audience.description}
                </motion.p>

                {/* Hover effect line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className={`h-1 bg-gradient-to-r ${audience.color} rounded-full mt-6`}
                />

                {/* Floating particles */}
                <motion.div
                  animate={{
                    y: [-5, 5, -5],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2 + index * 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-br ${audience.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
