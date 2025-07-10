// 📁 tests/components/ui/sections/TargetAudience.test.tsx

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TargetAudience from "@/components/ui/features/homePage/TargetAudience";

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

describe("<TargetAudience />", () => {
  // 1. Test de renderizado básico y presencia de textos principales
  it("renders the main heading and subheading correctly", () => {
    render(<TargetAudience />);

    expect(
      screen.getByRole("heading", {
        name: /¿Para quién es CV Optimizer?/i,
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Diseñado para profesionales que buscan maximizar sus oportunidades laborales/i,
      ),
    ).toBeInTheDocument();
  });

  // 2. Test para la Card "Profesionales en Búsqueda"
  it('renders the "Profesionales en Búsqueda" card with its title, icon, and description', () => {
    render(<TargetAudience />);

    expect(
      screen.getByRole("heading", {
        name: /Profesionales en Búsqueda/i,
        level: 3,
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("icon-users")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Profesionales activos que buscan nuevas oportunidades y quieren destacar en cada aplicación./i,
      ),
    ).toBeInTheDocument();
  });

  // 3. Test para la Card "Recién Graduados"
  it('renders the "Recién Graduados" card with its title, icon, and description', () => {
    render(<TargetAudience />);

    expect(
      screen.getByRole("heading", { name: /Recién Graduados/i, level: 3 }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("icon-trending-up")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Estudiantes y recién graduados que buscan su primera oportunidad profesional en el mercado laboral./i,
      ),
    ).toBeInTheDocument();
  });

  // 4. Test para la Card "Cambio de Carrera"
  it('renders the "Cambio de Carrera" card with its title, icon, and description', () => {
    render(<TargetAudience />);

    expect(
      screen.getByRole("heading", { name: /Cambio de Carrera/i, level: 3 }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("icon-target")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Profesionales que buscan transicionar a nuevas industrias o roles y necesitan adaptar su perfil./i,
      ),
    ).toBeInTheDocument();
  });

  // 5. Test de la cantidad total de Cards
  it("renders exactly three Card components", () => {
    render(<TargetAudience />);
    const cards = screen.getAllByTestId("mock-card");
    expect(cards).toHaveLength(3);
  });

  // 6. Test para verificar que las cards tienen las clases de transición/hover
  it("cards have the expected border transition classes", () => {
    render(<TargetAudience />);
    const cards = screen.getAllByTestId("mock-card");
    cards.forEach((card) => {
      expect(card).toHaveClass("border-green-200");
      expect(card).toHaveClass("hover:border-green-400");
      expect(card).toHaveClass("transition-colors");
    });
  });
});
