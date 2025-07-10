"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-green-50 to-green-100">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Optimización de CV con IA
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Optimiza tu CV para cada{" "}
              <span className="text-green-600">oportunidad laboral</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Recibe recomendaciones personalizadas basadas en IA para adaptar
              tu currículum a cualquier oferta de trabajo y aumentar tus
              posibilidades de éxito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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
          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl p-6">
              <Image
                src="/images/cv-optimizer-app.png"
                alt="Interfaz de CV Optimizer"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
