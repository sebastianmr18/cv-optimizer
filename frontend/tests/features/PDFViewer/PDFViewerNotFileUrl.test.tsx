import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PDFViewerNotFileUrl from "@/components/ui/features/PDFViewer/PDFViewerNotFileUrl";

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
  Upload: () => <svg data-testid="mock-upload-icon" />,
}));

describe("<PDFViewerNotFileUrl />", () => {
  // 1. Test de renderizado básico
  it("se renderiza correctamente con todos los elementos esperados", () => {
    render(<PDFViewerNotFileUrl />);

    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-content")).toBeInTheDocument();
    expect(screen.getByTestId("mock-upload-icon")).toBeInTheDocument();

    expect(screen.getByText("No hay archivo seleccionado")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Selecciona un archivo PDF para ver su vista previa aquí",
      ),
    ).toBeInTheDocument();
  });

  // 2. Test de accesibilidad (opcional pero buena práctica para texto estático)
  it("tiene un encabezado y una descripción clara para el estado de no archivo", () => {
    render(<PDFViewerNotFileUrl />);

    const heading = screen.getByRole("heading", {
      name: /No hay archivo seleccionado/i,
      level: 3,
    });
    expect(heading).toBeInTheDocument();

    expect(
      screen.getByText(
        "Selecciona un archivo PDF para ver su vista previa aquí",
      ),
    ).toBeInTheDocument();
  });
});
