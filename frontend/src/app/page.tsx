"use client";

import ResumeForm from "@/components/ui/features/ResumeForm";
import Suggestions from "@/components/ui/features/Suggestions";
import CVPageLayout from "@/components/ui/layout/CVPageLayout";
import PDFViewer from "@/components/ui/features/PDFViewer";
import { CVOptimizationResult } from "@/types/CVOptimization";
import { useState } from "react";

export default function HomePage() {
  const [suggestions, setSuggestions] = useState<CVOptimizationResult | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  return (
    <CVPageLayout
      leftPanel={
        <>
          <ResumeForm
            setSuggestions={setSuggestions}
            setFileUrl={setFileUrl}
            setFileError={setFileError}
          />
          <PDFViewer fileUrl={fileUrl} fileError={fileError} />
        </>
      }
      rightPanel={<Suggestions suggestions={suggestions} />}
    />
  );
}
