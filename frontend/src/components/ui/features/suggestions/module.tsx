"use client";

import LoadingSkeleton from "@/components/ui/features/suggestions/SuggestionsSkeleton";
import SuggestionsNotFound from "@/components/ui/features/suggestions/SuggestionsNotFound";
import SuggestionsAnalysis from "@/components/ui/features/suggestions/SuggestionsAnalysis";
import type {
  CVOptimizationResult,
} from "@/types/CVOptimization";

interface SuggestionsProps {
  suggestions: CVOptimizationResult | null;
  suggestionsLoading: boolean;
}

export default function Suggestions({
  suggestions,
  suggestionsLoading,
}: SuggestionsProps) {

  if (suggestionsLoading) return <LoadingSkeleton />;

  if (!suggestions) {
    return (
      <SuggestionsNotFound />
    );
  }

  return (
    <SuggestionsAnalysis suggestions={suggestions} />
  );
}
