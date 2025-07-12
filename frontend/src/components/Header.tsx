"use client";

import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HelpDialog from "@/components/HelpDialog";

const navigationItems = [
  { id: "hero", label: "Inicio" },
  { id: "problem", label: "Problema" },
  { id: "solution", label: "Solución" },
  { id: "target", label: "Audiencia" },
  { id: "features", label: "Características" },
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = navigationItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full sticky top-0 z-50 bg-green-800/95 backdrop-blur-md text-primary-foreground py-4 shadow-lg border-b border-green-700/50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </motion.div>
          <motion.h1
            className="text-xl font-bold group-hover:text-green-200 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            CV Optimizer
          </motion.h1>
        </Link>

        {/* Navegación Desktop */}
        {isHomePage && (
          <motion.nav
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-1"
          >
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-primary-foreground hover:bg-green-700 hover:text-primary-foreground transition-all duration-300 relative overflow-hidden ${
                    activeSection === item.id
                      ? "bg-green-700 font-semibold"
                      : ""
                  }`}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-green-600/30 rounded-md"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.nav>
        )}

        {/* Botones de acción */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2"
        >
          {!isHomePage && (
            <HelpDialog>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="text-secondary-foreground hover:bg-green-900 hover:text-primary-foreground hover:border-green-900 transition-all duration-300 bg-transparent border-green-600 hover:shadow-lg"
                >
                  Ayuda
                </Button>
              </motion.div>
            </HelpDialog>
          )}

          {isHomePage && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-primary-foreground hover:bg-green-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Abrir menú de navegación"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isHomePage && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-green-800/95 backdrop-blur-md border-t border-green-700/50"
          >
            <nav className="max-w-6xl mx-auto px-4 py-2">
              <div className="flex flex-col gap-1">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => scrollToSection(item.id)}
                      className={`justify-start text-primary-foreground hover:bg-green-700 hover:text-primary-foreground transition-all duration-300 ${
                        activeSection === item.id
                          ? "bg-green-700 font-semibold"
                          : ""
                      }`}
                    >
                      <motion.span whileTap={{ scale: 0.95 }}>
                        {item.label}
                      </motion.span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
