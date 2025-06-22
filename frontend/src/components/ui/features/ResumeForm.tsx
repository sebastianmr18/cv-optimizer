"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";

interface ResumeFormProps {
  setSuggestions: (suggestions: string) => void;
  setFileUrl: (fileUrl: string | null) => void;
  setFileError: (error: string | null) => void;
}

export default function ResumeForm({
  setSuggestions,
  setFileUrl,
  setFileError,
}: ResumeFormProps) {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!cvFile || !jobDescription) return;

    const formData = new FormData();
    formData.append("cv", cvFile);
    formData.append("jobDescription", jobDescription);

    const response = await axios.post("/api/adapt-cv", formData);
    const data = response.data;
    setSuggestions(data.suggestions || "");
    setIsLoading(false);
  };

  const handleFileChange = async (file: File) => {
    setFileError("");
    const isValidFile =
      file.type.match(/(pdf)/) &&
      [".pdf"].includes(
        file.name.slice(file.name.lastIndexOf(".")).toLowerCase(),
      );
    if (!isValidFile) {
      setFileError("Solo se permiten archivos PDF");
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setCvFile(file);
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}_${file.name.replace(/\s+/g, "_")}`;

    try {
      const res = await axios.post("/api/upload-aws", {
        fileName: uniqueFileName,
        contentType: file.type,
      });

      const { url, fields } = res.data;

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadRes = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Disposition": `inline`,
        },
      });

      if (uploadRes.ok) {
        const fileUrl = `${url.split("?")[0]}${fields.key.startsWith("/") ? fields.key.substring(1) : fields.key}`;
        setFileUrl(fileUrl);
      } else {
        setFileError(
          "Error al subir el archivo. Por favor, inténtalo de nuevo.",
        );
      }
    } catch {
      setFileError("El archivo supera el tamaño máximo permitido de 10MB.");
      setFileUrl(null);
    }
  };

  return (
    <>
      <form className="max-w-6xl mx-auto">
        <div className="flex gap-6 items-start">
          <div className="flex-1">
            <label
              htmlFor="cv-file-upload"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Sube tu CV (solo formato PDF)
            </label>
            <Input
              id="cv-file-upload"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileChange(file);
              }}
              className="h-[76px] file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:text-sm file:font-semibold
    file:bg-primary file:text-primary-foreground
    hover:file:bg-primary/90
    text-ellipsis-none whitespace-normal overflow-visible
    [&::-webkit-file-upload-button]:mr-4"
              style={{
                textOverflow: "unset",
                whiteSpace: "normal",
                overflow: "visible",
              }}
              required
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="job-description"
              className="block text-sm font-medium text-foreground mb-1"
            >
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
            disabled={!cvFile || !jobDescription || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Generando sugerencias..." : "Generar sugerencias"}
          </button>
        </div>
      </form>
    </>
  );
}
