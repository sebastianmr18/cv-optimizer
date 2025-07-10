import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PDFViewerNotPDF from "@/components/ui/features/PDFViewer/PDFViewerNotPDF";

jest.mock("@/components/ui/card", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="mock-card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="mock-card-content" className={className}>
      {children}
    </div>
  ),
}));

jest.mock("lucide-react", () => ({
  FileWarning: () => <svg data-testid="mock-file-warning-icon" />,
}));

describe("<PDFViewerNotPDF />", () => {
  // 1. Test de renderizado básico
  it("se renderiza correctamente con los elementos estáticos y el icono", () => {
    const mockFileUrl = "http://example.com/document.docx";
    render(<PDFViewerNotPDF fileUrl={mockFileUrl} />);

    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-content")).toBeInTheDocument();
    expect(screen.getByTestId("mock-file-warning-icon")).toBeInTheDocument();

    expect(screen.getByText("Vista previa no disponible")).toBeInTheDocument();
    expect(
      screen.getByText("Este tipo de archivo no se puede previsualizar"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "La vista previa solo está disponible para archivos PDF.",
      ),
    ).toBeInTheDocument();
  });

  // 2. Test de props: Muestra el nombre del archivo correctamente
  it("muestra el nombre del archivo extraído de la fileUrl", () => {
    const testFileUrl = "https://cdn.example.com/files/reporte_anual_2024.xlsx";
    render(<PDFViewerNotPDF fileUrl={testFileUrl} />);

    expect(screen.getByText(/Archivo:/i)).toBeInTheDocument();
    expect(screen.getByText("reporte_anual_2024.xlsx")).toBeInTheDocument();
  });

  // 3. Edge Case: fileUrl con nombre de archivo simple
  it("maneja correctamente una fileUrl con un nombre de archivo simple", () => {
    const simpleFileUrl = "my_image.png";
    render(<PDFViewerNotPDF fileUrl={simpleFileUrl} />);

    expect(screen.getByText("my_image.png")).toBeInTheDocument();
  });

  // 4. Edge Case: fileUrl con ruta compleja y múltiples barras
  it("maneja correctamente una fileUrl con una ruta compleja", () => {
    const complexFileUrl =
      "ftp://archive.org/public/docs/folder/subfolder/document%20with%20spaces.txt";
    render(<PDFViewerNotPDF fileUrl={complexFileUrl} />);

    expect(
      screen.getByText("document%20with%20spaces.txt"),
    ).toBeInTheDocument();
  });
});
