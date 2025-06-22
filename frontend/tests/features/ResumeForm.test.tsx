// Archivo: ResumeForm.test.tsx
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import ResumeForm from "@/components/ui/features/ResumeForm";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock file constructo
class MockFile extends File {
  constructor(
    parts: (string | Blob | ArrayBuffer | ArrayBufferView)[],
    name: string,
    options?: FilePropertyBag,
  ) {
    super(parts, name, options);
  }
}

describe("<ResumeForm />", () => {
  const mockSetSuggestions = jest.fn();
  const mockSetFileUrl = jest.fn();
  const mockSetFileError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.post.mockReset();
  });

  // 1. Test de renderizado básico
  it("se monta correctamente con todos los elementos", () => {
    render(
      <ResumeForm
        setSuggestions={mockSetSuggestions}
        setFileUrl={mockSetFileUrl}
        setFileError={mockSetFileError}
      />,
    );

    expect(screen.getByLabelText(/Sube tu CV/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Descripción del puesto/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Generar sugerencias/i }),
    ).toBeInTheDocument();
  });

  // 2. Test de validación de formulario
  it("deshabilita el botón cuando faltan campos requeridos", () => {
    render(
      <ResumeForm
        setSuggestions={mockSetSuggestions}
        setFileUrl={mockSetFileUrl}
        setFileError={mockSetFileError}
      />,
    );

    const submitButton = screen.getByRole("button", {
      name: /Generar sugerencias/i,
    });
    expect(submitButton).toBeDisabled();
  });

  // 3. Test de validación de archivo
  it("rechaza archivos no PDF y muestra error", async () => {
    render(
      <ResumeForm
        setSuggestions={mockSetSuggestions}
        setFileUrl={mockSetFileUrl}
        setFileError={mockSetFileError}
      />,
    );

    const file = new MockFile([""], "test.png", { type: "image/png" });
    const fileInput = screen.getByLabelText(/Sube tu CV/i) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(mockSetFileError).toHaveBeenCalledWith(
      "Solo se permiten archivos PDF",
    );
    expect(mockSetFileUrl).not.toHaveBeenCalled();
  });

  // 4. Test de envío exitoso
  it("maneja el envío exitoso del formulario", async () => {
    // Mock para upload-aws
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        url: "https://s3.amazonaws.com/test/",
        fields: { key: "test.pdf" },
      },
    });

    // Mock para adapt-cv
    mockedAxios.post.mockResolvedValueOnce({
      data: { suggestions: "Test suggestions" },
    });

    // Mock para fetch (upload a S3)
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
    });

    render(
      <ResumeForm
        setSuggestions={mockSetSuggestions}
        setFileUrl={mockSetFileUrl}
        setFileError={mockSetFileError}
      />,
    );

    // Simular entrada de usuario
    const pdfFile = new MockFile([""], "test.pdf", { type: "application/pdf" });
    const fileInput = screen.getByLabelText(/Sube tu CV/i);
    const textarea = screen.getByLabelText(/Descripción del puesto/i);
    const submitButton = screen.getByRole("button", {
      name: /Generar sugerencias/i,
    });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [pdfFile] } });
      fireEvent.change(textarea, { target: { value: "Test job description" } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Verificar llamadas a API
    expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    expect(mockSetSuggestions).toHaveBeenCalledWith("Test suggestions");
    expect(mockSetFileUrl).toHaveBeenCalledWith(
      expect.stringContaining("https://s3.amazonaws.com/test/test.pdf"),
    );
  });

  // 5. Test de errores
  it("maneja errores durante la subida del archivo", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("File too large"));

    render(
      <ResumeForm
        setSuggestions={mockSetSuggestions}
        setFileUrl={mockSetFileUrl}
        setFileError={mockSetFileError}
      />,
    );

    const pdfFile = new MockFile([""], "test.pdf", { type: "application/pdf" });
    const fileInput = screen.getByLabelText(/Sube tu CV/i);

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [pdfFile] } });
    });

    await waitFor(() => {
      expect(mockSetFileError).toHaveBeenCalledWith(
        "El archivo supera el tamaño máximo permitido de 10MB.",
      );
    });
  });

  // 6. Test de estado loading
  it("muestra estado loading durante el envío", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        url: "https://s3.amazonaws.com/test/",
        fields: { key: "test.pdf" },
      },
    });
    mockedAxios.post.mockImplementationOnce(() => new Promise(() => {}));
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });

    render(
      <ResumeForm
        setSuggestions={mockSetSuggestions}
        setFileUrl={mockSetFileUrl}
        setFileError={mockSetFileError}
      />,
    );

    const pdfFile = new MockFile([""], "test.pdf", { type: "application/pdf" });
    const fileInput = screen.getByLabelText(/Sube tu CV/i);
    const textarea = screen.getByLabelText(/Descripción del puesto/i);
    const submitButton = screen.getByRole("button", {
      name: /Generar sugerencias/i,
    });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [pdfFile] } });
      fireEvent.change(textarea, { target: { value: "Test job description" } });
      fireEvent.click(submitButton);
    });

    expect(submitButton).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /Generando sugerencias.../i }),
    ).toBeInTheDocument();
  });
});
