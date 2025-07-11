"use client"

import { motion } from "framer-motion"
import { Leaf, ArrowUp, Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
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
        className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"
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
        className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"
      />

      {/* Floating particles */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-1/4 w-2 h-2 bg-green-400 rounded-full"
      />
      <motion.div
        animate={{
          y: [10, -10, 10],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-32 right-1/3 w-3 h-3 bg-emerald-400 rounded-full"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Link href="/" className="flex items-center justify-center gap-3 mb-6 group">
                  <Leaf className="w-7 h-7 text-white" />
                <div>
                  <h3 className="text-3xl font-bold group-hover:text-green-400 transition-colors">CV Optimizer</h3>
                  <p className="text-sm text-gray-400">Potenciado por IA</p>
                </div>
              </Link>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-gray-300 text-lg leading-relaxed max-w-lg mx-auto"
              >
                Optimiza tu CV con inteligencia artificial avanzada y aumenta tus oportunidades laborales. Únete a miles
                de profesionales que ya han mejorado sus carreras.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 py-8"
        >
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center gap-2 text-gray-400 text-sm"
            >
              <span>&copy; {new Date().getFullYear()} CV Optimizer AI. Proyecto open source en desarrollo.</span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  Hecho con{" "}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Heart className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  </motion.div>{" "}
                  en Colombia
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>
    </footer>
  )
}
