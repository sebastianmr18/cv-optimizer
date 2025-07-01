"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type {
  CVOptimizationResult
} from "@/types/CVOptimization";
import { processCVOptimization } from "@/utils/processCV";
import {
  Copy,
  CheckCircle,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react";
import { getMatchScoreColor, getSectionConfig, getProgressColor } from "@/utils/suggestions/suggestionsUtils";
import { useState } from "react";

interface SuggestionsAnalysisProps {
  suggestions: CVOptimizationResult;
}

export default function SuggestionsAnalysis({ suggestions }: SuggestionsAnalysisProps) {
    const [copiedItem, setCopiedItem] = useState<string | null>(null);
      const sections = processCVOptimization(suggestions);

  const copyToClipboard = async (text: string, identifier: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(identifier);
      setTimeout(() => {
        setCopiedItem(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  };
    return (
    <div className="mt-6 space-y-6">
      {/* Header with Match Score */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Análisis de CV</h2>
        </div>

        {/* Helper Text */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground text-center">
            💡 Haz clic en el icono de copiar para guardar una sugerencia
            específica
          </p>
        </div>

        {/* Match Score Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Puntuación de Coincidencia
                </h3>
                <p className="text-sm text-muted-foreground">
                  Compatibilidad entre tu CV y la oferta de empleo
                </p>
              </div>
              <div
                className={`text-3xl font-bold ${getMatchScoreColor(suggestions.matchScore)}`}
              >
                {suggestions.matchScore}%
              </div>
            </div>
            <Progress
              value={suggestions.matchScore}
              className="h-3"
              style={{
                background: `linear-gradient(to right, ${getProgressColor(suggestions.matchScore)} 0%, ${getProgressColor(suggestions.matchScore)} ${suggestions.matchScore}%, #e5e7eb ${suggestions.matchScore}%, #e5e7eb 100%)`,
              }}
            />
          </CardContent>
        </Card>

        {/* Summary */}
        {suggestions.summary && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Resumen del Análisis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{suggestions.summary}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Suggestions Sections */}
      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map((section, sectionIndex) => {
          const config = getSectionConfig(section.type);
          const Icon = config.icon;

          return (
            <Card
              key={sectionIndex}
              className={`${config.color} transition-all duration-200 hover:shadow-md`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <CardTitle className="text-sm font-medium">
                      {section.title}
                    </CardTitle>
                  </div>
                  <Badge className={config.badgeColor}>
                    {section.items.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-start justify-between gap-2 p-2 rounded-md bg-white/50 dark:bg-gray-900/50"
                  >
                    <p className="text-sm leading-relaxed flex-1">{item}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(item, `${sectionIndex}-${itemIndex}`)
                      }
                      className="h-6 w-6 p-0 flex-shrink-0"
                    >
                      {copiedItem === `${sectionIndex}-${itemIndex}` ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Final Recommendation */}
      {suggestions.finalRecommendation && (
        <>
          <Separator />
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Recomendación Final
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      suggestions.finalRecommendation,
                      "final-recommendation",
                    )
                  }
                  className="h-6 w-6 p-0 ml-auto"
                >
                  {copiedItem === "final-recommendation" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed font-medium">
                {suggestions.finalRecommendation}
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
    )
}