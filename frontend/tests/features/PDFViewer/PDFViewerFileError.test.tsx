// PDFViewerFileError.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PDFViewerFileError from "@/components/ui/features/PDFViewer/PDFViewerFileError";

// --- Mocks Necesarios ---
// Mock de los componentes de UI de terceros para aislar el test a PDFViewerFileError
// y evitar la necesidad de renderizar toda la complejidad de Card, Alert, etc.
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

jest.mock("@/components/ui/alert", () => ({
  Alert: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="mock-alert" className={className}>
      {children}
    </div>
  ),
  AlertDescription: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="mock-alert-description" className={className}>
      {children}
    </div>
  ),
}));

// Mock de los íconos de lucide-react
jest.mock("lucide-react", () => ({
  FileWarning: () => <svg data-testid="mock-file-warning-icon" />,
  AlertCircle: () => <svg data-testid="mock-alert-circle-icon" />,
}));

describe("<PDFViewerFileError />", () => {
  // 1. Test de renderizado básico
  it("se renderiza correctamente con los elementos estáticos", () => {
    render(<PDFViewerFileError fileError="Test file error message" />);

    // Verifica que los componentes mockeados estén presentes
    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-content")).toBeInTheDocument();
    expect(screen.getByTestId("mock-alert")).toBeInTheDocument();
    expect(screen.getByTestId("mock-alert-description")).toBeInTheDocument();
    expect(screen.getByTestId("mock-file-warning-icon")).toBeInTheDocument();
    expect(screen.getByTestId("mock-alert-circle-icon")).toBeInTheDocument();

    // Verifica los textos estáticos
    expect(screen.getByText("Error con el archivo")).toBeInTheDocument();
    expect(
      screen.getByText("No se pudo procesar el archivo seleccionado"),
    ).toBeInTheDocument();
  });

  // 2. Test de props: Renderizado del mensaje de error del archivo
  it("muestra el mensaje de error del archivo pasado por prop", () => {
    const testFileErrorMessage =
      "El archivo está corrupto o es demasiado grande.";
    render(<PDFViewerFileError fileError={testFileErrorMessage} />);

    // Verifica que el mensaje de error del archivo esté presente y visible
    expect(screen.getByTestId("mock-alert-description")).toHaveTextContent(
      testFileErrorMessage,
    );
  });

  // 3. Edge case: Prop 'fileError' es null
  it("renderiza correctamente cuando la prop 'fileError' es null", () => {
    render(<PDFViewerFileError fileError={null} />);

    // Los textos estáticos deben seguir presentes
    expect(screen.getByText("Error con el archivo")).toBeInTheDocument();
    expect(
      screen.getByText("No se pudo procesar el archivo seleccionado"),
    ).toBeInTheDocument();

    // La descripción de la alerta debe estar vacía
    expect(screen.getByTestId("mock-alert-description")).toBeEmptyDOMElement();
  });

  // 4. Edge case: Prop 'fileError' es una cadena vacía
  it("renderiza correctamente cuando la prop 'fileError' es una cadena vacía", () => {
    render(<PDFViewerFileError fileError="" />);

    // Los textos estáticos deben seguir presentes
    expect(screen.getByText("Error con el archivo")).toBeInTheDocument();
    expect(
      screen.getByText("No se pudo procesar el archivo seleccionado"),
    ).toBeInTheDocument();

    // La descripción de la alerta debe estar vacía
    expect(screen.getByTestId("mock-alert-description")).toBeEmptyDOMElement();
  });
});
