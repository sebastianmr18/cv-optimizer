import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import SuggestionsAnalysis from "@/components/ui/features/suggestions/SuggestionsAnalysis";
import type { CVOptimizationResult } from "@/types/CVOptimization";

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
  CardHeader: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="mock-card-header" className={className}>
      {children}
    </div>
  ),
  CardTitle: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <h4 data-testid="mock-card-title" className={className}>
      {children}
    </h4>
  ),
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
    className,
    size,
    variant,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    size?: string;
    variant?: string;
  }) => (
    <button data-testid="mock-button" onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <span data-testid="mock-badge" className={className}>
      {children}
    </span>
  ),
}));

jest.mock("@/components/ui/progress", () => ({
  Progress: ({
    value,
    className,
    style,
  }: {
    value: number;
    className?: string;
    style?: React.CSSProperties;
  }) => (
    <div data-testid="mock-progress" style={style}>
      Value: {value}
    </div>
  ),
}));

jest.mock("@/components/ui/separator", () => ({
  Separator: () => <hr data-testid="mock-separator" />,
}));

jest.mock("lucide-react", () => ({
  Copy: () => <svg data-testid="icon-copy" />,
  CheckCircle: () => <svg data-testid="icon-check-circle" />,
  Lightbulb: () => <svg data-testid="icon-lightbulb" />,
  Target: () => <svg data-testid="icon-target" />,
  TrendingUp: () => <svg data-testid="icon-trending-up" />,
}));

jest.mock("@/utils/processCV", () => {
  return {
    __esModule: true,
    processCVOptimization: jest.fn(),
  };
});

jest.mock("@/utils/suggestions/suggestionsUtils", () => {
  return {
    __esModule: true,
    getMatchScoreColor: jest.fn(),
    getSectionConfig: jest.fn(),
    getProgressColor: jest.fn(),
  };
});

const mockWriteText = jest.fn();
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: mockWriteText,
  },
  writable: true,
});

jest.useFakeTimers();

describe("<SuggestionsAnalysis />", () => {
  const { processCVOptimization } = require("@/utils/processCV");
  const {
    getMatchScoreColor,
    getSectionConfig,
    getProgressColor,
  } = require("@/utils/suggestions/suggestionsUtils");

  const baseMockSuggestions: CVOptimizationResult = {
    overall_score: 85,
    matchScore: 75,
    summary: "Tu CV es bueno, pero hay áreas de mejora.",
    sections: {
      experience: {
        score: 90,
        suggestions: [
          "Detalla más tus logros con métricas.",
          "Usa verbos de acción fuertes.",
        ],
      },
      skills: {
        score: 70,
        suggestions: [
          "Añade habilidades blandas relevantes.",
          "Enumera tecnologías clave.",
        ],
      },
      education: {
        score: 95,
        suggestions: [],
      },
    },
    action_items: ["Revisar gramática", "Añadir palabras clave del puesto"],
    finalRecommendation:
      "Considera ajustar la sección de habilidades a la descripción del puesto.",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();

    processCVOptimization.mockReturnValue([
      {
        type: "experience",
        title: "Experiencia",
        items: baseMockSuggestions.sections.experience.suggestions,
      },
      {
        type: "skills",
        title: "Habilidades",
        items: baseMockSuggestions.sections.skills.suggestions,
      },
      {
        type: "education",
        title: "Educación",
        items: baseMockSuggestions.sections.education.suggestions,
      },
    ]);
    getMatchScoreColor.mockImplementation(
      (score: number) => `text-score-${score}`,
    );
    getProgressColor.mockImplementation(
      (score: number) => `progress-color-${score}`,
    );
    getSectionConfig.mockImplementation((type: string) => {
      switch (type) {
        case "experience":
          return {
            icon: () => <svg data-testid="icon-briefcase" />,
            color: "card-exp",
            badgeColor: "badge-exp",
          };
        case "skills":
          return {
            icon: () => <svg data-testid="icon-zap" />,
            color: "card-skills",
            badgeColor: "badge-skills",
          };
        case "education":
          return {
            icon: () => <svg data-testid="icon-book" />,
            color: "card-edu",
            badgeColor: "badge-edu",
          };
        default:
          return {
            icon: () => <svg data-testid="icon-default" />,
            color: "",
            badgeColor: "",
          };
      }
    });

    mockWriteText.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  // 1. Test de renderizado básico con datos completos
  it("renderiza correctamente todos los elementos con datos completos", () => {
    render(<SuggestionsAnalysis suggestions={baseMockSuggestions} />);

    expect(
      screen.getByRole("heading", { name: /Análisis de CV/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "💡 Haz clic en el icono de copiar para guardar una sugerencia específica",
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("Puntuación de Coincidencia")).toBeInTheDocument();
    expect(
      screen.getByText("Compatibilidad entre tu CV y la oferta de empleo"),
    ).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByTestId("mock-progress")).toBeInTheDocument();
    expect(getMatchScoreColor).toHaveBeenCalledWith(75);
    expect(getProgressColor).toHaveBeenCalledWith(75);

    expect(screen.getByText("Resumen del Análisis")).toBeInTheDocument();
    expect(screen.getByText(baseMockSuggestions.summary!)).toBeInTheDocument();

    expect(screen.getByText("Experiencia")).toBeInTheDocument();
    expect(screen.getByText("Habilidades")).toBeInTheDocument();
    expect(screen.getByText("Educación")).toBeInTheDocument();

    expect(
      screen.getByText("Detalla más tus logros con métricas."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Usa verbos de acción fuertes."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Añade habilidades blandas relevantes."),
    ).toBeInTheDocument();
    expect(screen.getByText("Enumera tecnologías clave.")).toBeInTheDocument();

    expect(screen.getByTestId("icon-briefcase")).toBeInTheDocument();

    expect(screen.getByText("Recomendación Final")).toBeInTheDocument();
    expect(
      screen.getByText(baseMockSuggestions.finalRecommendation!),
    ).toBeInTheDocument();

    expect(screen.getByTestId("mock-separator")).toBeInTheDocument();

    expect(screen.getAllByTestId("icon-copy").length).toBeGreaterThan(0);
    expect(screen.queryByTestId("icon-check-circle")).not.toBeInTheDocument();
  });

  // 2. Test de props: Renderizado condicional de Summary
  it("no renderiza la sección de resumen si suggestions.summary es null", () => {
    const suggestionsWithoutSummary = { ...baseMockSuggestions, summary: null };
    render(<SuggestionsAnalysis suggestions={suggestionsWithoutSummary} />);

    expect(screen.queryByText("Resumen del Análisis")).not.toBeInTheDocument();
    expect(
      screen.queryByText(baseMockSuggestions.summary!),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("icon-lightbulb")).not.toBeInTheDocument();
  });

  it("no renderiza la sección de resumen si suggestions.summary es una cadena vacía", () => {
    const suggestionsWithoutSummary = { ...baseMockSuggestions, summary: "" };
    render(<SuggestionsAnalysis suggestions={suggestionsWithoutSummary} />);

    expect(screen.queryByText("Resumen del Análisis")).not.toBeInTheDocument();
    expect(
      screen.queryByText(baseMockSuggestions.summary!),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("icon-lightbulb")).not.toBeInTheDocument();
  });

  // 3. Test de props: Renderizado condicional de Final Recommendation
  it("no renderiza la sección de recomendación final si suggestions.finalRecommendation es null", () => {
    const suggestionsWithoutFinalRec = {
      ...baseMockSuggestions,
      finalRecommendation: null,
    };
    render(<SuggestionsAnalysis suggestions={suggestionsWithoutFinalRec} />);

    expect(screen.queryByText("Recomendación Final")).not.toBeInTheDocument();
    expect(screen.queryByTestId("icon-target")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-separator")).not.toBeInTheDocument();
  });

  it("no renderiza la sección de recomendación final si suggestions.finalRecommendation es una cadena vacía", () => {
    const suggestionsWithoutFinalRec = {
      ...baseMockSuggestions,
      finalRecommendation: "",
    };
    render(<SuggestionsAnalysis suggestions={suggestionsWithoutFinalRec} />);

    expect(screen.queryByText("Recomendación Final")).not.toBeInTheDocument();
    expect(screen.queryByTestId("icon-target")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-separator")).not.toBeInTheDocument();
  });

  // 4. Test de interacción: Copiar al portapapeles y cambio de icono
  it("copia el texto de la sugerencia al portapapeles y muestra el icono de éxito temporalmente", async () => {
    render(<SuggestionsAnalysis suggestions={baseMockSuggestions} />);

    const suggestionText = "Detalla más tus logros con métricas.";
    const copyButton = screen.getAllByTestId("mock-button")[0];
    expect(
      copyButton.querySelector("[data-testid='icon-copy']"),
    ).toBeInTheDocument();
    expect(
      copyButton.querySelector("[data-testid='icon-check-circle']"),
    ).not.toBeInTheDocument();

    fireEvent.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith(suggestionText);

    await waitFor(() => {
      expect(
        copyButton.querySelector("[data-testid='icon-check-circle']"),
      ).toBeInTheDocument();
      expect(
        copyButton.querySelector("[data-testid='icon-copy']"),
      ).not.toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(
        copyButton.querySelector("[data-testid='icon-copy']"),
      ).toBeInTheDocument();
      expect(
        copyButton.querySelector("[data-testid='icon-check-circle']"),
      ).not.toBeInTheDocument();
    });
  });

  it("copia el texto de la recomendación final al portapapeles y muestra el icono de éxito", async () => {
    render(<SuggestionsAnalysis suggestions={baseMockSuggestions} />);

    const finalRecommendationText = baseMockSuggestions.finalRecommendation!;
    const copyButton = screen
      .getAllByTestId("mock-button")
      .find((btn) =>
        btn
          .closest('[data-testid="mock-card-header"]')
          ?.querySelector('[data-testid="icon-target"]'),
      );

    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton!);

    expect(mockWriteText).toHaveBeenCalledWith(finalRecommendationText);

    await waitFor(() => {
      expect(
        copyButton!.querySelector("[data-testid='icon-check-circle']"),
      ).toBeInTheDocument();
      expect(
        copyButton!.querySelector("[data-testid='icon-copy']"),
      ).not.toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(
        copyButton!.querySelector("[data-testid='icon-copy']"),
      ).toBeInTheDocument();
      expect(
        copyButton!.querySelector("[data-testid='icon-check-circle']"),
      ).not.toBeInTheDocument();
    });
  });

  // 5. Edge case: Sección con 0 sugerencias
  it("muestra el número correcto de sugerencias para una sección sin ítems", () => {
    render(<SuggestionsAnalysis suggestions={baseMockSuggestions} />);

    const educationCard = screen
      .getAllByTestId("mock-card")
      .find((card) =>
        card.querySelector("h4")?.textContent?.includes("Educación"),
      );
    expect(educationCard).toBeInTheDocument();
    expect(
      educationCard?.querySelector('[data-testid="mock-badge"]'),
    ).toHaveTextContent("0");

    const educationContent = educationCard?.querySelector(
      '[data-testid="mock-card-content"]',
    );
    expect(educationContent).toBeEmptyDOMElement();
  });

  // 6. Test de integración con funciones de utilidad
  it("llama a las funciones de utilidad con los argumentos correctos", () => {
    render(<SuggestionsAnalysis suggestions={baseMockSuggestions} />);

    expect(getMatchScoreColor).toHaveBeenCalledWith(
      baseMockSuggestions.matchScore,
    );
    expect(getProgressColor).toHaveBeenCalledWith(
      baseMockSuggestions.matchScore,
    );

    expect(processCVOptimization).toHaveBeenCalledWith(baseMockSuggestions);

    expect(getSectionConfig).toHaveBeenCalledWith("experience");
    expect(getSectionConfig).toHaveBeenCalledWith("skills");
    expect(getSectionConfig).toHaveBeenCalledWith("education");

    expect(screen.getByTestId("icon-briefcase")).toBeInTheDocument();
    expect(screen.getByTestId("icon-zap")).toBeInTheDocument();
    expect(screen.getByTestId("icon-book")).toBeInTheDocument();
  });
});
