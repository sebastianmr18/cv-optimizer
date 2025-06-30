import type {
  CVOptimizationResult,
  SuggestionSection,
} from "@/types/CVOptimization";

export function processCVOptimization(
  data: CVOptimizationResult,
): SuggestionSection[] {
  const sections: SuggestionSection[] = [];

  // Add keyword suggestions
  if (data.keywordSuggestions.length > 0) {
    sections.push({
      title: "Palabras Clave",
      items: data.keywordSuggestions,
      type: "keywords",
    });
  }

  // Add format suggestions
  if (data.formatSuggestions.length > 0) {
    sections.push({
      title: "Formato y Estructura",
      items: data.formatSuggestions,
      type: "format",
    });
  }

  // Add content suggestions
  if (data.contentSuggestions.length > 0) {
    sections.push({
      title: "Contenido",
      items: data.contentSuggestions,
      type: "content",
    });
  }

  // Add experience suggestions
  if (data.experienceSuggestions.length > 0) {
    sections.push({
      title: "Experiencia Profesional",
      items: data.experienceSuggestions,
      type: "experience",
    });
  }

  // Add missing skills if available
  if (data.missingSkills && data.missingSkills.length > 0) {
    sections.push({
      title: "Habilidades Faltantes",
      items: data.missingSkills,
      type: "missing",
    });
  }

  // Add strong matches if available
  if (data.strongMatches && data.strongMatches.length > 0) {
    sections.push({
      title: "Fortalezas Identificadas",
      items: data.strongMatches,
      type: "strong",
    });
  }

  return sections;
}
