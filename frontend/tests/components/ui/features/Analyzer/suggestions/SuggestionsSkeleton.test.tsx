import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SuggestionsSkeleton from "@/components/ui/features/suggestions/SuggestionsSkeleton";

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

jest.mock("@/components/ui/separator", () => ({
  Separator: () => <hr data-testid="mock-separator" />,
}));

jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div
      data-testid="mock-skeleton"
      className={className}
      style={{ width: "100px", height: "20px", backgroundColor: "lightgray" }}
    />
  ),
}));

jest.mock("lucide-react", () => ({
  Loader2: () => <svg data-testid="icon-loader2" />,
  Key: () => <svg data-testid="icon-key" />,
  FileText: () => <svg data-testid="icon-file-text" />,
  User: () => <svg data-testid="icon-user" />,
  Briefcase: () => <svg data-testid="icon-briefcase" />,
  AlertTriangle: () => <svg data-testid="icon-alert-triangle" />,
  Star: () => <svg data-testid="icon-star" />,
  Target: () => <svg data-testid="icon-target" />,
  Lightbulb: () => <svg data-testid="icon-lightbulb" />,
}));

describe("<SuggestionsSkeleton />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Test de renderizado básico y presencia de elementos principales
  it("renders correctly and displays primary loading elements", () => {
    render(<SuggestionsSkeleton />);

    expect(
      screen.getByRole("heading", { name: /Analizando CV.../i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Procesando tu CV y generando sugerencias personalizadas/i,
      ),
    ).toBeInTheDocument();

    const skeletons = screen.getAllByTestId("mock-skeleton");
    expect(skeletons.length).toBeGreaterThan(0); // Ensure at least some skeletons are rendered

    expect(screen.getByTestId("mock-separator")).toBeInTheDocument();
  });

  // 2. Test para la estructura de la tarjeta de "Match Score"
  it("renders the Match Score Card with its skeleton elements", () => {
    render(<SuggestionsSkeleton />);

    const matchScoreCard = screen.getAllByTestId("mock-card")[0];
    expect(matchScoreCard).toBeInTheDocument();
    expect(matchScoreCard).toHaveClass("from-blue-50");

    const skeletonsInMatchScoreCard = matchScoreCard.querySelectorAll(
      '[data-testid="mock-skeleton"]',
    );
    expect(skeletonsInMatchScoreCard.length).toBeGreaterThanOrEqual(3);
    expect(
      matchScoreCard.querySelector('[data-testid="icon-loader2"]'),
    ).toBeInTheDocument();
  });

  // 3. Test para la estructura de la tarjeta de "Resumen"
  it("renders the Summary Card with its skeleton elements", () => {
    render(<SuggestionsSkeleton />);

    const summaryCardHeader = screen
      .getByTestId("icon-lightbulb")
      .closest('[data-testid="mock-card-header"]');
    expect(summaryCardHeader).toBeInTheDocument();

    const summaryCard = summaryCardHeader?.closest('[data-testid="mock-card"]');
    expect(summaryCard).toBeInTheDocument();

    const skeletonsInSummaryCard = summaryCard?.querySelectorAll(
      '[data-testid="mock-skeleton"]',
    );
    expect(skeletonsInSummaryCard?.length).toBeGreaterThanOrEqual(4);
  });

  // 4. Test para las secciones de sugerencias (grid)
  it("renders the correct number of suggestion sections with their skeletons", () => {
    render(<SuggestionsSkeleton />);

    const sectionCards = screen.getAllByTestId("mock-card").filter((card) => {
      return [
        "icon-key",
        "icon-file-text",
        "icon-user",
        "icon-briefcase",
        "icon-alert-triangle",
        "icon-star",
      ].some((iconTestId) =>
        card.querySelector(`[data-testid="${iconTestId}"]`),
      );
    });

    expect(sectionCards.length).toBe(6);

    sectionCards.forEach((card) => {
      expect(
        card.querySelector('[data-testid="mock-skeleton"]'),
      ).toBeInTheDocument();
      expect(
        card.querySelectorAll('[data-testid="mock-skeleton"]').length,
      ).toBeGreaterThanOrEqual(5);
      expect(
        card.querySelectorAll(
          '[data-testid="mock-card-content"] [data-testid="mock-skeleton"]',
        ).length,
      ).toBe(3 * 3);
    });
  });

  // 5. Test para la estructura de la tarjeta de "Recomendación Final"
  it("renders the Final Recommendation Card with its skeleton elements", () => {
    render(<SuggestionsSkeleton />);

    const finalRecommendationCardHeader = screen
      .getByTestId("icon-target")
      .closest('[data-testid="mock-card-header"]');
    expect(finalRecommendationCardHeader).toBeInTheDocument();

    const finalRecommendationCard = finalRecommendationCardHeader?.closest(
      '[data-testid="mock-card"]',
    );
    expect(finalRecommendationCard).toBeInTheDocument();

    const skeletonsInFinalRecCard = finalRecommendationCard?.querySelectorAll(
      '[data-testid="mock-skeleton"]',
    );
    expect(skeletonsInFinalRecCard?.length).toBeGreaterThanOrEqual(5);
  });
});
