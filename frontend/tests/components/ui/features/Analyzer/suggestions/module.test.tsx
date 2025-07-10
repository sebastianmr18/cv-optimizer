import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Suggestions from "@/components/ui/features/suggestions/module";
import type { CVOptimizationResult } from "@/types/CVOptimization";

jest.mock("@/components/ui/features/suggestions/SuggestionsSkeleton", () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid="mock-loading-skeleton">Loading Skeleton</div>;
});

jest.mock("@/components/ui/features/suggestions/SuggestionsNotFound", () => {
  // eslint-disable-next-line react/display-name
  return () => (
    <div data-testid="mock-suggestions-not-found">Suggestions Not Found</div>
  );
});

jest.mock("@/components/ui/features/suggestions/SuggestionsAnalysis", () => {
  // eslint-disable-next-line react/display-name
  return ({ suggestions }: { suggestions: CVOptimizationResult }) => (
    <div data-testid="mock-suggestions-analysis">
      Suggestions Analysis for: {JSON.stringify(suggestions.overall_score)}
    </div>
  );
});

describe("<Suggestions />", () => {
  const mockSuggestionsData: CVOptimizationResult = {
    overall_score: 85,
    summary: "Good CV",
    sections: {
      experience: { score: 90, suggestions: ["Improve descriptions"] },
      education: { score: 80, suggestions: [] },
    },
    action_items: ["Review grammar", "Add keywords"],
  };

  // 1. Test de renderizado condicional: Estado de Carga
  it("renderiza LoadingSkeleton cuando suggestionsLoading es true", () => {
    render(<Suggestions suggestions={null} suggestionsLoading={true} />);

    expect(screen.getByTestId("mock-loading-skeleton")).toBeInTheDocument();

    expect(
      screen.queryByTestId("mock-suggestions-not-found"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-suggestions-analysis"),
    ).not.toBeInTheDocument();
  });

  // 2. Test de renderizado condicional: Datos no encontrados/ausentes
  it("renderiza SuggestionsNotFound cuando suggestionsLoading es false y suggestions es null", () => {
    render(<Suggestions suggestions={null} suggestionsLoading={false} />);

    expect(
      screen.getByTestId("mock-suggestions-not-found"),
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId("mock-loading-skeleton"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-suggestions-analysis"),
    ).not.toBeInTheDocument();
  });

  // 3. Test de renderizado condicional: Datos presentes
  it("renderiza SuggestionsAnalysis y le pasa las sugerencias cuando los datos están presentes", () => {
    render(
      <Suggestions
        suggestions={mockSuggestionsData}
        suggestionsLoading={false}
      />,
    );

    const suggestionsAnalysisMock = screen.getByTestId(
      "mock-suggestions-analysis",
    );
    expect(suggestionsAnalysisMock).toBeInTheDocument();

    expect(suggestionsAnalysisMock).toHaveTextContent(
      `Suggestions Analysis for: ${JSON.stringify(mockSuggestionsData.overall_score)}`,
    );

    expect(
      screen.queryByTestId("mock-loading-skeleton"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-suggestions-not-found"),
    ).not.toBeInTheDocument();
  });

  // 4. Edge case: Ambos flags son true (prioridad de loading)
  it("prioriza LoadingSkeleton si suggestionsLoading es true, incluso si suggestions también tiene datos", () => {
    render(
      <Suggestions
        suggestions={mockSuggestionsData}
        suggestionsLoading={true}
      />,
    );

    expect(screen.getByTestId("mock-loading-skeleton")).toBeInTheDocument();

    expect(
      screen.queryByTestId("mock-suggestions-analysis"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-suggestions-not-found"),
    ).not.toBeInTheDocument();
  });
});
