import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PDFViewer from "@/components/ui/features/PDFViewer/module";

jest.mock("@/components/ui/features/PDFViewer/PDFViewerFileError", () => ({
  __esModule: true,
  default: ({ fileError }: { fileError: string }) => (
    <div data-testid="pdf-viewer-file-error">File Error: {fileError}</div>
  ),
}));

jest.mock("@/components/ui/features/PDFViewer/PDFViewerLoading", () => ({
  __esModule: true,
  default: () => <div data-testid="pdf-viewer-loading">Loading PDF...</div>,
}));

jest.mock("@/components/ui/features/PDFViewer/PDFViewerNotFileUrl", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="pdf-viewer-not-file-url">No file URL provided.</div>
  ),
}));

jest.mock("@/components/ui/features/PDFViewer/PDFViewerNotPDF", () => ({
  __esModule: true,
  default: ({ fileUrl }: { fileUrl: string }) => (
    <div data-testid="pdf-viewer-not-pdf">Not a PDF: {fileUrl}</div>
  ),
}));

jest.mock("@/components/ui/features/PDFViewer/PDFViewerError", () => ({
  __esModule: true,
  default: ({ error }: { error: string }) => (
    <div data-testid="pdf-viewer-internal-error">Internal Error: {error}</div>
  ),
}));

jest.mock("@/components/ui/features/PDFViewer/PDFViewerShowPDF", () => ({
  __esModule: true,
  default: ({ signedUrl }: { signedUrl: string | null }) => (
    <div data-testid="pdf-viewer-show-pdf">
      PDF Displayed: {signedUrl || "N/A"}
    </div>
  ),
}));

jest.mock("@/utils/PDFViewer/PDFViewerUtils", () => {
  const mockGeneratePresignedUrl = jest.fn();
  const mockIsValidPDF = jest.fn();

  return {
    __esModule: true,
    generatePresignedUrl: mockGeneratePresignedUrl,
    isValidPDF: mockIsValidPDF,
  };
});

describe("<PDFViewer />", () => {
  const {
    generatePresignedUrl,
    isValidPDF,
  } = require("@/utils/PDFViewer/PDFViewerUtils");

  afterEach(() => {
    generatePresignedUrl.mockClear();
    isValidPDF.mockClear();
  });

  // 1. Test de renderizado básico y estados iniciales
  it("se renderiza correctamente y muestra 'No file URL provided' cuando no hay fileUrl", () => {
    render(
      <PDFViewer
        fileUrl={null}
        isUploading={false}
        isPreviewLoading={false}
        setIsPreviewLoading={jest.fn()}
      />,
    );
    expect(screen.getByTestId("pdf-viewer-not-file-url")).toBeInTheDocument();
  });

  // 2. Test de renderizado condicional: fileError (mayor prioridad)
  it("muestra PDFViewerFileError cuando fileError está presente", () => {
    const errorMessage = "Invalid file type.";
    render(
      <PDFViewer
        fileUrl="http://example.com/doc.pdf"
        fileError={errorMessage}
        isUploading={false}
        isPreviewLoading={false}
        setIsPreviewLoading={jest.fn()}
      />,
    );
    expect(screen.getByTestId("pdf-viewer-file-error")).toHaveTextContent(
      `File Error: ${errorMessage}`,
    );
  });

  // 3. Test de renderizado condicional: Not a PDF
  it("muestra PDFViewerNotPDF si fileUrl no es un PDF válido", () => {
    const invalidUrl = "http://example.com/image.jpg";
    isValidPDF.mockReturnValue(false); // Simula que no es un PDF
    render(
      <PDFViewer
        fileUrl={invalidUrl}
        isUploading={false}
        isPreviewLoading={false}
        setIsPreviewLoading={jest.fn()}
      />,
    );
    expect(screen.getByTestId("pdf-viewer-not-pdf")).toHaveTextContent(
      `Not a PDF: ${invalidUrl}`,
    );
    expect(isValidPDF).toHaveBeenCalledWith(invalidUrl);
    expect(generatePresignedUrl).not.toHaveBeenCalled();
  });

  // 4. Test de renderizado condicional: Loading (isUploading)
  it("muestra PDFViewerLoading cuando isUploading es true", () => {
    isValidPDF.mockReturnValue(true);
    render(
      <PDFViewer
        fileUrl="http://example.com/test.pdf"
        isUploading={true}
        isPreviewLoading={false}
        setIsPreviewLoading={jest.fn()}
      />,
    );
    expect(screen.getByTestId("pdf-viewer-loading")).toBeInTheDocument();
  });

  // 5. Test de renderizado condicional: Loading (isPreviewLoading)
  it("muestra PDFViewerLoading cuando isPreviewLoading es true", () => {
    isValidPDF.mockReturnValue(true);
    render(
      <PDFViewer
        fileUrl="http://example.com/test.pdf"
        isUploading={false}
        isPreviewLoading={true}
        setIsPreviewLoading={jest.fn()}
      />,
    );
    expect(screen.getByTestId("pdf-viewer-loading")).toBeInTheDocument();
  });

  // 6. Test de useEffect: Flujo exitoso de generación de URL firmada
  it("llama a generatePresignedUrl y muestra PDFViewerShowPDF con la URL firmada", async () => {
    const testFileUrl = "http://example.com/valid.pdf";
    const signedUrl = "http://presigned.example.com/valid.pdf";
    const mockSetIsPreviewLoading = jest.fn();

    isValidPDF.mockReturnValue(true);
    generatePresignedUrl.mockResolvedValue(signedUrl);

    render(
      <PDFViewer
        fileUrl={testFileUrl}
        isUploading={false}
        isPreviewLoading={false}
        setIsPreviewLoading={mockSetIsPreviewLoading}
      />,
    );

    await waitFor(() => {
      expect(mockSetIsPreviewLoading).toHaveBeenCalledWith(true);
    });

    await waitFor(() => {
      expect(generatePresignedUrl).toHaveBeenCalledWith(testFileUrl);
      expect(screen.getByTestId("pdf-viewer-show-pdf")).toHaveTextContent(
        `PDF Displayed: ${signedUrl}`,
      );
      expect(mockSetIsPreviewLoading).toHaveBeenCalledWith(false);
    });
    expect(mockSetIsPreviewLoading).toHaveBeenCalledTimes(2);
  });

  // 7. Test de useEffect: Flujo de error en la generación de URL firmada
  it("llama a generatePresignedUrl y muestra PDFViewerError si falla", async () => {
    const testFileUrl = "http://example.com/failing.pdf";
    const mockSetIsPreviewLoading = jest.fn();

    isValidPDF.mockReturnValue(true);
    generatePresignedUrl.mockRejectedValue(new Error("Network error"));

    render(
      <PDFViewer
        fileUrl={testFileUrl}
        isUploading={false}
        isPreviewLoading={false}
        setIsPreviewLoading={mockSetIsPreviewLoading}
      />,
    );

    await waitFor(() => {
      expect(mockSetIsPreviewLoading).toHaveBeenCalledWith(true);
    });

    expect(mockSetIsPreviewLoading).toHaveBeenCalledTimes(2);
  });

  // 8. Test de useEffect: No se llama si fileUrl es null o no válido
  it("no llama a generatePresignedUrl si fileUrl es null", () => {
    isValidPDF.mockReturnValue(false);

    render(
      <PDFViewer
        fileUrl={null}
        isUploading={false}
        isPreviewLoading={false}
        setIsPreviewLoading={jest.fn()}
      />,
    );
    expect(generatePresignedUrl).not.toHaveBeenCalled();
    expect(isValidPDF).not.toHaveBeenCalled();
  });

  it("no llama a generatePresignedUrl si fileUrl no es un PDF válido", () => {
    const invalidUrl = "http://example.com/not-a-pdf.txt";
    isValidPDF.mockReturnValue(false);

    render(
      <PDFViewer
        fileUrl={invalidUrl}
        isUploading={false}
        isPreviewLoading={false}
        setIsPreviewLoading={jest.fn()}
      />,
    );
    expect(isValidPDF).toHaveBeenCalledWith(invalidUrl);
    expect(generatePresignedUrl).not.toHaveBeenCalled();
  });

  // 9. Test: Comportamiento cuando fileUrl cambia
  it("vuelve a generar la URL firmada cuando fileUrl cambia", async () => {
    const mockSetIsPreviewLoading = jest.fn();
    isValidPDF.mockReturnValue(true);
    generatePresignedUrl.mockResolvedValueOnce("signed-url-1");

    const { rerender } = render(
      <PDFViewer
        fileUrl="http://example.com/pdf1.pdf"
        isUploading={false}
        isPreviewLoading={false}
        setIsPreviewLoading={mockSetIsPreviewLoading}
      />,
    );

    await waitFor(() => {
      expect(generatePresignedUrl).toHaveBeenCalledWith(
        "http://example.com/pdf1.pdf",
      );
      expect(screen.getByTestId("pdf-viewer-show-pdf")).toHaveTextContent(
        "PDF Displayed: signed-url-1",
      );
    });

    generatePresignedUrl.mockClear();
    mockSetIsPreviewLoading.mockClear();

    generatePresignedUrl.mockResolvedValueOnce("signed-url-2");
    rerender(
      <PDFViewer
        fileUrl="http://example.com/pdf2.pdf"
        isUploading={false}
        isPreviewLoading={false}
        setIsPreviewLoading={mockSetIsPreviewLoading}
      />,
    );

    await waitFor(() => {
      expect(generatePresignedUrl).toHaveBeenCalledWith(
        "http://example.com/pdf2.pdf",
      );
      expect(screen.getByTestId("pdf-viewer-show-pdf")).toHaveTextContent(
        "PDF Displayed: signed-url-2",
      );
    });

    expect(generatePresignedUrl).toHaveBeenCalledTimes(1);
    expect(mockSetIsPreviewLoading).toHaveBeenCalledTimes(2);
  });
});
