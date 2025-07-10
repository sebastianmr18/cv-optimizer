import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FeaturesSection from "@/components/ui/features/homePage/FeaturesSection";

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

jest.mock("lucide-react", () => ({
  CheckCircle: () => <svg data-testid="icon-check-circle" />,
  FileText: () => <svg data-testid="icon-file-text" />,
  Lightbulb: () => <svg data-testid="icon-lightbulb" />,
  Zap: () => <svg data-testid="icon-zap" />,
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({
    children,
    variant,
    className,
  }: {
    children: React.ReactNode;
    variant?: string;
    className?: string;
  }) => (
    <span
      data-testid={`mock-badge${variant ? `-${variant}` : ""}`}
      className={className}
    >
      {children}
    </span>
  ),
}));

describe("<FeaturesSection />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Test de renderizado básico y presencia de texto principal
  it("renders the main heading and subheading", () => {
    render(<FeaturesSection />);

    expect(
      screen.getByRole("heading", { name: /Funcionalidades Principales/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Herramientas potentes para optimizar tu búsqueda de empleo/i,
      ),
    ).toBeInTheDocument();
  });

  // 2. Test para la Card de "Análisis Inteligente de CV"
  it('renders the "Análisis Inteligente de CV" card with its content and badges', () => {
    render(<FeaturesSection />);

    const analysisCardTitle = screen.getByRole("heading", {
      name: /Análisis Inteligente de CV/i,
    });
    expect(analysisCardTitle).toBeInTheDocument();

    expect(screen.getByTestId("icon-lightbulb")).toBeInTheDocument();

    expect(screen.getByText(/Disponible Ahora/i)).toBeInTheDocument();
    expect(screen.getByText(/Disponible Ahora/i)).toHaveAttribute(
      "data-testid",
      "mock-badge",
    );

    expect(
      screen.getByText(
        /Nuestra IA analiza tu CV y la descripción del puesto para identificar brechas y oportunidades de mejora específicas./i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Análisis de palabras clave/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Identificación de habilidades faltantes/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sugerencias de mejora personalizadas/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Puntuación de compatibilidad/i),
    ).toBeInTheDocument();

    const checkCircles = screen.getAllByTestId("icon-check-circle");
    expect(checkCircles.length).toBe(4);
  });

  // 3. Test para la Card de "Optimización Automática"
  it('renders the "Optimización Automática" card with its content and badge', () => {
    render(<FeaturesSection />);

    const optimizationCardTitle = screen.getByRole("heading", {
      name: /Optimización Automática/i,
    });
    expect(optimizationCardTitle).toBeInTheDocument();

    expect(screen.getByTestId("icon-zap")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Generación automática de versiones optimizadas de tu CV para diferentes ofertas de trabajo./i,
      ),
    ).toBeInTheDocument();
  });

  // 4. Test para la Card de "Plantillas Profesionales"
  it('renders the "Plantillas Profesionales" card with its content and badge', () => {
    render(<FeaturesSection />);

    const templatesCardTitle = screen.getByRole("heading", {
      name: /Plantillas Profesionales/i,
    });
    expect(templatesCardTitle).toBeInTheDocument();
    expect(screen.getByTestId("icon-file-text")).toBeInTheDocument();

    const badgesProximamente = screen.getAllByText(/Próximamente/i);
    expect(badgesProximamente.length).toBe(2);

    expect(
      screen.getByText(
        /Biblioteca de plantillas de CV profesionales adaptadas a diferentes industrias y roles./i,
      ),
    ).toBeInTheDocument();
  });

  // 5. Test de la cantidad total de Cards y sus estructuras principales
  it("renders the correct number of Card components", () => {
    render(<FeaturesSection />);
    const cards = screen.getAllByTestId("mock-card");
    expect(cards.length).toBe(3);
  });
});
