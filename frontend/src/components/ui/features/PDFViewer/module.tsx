"use client";

import { useEffect, useState } from "react";
import PDFViewerFileError from "@/components/ui/features/PDFViewer/PDFViewerFileError";
import PDFViewerLoading from "@/components/ui/features/PDFViewer/PDFViewerLoading";
import PDFViewerNotFileUrl from "@/components/ui/features/PDFViewer/PDFViewerNotFileUrl";
import PDFViewerNotPDF from "@/components/ui/features/PDFViewer/PDFViewerNotPDF";
import PDFViewerError from "@/components/ui/features/PDFViewer/PDFViewerError";
import PDFViewerShowPDF from "@/components/ui/features/PDFViewer/PDFViewerShowPDF";
import { generatePresignedUrl, isValidPDF} from "@/utils/PDFViewer/PDFViewerUtils";

interface PDFViewerProps {
  fileUrl: string | null;
  fileError?: string | null;
  isUploading: boolean;
  isPreviewLoading: boolean;
  setIsPreviewLoading: (loading: boolean) => void;
}

export default function PDFViewer({ fileUrl, fileError, isUploading, isPreviewLoading, setIsPreviewLoading }: PDFViewerProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (!fileUrl || !isValidPDF(fileUrl)) return;

      try {
        setIsPreviewLoading(true);
        const signed = await generatePresignedUrl(fileUrl);
        setSignedUrl(signed);
      } catch (error) {
        setSignedUrl(null);
      } finally {
        setIsPreviewLoading(false);
      }
    };
    fetchSignedUrl();
  }, [fileUrl]);

  if (fileError) {
    return <PDFViewerFileError fileError={fileError} />;
  }

  if (!fileUrl) {
    return <PDFViewerNotFileUrl />;
  }

  if (!isValidPDF(fileUrl)) {
    return <PDFViewerNotPDF fileUrl={fileUrl} />;
  }

  if (isUploading || isPreviewLoading) {
    return <PDFViewerLoading />;
  }

  if (error) {
    return <PDFViewerError error={error} />;
  }

  return <PDFViewerShowPDF signedUrl={signedUrl} />;
}
