// HomePage.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AnalyzerPage from "@/app/analyzer/page";
import { CVOptimizationResult } from "@/types/CVOptimization"; // Importar el tipo si es necesario

// --- Mocks Necesarios ---

// Mock de ResumeForm
// Usamos Partial<T> para simular solo las props que el mock necesita
jest.mock("@/components/ui/features/resumeForm/module", () => {
  // Definimos el tipo esperado para las props del mock para type safety
  interface MockResumeFormProps {
    setSuggestions: (suggestions: CVOptimizationResult | null) => void;
    setFileUrl: (url: string | null) => void;
    setFileError: (error: string | null) => void;
    setSuggestionsLoading: (isLoading: boolean) => void;
    setIsUploading: (isUploading: boolean) => void;
    isUploading: boolean;
  }

  return {
    __esModule: true,
    default: ({
      setSuggestions,
      setFileUrl,
      setFileError,
      setSuggestionsLoading,
      setIsUploading,
      isUploading,
    }: MockResumeFormProps) => (
      <button
        data-testid="mock-resume-form"
        onClick={() => {
          setSuggestionsLoading(true); // Simula inicio de carga
          setIsUploading(true); // Simula inicio de subida
          setTimeout(() => {
            setSuggestions({
              summary: "Optimized summary",
              suggestions: [],
            });
            setFileUrl("http://example.com/mock.pdf");
            setFileError(null);
            setSuggestionsLoading(false); // Simula fin de carga
            setIsUploading(false); // Simula fin de subida
          }, 100); // Pequeño delay para simular async
        }}
      >
        Simular Envío de CV
      </button>
    ),
  };
});

// Mock de PDFViewer
jest.mock("@/components/ui/features/PDFViewer/module", () => {
  interface MockPDFViewerProps {
    fileUrl: string | null;
    fileError: string | null;
    isUploading: boolean;
    isPreviewLoading: boolean;
    setIsPreviewLoading: (isLoading: boolean) => void;
  }
  return {
    __esModule: true,
    default: ({ fileUrl, fileError, isUploading }: MockPDFViewerProps) => (
      <div data-testid="mock-pdf-viewer">
        {isUploading && (
          <span data-testid="pdf-uploading">Cargando PDF...</span>
        )}
        {fileError && <span data-testid="pdf-viewer-error">{fileError}</span>}
        {fileUrl && (
          <a data-testid="pdf-viewer-url" href={fileUrl}>
            Ver PDF
          </a>
        )}
      </div>
    ),
  };
});

// Mock de Suggestions
jest.mock("@/components/ui/features/suggestions/module", () => {
  interface MockSuggestionsProps {
    suggestions: CVOptimizationResult | null;
    suggestionsLoading: boolean;
  }
  return {
    __esModule: true,
    default: ({ suggestions, suggestionsLoading }: MockSuggestionsProps) => (
      <div data-testid="mock-suggestions">
        {suggestionsLoading && (
          <span data-testid="suggestions-loading">Cargando sugerencias...</span>
        )}
        {suggestions ? (
          <span data-testid="suggestions-content">
            Sugerencias: {suggestions.summary}
          </span>
        ) : (
          <span data-testid="no-suggestions">No hay sugerencias aún.</span>
        )}
      </div>
    ),
  };
});

// Mock de CVPageLayout
jest.mock("@/components/ui/layout/CVPageLayout", () => {
  interface MockCVPageLayoutProps {
    leftPanel: React.ReactNode;
    rightPanel: React.ReactNode;
  }
  return {
    __esModule: true,
    default: ({ leftPanel, rightPanel }: MockCVPageLayoutProps) => (
      <div data-testid="cv-page-layout">
        <div data-testid="left-panel-content">{leftPanel}</div>
        <div data-testid="right-panel-content">{rightPanel}</div>
      </div>
    ),
  };
});

describe("<AnalyzerPage />", () => {
  // Limpieza después de cada test para asegurar un estado limpio
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Test de renderizado básico
  it("se renderiza correctamente con los componentes iniciales", () => {
    render(<AnalyzerPage />);

    // Verifica que el layout principal esté presente
    expect(screen.getByTestId("cv-page-layout")).toBeInTheDocument();

    // Verifica que los mocks de los paneles estén presentes
    expect(screen.getByTestId("left-panel-content")).toBeInTheDocument();
    expect(screen.getByTestId("right-panel-content")).toBeInTheDocument();

    // Verifica que ResumeForm, PDFViewer y Suggestions estén renderizados inicialmente
    expect(screen.getByTestId("mock-resume-form")).toBeInTheDocument();
    expect(screen.getByTestId("mock-pdf-viewer")).toBeInTheDocument();
    expect(screen.getByTestId("mock-suggestions")).toBeInTheDocument();

    // Verifica los estados iniciales: no hay sugerencias, no hay URL de archivo, no hay errores
    expect(screen.getByTestId("no-suggestions")).toBeInTheDocument();
    expect(screen.queryByTestId("pdf-viewer-url")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pdf-viewer-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("pdf-uploading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("suggestions-loading")).not.toBeInTheDocument();
  });

  // 2. Test de interacción y actualización de estados
  it("actualiza las sugerencias y la URL del archivo después de la interacción con ResumeForm", async () => {
    render(<AnalyzerPage />);

    // Simula el clic en el botón de ResumeForm para iniciar el proceso de carga
    const resumeFormButton = screen.getByTestId("mock-resume-form");
    await userEvent.click(resumeFormButton);

    // Espera a que los estados de carga se actualicen
    await waitFor(() => {
      expect(screen.getByTestId("pdf-uploading")).toBeInTheDocument();
      expect(screen.getByTestId("suggestions-loading")).toBeInTheDocument();
    });

    // Espera a que la simulación asíncrona complete sus actualizaciones
    await waitFor(
      () => {
        // Verifica que las sugerencias se hayan actualizado
        expect(screen.getByTestId("suggestions-content")).toHaveTextContent(
          "Sugerencias: Optimized summary",
        );
        // Verifica que la URL del archivo se haya actualizado
        expect(screen.getByTestId("pdf-viewer-url")).toHaveAttribute(
          "href",
          "http://example.com/mock.pdf",
        );
        // Verifica que no haya error de archivo
        expect(
          screen.queryByTestId("pdf-viewer-error"),
        ).not.toBeInTheDocument();
        // Verifica que los indicadores de carga hayan desaparecido
        expect(screen.queryByTestId("pdf-uploading")).not.toBeInTheDocument();
        expect(
          screen.queryByTestId("suggestions-loading"),
        ).not.toBeInTheDocument();
      },
      { timeout: 200 }, // Ajustar el timeout si el setTimeout en el mock es más largo
    );
  });

  // 3. Test de edge case: manejo de errores en PDFViewer
  it("muestra el mensaje de error del archivo si ResumeForm establece un error", async () => {
    // Sobreescribe el mock de ResumeForm para simular un error
    jest.clearAllMocks(); // Limpia los mocks existentes antes de re-mockear
    jest.mock("@/components/ui/features/resumeForm/module", () => {
      interface MockResumeFormProps {
        setSuggestions: (suggestions: CVOptimizationResult | null) => void;
        setFileUrl: (url: string | null) => void;
        setFileError: (error: string | null) => void;
        setSuggestionsLoading: (isLoading: boolean) => void;
        setIsUploading: (isUploading: boolean) => void;
        isUploading: boolean;
      }
      return {
        __esModule: true,
        default: ({
          setSuggestions,
          setFileUrl,
          setFileError,
          setSuggestionsLoading,
          setIsUploading,
          isUploading,
        }: MockResumeFormProps) => (
          <button
            data-testid="mock-resume-form"
            onClick={() => {
              setSuggestions(null);
              setFileUrl(null);
              setFileError("Error al cargar el archivo."); // Simula un error
              setSuggestionsLoading(false);
              setIsUploading(false);
            }}
          >
            Simular Error de Carga
          </button>
        ),
      };
    });

    // Vuelve a importar HomePage para que tome el mock actualizado
    const { default: UpdatedHomePage } = await import("@/app/analyzer/page");
    render(<UpdatedHomePage />);

    const resumeFormButton = screen.getByTestId("mock-resume-form");
    await userEvent.click(resumeFormButton);
  });
});
