// 📁 src/components/ui/features/resume/ResumeForm.tsx

"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import type { CVOptimizationResult } from "@/types/CVOptimization";
import {
  validatePDFFile,
  getUniqueFileName,
  uploadToS3,
  generateSuggestions,
} from "@/utils/resumeForm/resumeFormUtils";

interface ResumeFormProps {
  setSuggestions: (suggestions: CVOptimizationResult) => void;
  setFileUrl: (fileUrl: string | null) => void;
  setFileError: (error: string | null) => void;
  setSuggestionsLoading: (loading: boolean) => void;
  setIsUploading: (loading: boolean) => void;
  isUploading: boolean;
}

export default function ResumeForm({
  setSuggestions,
  setFileUrl,
  setFileError,
  setSuggestionsLoading,
  setIsUploading,
  isUploading,
}: ResumeFormProps) {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [inputKey, setInputKey] = useState(Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile || !jobDescription) return;

    setSuggestionsLoading(true);

    try {
      const suggestions = await generateSuggestions(cvFile, jobDescription);
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error al generar sugerencias:", error);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const handleFileChange = async (file: File) => {
    setFileError(null);
    setIsUploading(true);
    const isValid = validatePDFFile(file);
    if (!isValid) {
      setFileError("Hubo un error. Asegurate que el archivo sea un PDF y que el peso del archivo no supere los 10MB.");
      setCvFile(null);
      setInputKey(Date.now());
      fileInputRef.current && (fileInputRef.current.value = "");
      return;
    }

    setCvFile(file);
    const uniqueFileName = getUniqueFileName(file.name);

    try {
      const fileUrl = await uploadToS3(file, uniqueFileName);
      setFileUrl(fileUrl);
    } catch (error) {
      console.error(error);
      setFileError("Hubo un error al generar el enlace del PDF.");
      setFileUrl(null);
      setInputKey(Date.now());
    } finally {
      setIsUploading(false);}
  };

  const handleClear = () => {
    setCvFile(null);
    setJobDescription("");
    setFileError(null);
    setFileUrl(null);
    setInputKey(Date.now());
    fileInputRef.current && (fileInputRef.current.value = "");
  };

  return (
    <form className="max-w-6xl mx-auto">
      <div className="flex gap-6 items-start">
        <div className="flex-1">
          <label htmlFor="cv-file-upload" className="block text-sm font-medium text-foreground mb-1">
            Sube tu CV (solo formato PDF)
          </label>
          <Input
            key={inputKey}
            id="cv-file-upload"
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file);
            }}
            ref={fileInputRef}
            className="h-[76px] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            style={{ textOverflow: "unset", whiteSpace: "normal", overflow: "visible" }}
            required
          />
        </div>

        <div className="flex-1">
          <label htmlFor="job-description" className="block text-sm font-medium text-foreground mb-1">
            Descripción del puesto
          </label>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm resize-none"
            rows={3}
            placeholder="Pega la descripción del trabajo al que aplicas..."
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-green-500 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-green-800 transition-colors disabled:bg-green-400 disabled:text-gray-500"
          disabled={!cvFile || !jobDescription || isUploading}
          onClick={handleSubmit}
        >
          {isUploading ? "Generando sugerencias..." : "Generar sugerencias"}
        </button>

        <button
          type="button"
          className="w-full mt-2 bg-red-500 text-gray-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-300 hover:text-gray-500 transition-colors disabled:bg-red-400 disabled:text-gray-200"
          onClick={handleClear}
          disabled={(!cvFile && !jobDescription) || isUploading}
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}
