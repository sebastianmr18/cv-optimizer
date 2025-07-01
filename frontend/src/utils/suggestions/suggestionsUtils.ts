import type {
  SuggestionSection,
} from "@/types/CVOptimization";
import {
  User,
  Briefcase,
  FileText,
  Key,
  AlertTriangle,
  Star,
} from "lucide-react";

export function getSectionConfig(type: SuggestionSection["type"]) {
  const configs = {
    keywords: {
      title: "Palabras Clave",
      icon: Key,
      color:
        "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800",
      badgeColor:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    format: {
      title: "Formato",
      icon: FileText,
      color:
        "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800",
      badgeColor:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    },
    content: {
      title: "Contenido",
      icon: User,
      color:
        "bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800",
      badgeColor:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    },
    experience: {
      title: "Experiencia",
      icon: Briefcase,
      color:
        "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
      badgeColor:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    missing: {
      title: "Faltantes",
      icon: AlertTriangle,
      color: "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800",
      badgeColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
    strong: {
      title: "Fortalezas",
      icon: Star,
      color:
        "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800",
      badgeColor:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    },
  };

  return configs[type] || configs.content;
}

export function getMatchScoreColor(score: number) {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  if (score >= 40) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

export function getProgressColor(score: number) {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  if (score >= 40) return "bg-orange-500";
  return "bg-red-500";
}