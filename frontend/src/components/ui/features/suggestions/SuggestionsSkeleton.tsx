"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Loader2,
  Key,
  FileText,
  User,
  Briefcase,
  AlertTriangle,
  Star,
  Target,
  Lightbulb,
} from "lucide-react";

export default function SuggestionsSkeleton() {
  const mockSections = [
    {
      icon: Key,
      title: "Palabras Clave",
      color:
        "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800",
    },
    {
      icon: FileText,
      title: "Formato",
      color:
        "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800",
    },
    {
      icon: User,
      title: "Contenido",
      color:
        "bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800",
    },
    {
      icon: Briefcase,
      title: "Experiencia",
      color:
        "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
    },
    {
      icon: AlertTriangle,
      title: "Faltantes",
      color: "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800",
    },
    {
      icon: Star,
      title: "Fortalezas",
      color:
        "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800",
    },
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* Header with Loading Animation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
          <h2 className="text-xl font-semibold">Analizando CV...</h2>
        </div>

        {/* Helper Text */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground text-center">
            🔄 Procesando tu CV y generando sugerencias personalizadas
          </p>
        </div>

        {/* Loading Match Score Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <Skeleton className="h-8 w-12" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Loading Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <Skeleton className="h-5 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>

      {/* Loading Suggestions Sections */}
      <div className="grid gap-4 lg:grid-cols-2">
        {mockSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card
              key={index}
              className={`${section.color} transition-all duration-200`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-5 w-6 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-start justify-between gap-2 p-2 rounded-md bg-white/50 dark:bg-gray-900/50"
                  >
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-4/5" />
                    </div>
                    <Skeleton className="h-6 w-6 rounded" />
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Loading Final Recommendation */}
      <Separator />
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-6 w-6 rounded ml-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    </div>
  );
}
