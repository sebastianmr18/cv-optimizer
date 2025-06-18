"use client";

import ResumeForm from "@/components/features/ResumeForm";
import Suggestions from "@/components/features/Suggestions";
import CVPageLayout from "@/components/layout/CVPageLayout";
import PDFViewer from "@/components/features/PDFViewer";
import { useState } from "react";

export default function HomePage() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
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
