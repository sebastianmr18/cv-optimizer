import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PDFViewerShowPDF from "@/components/ui/features/PDFViewer/PDFViewerShowPDF";

jest.mock("@/components/ui/accordion", () => ({
  Accordion: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    type: string;
    collapsible: boolean;
    className: string;
    defaultValue: string;
  }) => (
    <div data-testid="mock-accordion" {...props}>
      {children}
    </div>
  ),
  AccordionItem: ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: string;
  }) => <div data-testid={`mock-accordion-item-${value}`}>{children}</div>,
  AccordionTrigger: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <button data-testid="mock-accordion-trigger" className={className}>
      {children}
    </button>
  ),
  AccordionContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="mock-accordion-content" className={className}>
      {children}
    </div>
  ),
}));

jest.mock("lucide-react", () => ({
  FileText: () => <svg data-testid="mock-file-text-icon" />,
}));

describe("<PDFViewerShowPDF />", () => {
  // 1. Test de renderizado básico
  it("se renderiza correctamente con los elementos estáticos y el icono", () => {
    render(<PDFViewerShowPDF signedUrl={null} />);

    expect(screen.getByTestId("mock-accordion")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-accordion-item-item-1"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-accordion-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("mock-accordion-content")).toBeInTheDocument();
    expect(screen.getByTestId("mock-file-text-icon")).toBeInTheDocument();

    expect(screen.getByText("Vista Previa del Documento")).toBeInTheDocument();
    expect(screen.getByText("Cargando documento...")).toBeInTheDocument();
  });

  // 2. Test de props: Muestra el iframe con la URL firmada
  it("muestra el iframe con la src correcta cuando signedUrl está presente", () => {
    const mockSignedUrl = "https://example.com/signed-pdf-url.pdf";
    render(<PDFViewerShowPDF signedUrl={mockSignedUrl} />);

    const iframe = screen
      .getByTestId("mock-accordion-content")
      .querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("id", "pdf-viewer");
    expect(iframe).toHaveAttribute("src", mockSignedUrl);
    expect(iframe).toHaveAttribute("loading", "lazy");

    expect(screen.queryByText("Cargando documento...")).not.toBeInTheDocument();
  });

  // 3. Edge Case: signedUrl es null, muestra el mensaje de carga
  it("muestra el mensaje de 'Cargando documento...' cuando signedUrl es null", () => {
    render(<PDFViewerShowPDF signedUrl={null} />);

    expect(screen.getByText("Cargando documento...")).toBeInTheDocument();

    expect(
      screen.queryByTestId("mock-accordion-content").querySelector("iframe"),
    ).not.toBeInTheDocument();
  });

  // 4. Interacción: El acordeón puede ser colapsado y expandido
  it("el trigger del acordeón es clickeable", () => {
    const mockSignedUrl = "https://example.com/signed.pdf";
    render(<PDFViewerShowPDF signedUrl={mockSignedUrl} />);

    const triggerButton = screen.getByRole("button", {
      name: /Vista Previa del Documento/i,
    });
    expect(triggerButton).toBeInTheDocument();

    fireEvent.click(triggerButton);
  });
});
