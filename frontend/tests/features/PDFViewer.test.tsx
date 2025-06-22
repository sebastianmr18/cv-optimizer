import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PDFViewer from "@/components/ui/features/PDFViewer";

global.fetch = jest.fn();

describe("PDFViewer component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("muestra mensaje cuando fileUrl es null", () => {
    render(<PDFViewer fileUrl={null} fileError={null} />);
    expect(
      screen.getByText("No se ha cargado ningún archivo."),
    ).toBeInTheDocument();
  });

  it("muestra error cuando fileError es proporcionado", () => {
    render(<PDFViewer fileUrl="test.pdf" fileError="Error en archivo" />);
    expect(screen.getByText("Error con el archivo")).toBeInTheDocument();
    expect(screen.getByText("Error en archivo")).toBeInTheDocument();
  });

  it("muestra advertencia cuando el tipo de archivo no es PDF ni DOCX", () => {
    render(
      <PDFViewer fileUrl="https://domain.com/image.png" fileError={null} />,
    );
    expect(
      screen.getByText(
        "La vista previa solo está disponible para archivos PDF o DOCX.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("image.png")).toBeInTheDocument();
  });

  it("muestra mensaje de carga cuando es un PDF válido y fetch está en progreso", async () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(
      <PDFViewer fileUrl="https://domain.com/file.pdf" fileError={null} />,
    );
    expect(
      screen.getByText("Cargando vista previa del PDF..."),
    ).toBeInTheDocument();
  });

  it("muestra el error si la solicitud fetch falla", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });

    render(
      <PDFViewer fileUrl="https://domain.com/file.pdf" fileError={null} />,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Hubo un error al generar el enlace del PDF."),
      ).toBeInTheDocument();
    });
  });

  it("muestra el iframe cuando la URL firmada es generada correctamente", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ signedUrl: "https://signed-url.com/document.pdf" }),
    });

    render(
      <PDFViewer fileUrl="https://domain.com/file.pdf" fileError={null} />,
    );
    await waitFor(() => {
      expect(
        screen.getByText("Vista Previa del Documento"),
      ).toBeInTheDocument();
      expect(screen.getByTitle("Vista previa del PDF")).toHaveAttribute(
        "src",
        "https://signed-url.com/document.pdf",
      );
    });
  });
});
