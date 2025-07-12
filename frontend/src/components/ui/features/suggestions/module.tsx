"use client";

import LoadingSkeleton from "@/components/ui/features/suggestions/SuggestionsSkeleton";
import SuggestionsNotFound from "@/components/ui/features/suggestions/SuggestionsNotFound";
import SuggestionsAnalysis from "@/components/ui/features/suggestions/SuggestionsAnalysis";
import SuggestionsError from "@/components/ui/features/suggestions/SuggestionsError";
import type { CVOptimizationResult } from "@/types/CVOptimization";

interface SuggestionsProps {
  suggestions: CVOptimizationResult | null;
  suggestionsLoading: boolean;
  suggestionsError: boolean;
}

export default function Suggestions({
  suggestions,
  suggestionsLoading,
  suggestionsError,
}: SuggestionsProps) {
  if (suggestionsLoading) return <LoadingSkeleton />;

  if (suggestionsError) return <SuggestionsError />;

  if (!suggestions) {
    return <SuggestionsNotFound />;
  }

  return <SuggestionsAnalysis suggestions={suggestions} />;
}
