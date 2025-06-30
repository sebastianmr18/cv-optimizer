export interface CVOptimizationResult {
  summary: string;
  matchScore: number;
  keywordSuggestions: string[];
  formatSuggestions: string[];
  contentSuggestions: string[];
  experienceSuggestions: string[];
  finalRecommendation: string;
  missingSkills?: string[];
  strongMatches?: string[];
}

export interface SuggestionSection {
  title: string;
  items: string[];
  type: "keywords" | "format" | "content" | "experience" | "missing" | "strong";
}
