"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { splitSuggestions } from "@/utils/splitSuggestions";

interface SuggestionsProps {
  suggestions: string;
}

export default function Suggestions({ suggestions }: SuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <Card className="mt-6 border border-border shadow-sm bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-lg">Sugerencias Generadas</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-sm dark:prose-invert max-w-none">
        {splitSuggestions(suggestions).map((part, index) => (
          <div key={index} className="prose prose-green max-w-none">
            <ReactMarkdown>{part}</ReactMarkdown>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
