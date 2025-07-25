import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PDFViewerError from "@/components/ui/features/PDFViewer/PDFViewerError";

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
  AlertCircle: () => <svg data-testid="mock-alert-circle-icon" />,
}));

describe("<PDFViewerError />", () => {
  // 1. Test de renderizado básico
  it("se renderiza correctamente con los elementos estáticos", () => {
    render(<PDFViewerError error="Test error message" />);

    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-content")).toBeInTheDocument();
    expect(screen.getByTestId("mock-alert")).toBeInTheDocument();
    expect(screen.getByTestId("mock-alert-description")).toBeInTheDocument();

    expect(
      screen.getByText("Error al cargar el documento"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("No se pudo generar la vista previa"),
    ).toBeInTheDocument();
  });

  // 2. Test de props: Renderizado del mensaje de error
  it("muestra el mensaje de error pasado por prop", () => {
    const testErrorMessage = "This is a custom error message for testing.";
    render(<PDFViewerError error={testErrorMessage} />);

    expect(screen.getByTestId("mock-alert-description")).toHaveTextContent(
      testErrorMessage,
    );
  });

  // 3. Edge case: Prop 'error' es null
  it("renderiza correctamente cuando la prop 'error' es null", () => {
    render(<PDFViewerError error={null} />);

    expect(
      screen.getByText("Error al cargar el documento"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("No se pudo generar la vista previa"),
    ).toBeInTheDocument();

    expect(screen.getByTestId("mock-alert-description")).toBeEmptyDOMElement();
  });

  // 4. Edge case: Prop 'error' es una cadena vacía
  it("renderiza correctamente cuando la prop 'error' es una cadena vacía", () => {
    render(<PDFViewerError error="" />);

    expect(
      screen.getByText("Error al cargar el documento"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("No se pudo generar la vista previa"),
    ).toBeInTheDocument();

    expect(screen.getByTestId("mock-alert-description")).toBeEmptyDOMElement();
  });
});
