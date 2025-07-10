"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Optimización de CV con IA
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Optimiza tu CV con{" "}
              <span className="text-green-600">Inteligencia Artificial</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Mejora tus oportunidades laborales con nuestro optimizador de CV
              impulsado por IA. Obtén sugerencias personalizadas y destaca entre
              los candidatos.
            </p>
            <div className="flex flex-col gap-4 justify-center">
              <Link href="/analyzer">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Comenzar Gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
