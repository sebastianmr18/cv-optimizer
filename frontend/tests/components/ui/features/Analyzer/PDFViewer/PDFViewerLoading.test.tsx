// PDFViewerLoading.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PDFViewerLoading from "@/components/ui/features/PDFViewer/PDFViewerLoading";

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

jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div data-testid="mock-skeleton" className={className}></div>
  ),
}));

jest.mock("lucide-react", () => ({
  Loader2: () => <svg data-testid="mock-loader-icon" />,
}));

describe("<PDFViewerLoading />", () => {
  // 1. Test de renderizado básico
  it("se renderiza correctamente con todos los elementos de carga", () => {
    render(<PDFViewerLoading />);

    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-content")).toBeInTheDocument();
    expect(screen.getByTestId("mock-loader-icon")).toBeInTheDocument();

    expect(screen.getAllByTestId("mock-skeleton").length).toBeGreaterThan(0);

    expect(screen.getByText("Cargando documento")).toBeInTheDocument();
    expect(
      screen.getByText("Preparando la vista previa del PDF..."),
    ).toBeInTheDocument();
  });

  // 2. Test de accesibilidad (opcional pero buena práctica para texto estático)
  it("tiene un encabezado y una descripción clara para la carga", () => {
    render(<PDFViewerLoading />);

    const heading = screen.getByRole("heading", {
      name: /Cargando documento/i,
      level: 3,
    });
    expect(heading).toBeInTheDocument();

    expect(
      screen.getByText("Preparando la vista previa del PDF..."),
    ).toBeInTheDocument();
  });
});
