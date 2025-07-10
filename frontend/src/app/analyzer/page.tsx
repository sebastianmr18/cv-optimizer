"use client";

import ResumeForm from "@/components/ui/features/resumeForm/module";
import Suggestions from "@/components/ui/features/suggestions/module";
import CVPageLayout from "@/components/ui/layout/CVPageLayout";
import PDFViewer from "@/components/ui/features/PDFViewer/module";
import { CVOptimizationResult } from "@/types/CVOptimization";
import { useState } from "react";

export default function AnalyzerPage() {
  const [suggestions, setSuggestions] = useState<CVOptimizationResult | null>(
    null,
  );
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  return (
    <CVPageLayout
      leftPanel={
        <>
          <ResumeForm
            setSuggestions={setSuggestions}
            setFileUrl={setFileUrl}
            setFileError={setFileError}
            setSuggestionsLoading={setIsSuggestionsLoading}
            setIsUploading={setIsUploading}
            isUploading={isUploading}
          />
          <PDFViewer
            fileUrl={fileUrl}
            fileError={fileError}
            isUploading={isUploading}
            isPreviewLoading={isPreviewLoading}
            setIsPreviewLoading={setIsPreviewLoading}
          />
        </>
      }
      rightPanel={
        <Suggestions
          suggestions={suggestions}
          suggestionsLoading={isSuggestionsLoading}
        />
      }
    />
  );
}
