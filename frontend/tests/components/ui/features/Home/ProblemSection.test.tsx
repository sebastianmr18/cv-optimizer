// 📁 tests/components/ui/features/ProblemSection.test.tsx

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProblemSection from "@/components/ui/features/homePage/ProblemSection";

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
    <h3 data-testid="mock-card-title" className={className}>
      {children}
    </h3>
  ),
}));

jest.mock("lucide-react", () => ({
  Target: () => <svg data-testid="icon-target" />,
  Users: () => <svg data-testid="icon-users" />,
  TrendingUp: () => <svg data-testid="icon-trending-up" />,
}));

describe("<ProblemSection />", () => {
  // 1. Test de renderizado básico y presencia de texto principal
  it("renders the main heading and subheading correctly", () => {
    render(<ProblemSection />);

    expect(
      screen.getByRole("heading", {
        name: /El problema que resolvemos/i,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Encontrar trabajo en el mercado actual es más competitivo que nunca/i,
      ),
    ).toBeInTheDocument();
  });

  // 2. Test para la Card "CV Genérico"
  it('renders the "CV Genérico" card with its title, icon, and description', () => {
    render(<ProblemSection />);

    expect(
      screen.getByRole("heading", { name: /CV Genérico/i, level: 3 }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("icon-target")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Los candidatos envían el mismo CV para todas las ofertas, sin adaptarlo a los requisitos específicos./i,
      ),
    ).toBeInTheDocument();
  });

  // 3. Test para la Card "Alta Competencia"
  it('renders the "Alta Competencia" card with its title, icon, and description', () => {
    render(<ProblemSection />);

    expect(
      screen.getByRole("heading", { name: /Alta Competencia/i, level: 3 }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("icon-users")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Cientos de candidatos aplican para la misma posición, dificultando destacar entre la multitud./i,
      ),
    ).toBeInTheDocument();
  });

  // 4. Test para la Card "Baja Tasa de Respuesta"
  it('renders the "Baja Tasa de Respuesta" card with its title, icon, and description', () => {
    render(<ProblemSection />);

    expect(
      screen.getByRole("heading", {
        name: /Baja Tasa de Respuesta/i,
        level: 3,
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("icon-trending-up")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Solo el 2-3% de las aplicaciones reciben respuesta, generando frustración y pérdida de oportunidades./i,
      ),
    ).toBeInTheDocument();
  });

  // 5. Test de la cantidad total de Cards
  it("renders exactly three Card components", () => {
    render(<ProblemSection />);

    const cards = screen.getAllByTestId("mock-card");
    expect(cards).toHaveLength(3);
  });

  // 6. Test para verificar que los componentes internos de Card (Header, Content, Title) son usados
  it("each card uses mock-card-header, mock-card-title, and mock-card-content", () => {
    render(<ProblemSection />);

    expect(screen.getAllByTestId("mock-card-header")).toHaveLength(3);
    expect(screen.getAllByTestId("mock-card-title")).toHaveLength(3);
    expect(screen.getAllByTestId("mock-card-content")).toHaveLength(3);
  });
});
