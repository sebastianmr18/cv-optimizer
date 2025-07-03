import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PDFViewerFileError from "@/components/ui/features/PDFViewer/PDFViewerFileError";

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

jest.mock("lucide-react", () => ({
  FileWarning: () => <svg data-testid="mock-file-warning-icon" />,
  AlertCircle: () => <svg data-testid="mock-alert-circle-icon" />,
}));

describe("<PDFViewerFileError />", () => {
  // 1. Test de renderizado básico
  it("se renderiza correctamente con los elementos estáticos", () => {
    render(<PDFViewerFileError fileError="Test file error message" />);

    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-content")).toBeInTheDocument();
    expect(screen.getByTestId("mock-alert")).toBeInTheDocument();
    expect(screen.getByTestId("mock-alert-description")).toBeInTheDocument();
    expect(screen.getByTestId("mock-file-warning-icon")).toBeInTheDocument();
    expect(screen.getByTestId("mock-alert-circle-icon")).toBeInTheDocument();

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

    expect(screen.getByTestId("mock-alert-description")).toHaveTextContent(
      testFileErrorMessage,
    );
  });

  // 3. Edge case: Prop 'fileError' es null
  it("renderiza correctamente cuando la prop 'fileError' es null", () => {
    render(<PDFViewerFileError fileError={null} />);

    expect(screen.getByText("Error con el archivo")).toBeInTheDocument();
    expect(
      screen.getByText("No se pudo procesar el archivo seleccionado"),
    ).toBeInTheDocument();

    expect(screen.getByTestId("mock-alert-description")).toBeEmptyDOMElement();
  });

  // 4. Edge case: Prop 'fileError' es una cadena vacía
  it("renderiza correctamente cuando la prop 'fileError' es una cadena vacía", () => {
    render(<PDFViewerFileError fileError="" />);

    expect(screen.getByText("Error con el archivo")).toBeInTheDocument();
    expect(
      screen.getByText("No se pudo procesar el archivo seleccionado"),
    ).toBeInTheDocument();

    expect(screen.getByTestId("mock-alert-description")).toBeEmptyDOMElement();
  });
});
