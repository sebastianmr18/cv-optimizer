"use client";

import { Button } from "@/components/ui/button";
import { Leaf, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

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
      element.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <header className="w-full sticky top-0 z-50 bg-green-800 text-primary-foreground py-4 shadow-sm border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Leaf className="w-6 h-6 text-primary-foreground" />
          <h1 className="text-xl font-bold">CV Optimizer</h1>
        </Link>
        {/* Navegación Desktop - Solo en HomePage */}
        {isHomePage && (
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={`text-primary-foreground hover:bg-green-700 hover:text-primary-foreground transition-colors ${
                  activeSection === item.id ? "bg-green-700 font-semibold" : ""
                }`}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        )}

        {/* Botones de acción */}
        <div className="flex items-center gap-2">
          {/* Botón de ayuda */}
          {!isHomePage && (
            <Button
              variant="outline"
              size="sm"
              className="text-secondary-foreground hover:bg-green-900 hover:text-primary-foreground hover:border-green-900 transition-colors bg-transparent"
            >
              Ayuda
            </Button>
          )}

          {/* Botón menú móvil - Solo en HomePage */}
          {isHomePage && (
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-primary-foreground hover:bg-green-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          )}
        </div>
      </div>
      {/* Menú móvil - Solo en HomePage */}
      {isHomePage && isMobileMenuOpen && (
        <div className="md:hidden bg-green-800 border-t border-green-700">
          <nav className="max-w-6xl mx-auto px-4 py-2">
            <div className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className={`justify-start text-primary-foreground hover:bg-green-700 hover:text-primary-foreground transition-colors ${
                    activeSection === item.id
                      ? "bg-green-700 font-semibold"
                      : ""
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
