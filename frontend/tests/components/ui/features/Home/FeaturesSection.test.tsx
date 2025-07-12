import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FeaturesSection from "@/components/ui/features/homePage/FeaturesSection";
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => (
      <div className={className} data-testid="mock-motion-div">
        {children}
      </div>
    ),
    h2: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => (
      <h2 className={className} data-testid="mock-motion-h2">
        {children}
      </h2>
    ),
    p: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => (
      <p className={className} data-testid="mock-motion-p">
        {children}
      </p>
    ),
    span: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => (
      <span className={className} data-testid="mock-motion-span">
        {children}
      </span>
    ),
    h3: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => (
      <h3 className={className} data-testid="mock-motion-h3">
        {children}
      </h3>
    ),
  },
}));

jest.mock("lucide-react", () => ({
  CheckCircle: () => <svg data-testid="icon-check-circle" />,
  FileText: () => <svg data-testid="icon-file-text" />,
  Lightbulb: () => <svg data-testid="icon-lightbulb" />,
  Zap: () => <svg data-testid="icon-zap" />,
  ArrowRight: () => <svg data-testid="icon-arrow-right" />,
  Sparkles: () => <svg data-testid="icon-sparkles" />,
}));

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

jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    className,
    size,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    size?: string;
    [key: string]: any;
  }) => (
    <button className={className} data-size={size} {...props}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({
    children,
    className,
    variant,
  }: {
    children: React.ReactNode;
    className?: string;
    variant?: string;
  }) => (
    <span data-testid="mock-badge" data-variant={variant} className={className}>
      {children}
    </span>
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("<FeaturesSection />", () => {
  // 1. Test de renderizado básico y elementos principales
  it('renders the main heading, subheading, and "Herramientas Potentes" badge', () => {
    render(<FeaturesSection />);

    expect(screen.getByText("Herramientas Potentes")).toBeInTheDocument();
    expect(screen.getByTestId("icon-sparkles")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Funcionalidades Principales/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Herramientas potentes para optimizar tu búsqueda de empleo/i,
      ),
    ).toBeInTheDocument();
  });

  // 2. Tests para la tarjeta principal de "Análisis Inteligente de CV"
  describe('Main Feature Card: "Análisis Inteligente de CV"', () => {
    it("renders the main feature card title and description", () => {
      render(<FeaturesSection />);
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: /Análisis Inteligente de CV/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Nuestra IA analiza tu CV y la descripción del puesto para identificar brechas y oportunidades de mejora específicas./i,
        ),
      ).toBeInTheDocument();
      expect(screen.getByTestId("icon-lightbulb")).toBeInTheDocument();
      expect(screen.getByText("Disponible Ahora")).toBeInTheDocument();
    });

    it("renders all four sub-features within the main card", () => {
      render(<FeaturesSection />);
      const subFeatures = [
        "Análisis de palabras clave",
        "Identificación de habilidades faltantes",
        "Sugerencias de mejora personalizadas",
        "Puntuación de compatibilidad",
      ];
      subFeatures.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
        expect(
          screen.getAllByTestId("icon-check-circle").length,
        ).toBeGreaterThanOrEqual(subFeatures.length);
      });
      expect(screen.getAllByTestId("icon-check-circle")).toHaveLength(
        subFeatures.length,
      );
    });

    it('renders the "Probar ahora" button with correct link', () => {
      render(<FeaturesSection />);
      const testButton = screen.getByRole("link", { name: /Probar ahora/i });
      expect(testButton).toBeInTheDocument();
      expect(testButton).toHaveAttribute("href", "/analyzer");
      expect(screen.getByTestId("icon-arrow-right")).toBeInTheDocument();
    });
  });

  // 3. Tests para las tarjetas de "Próximamente"
  describe("Coming Soon Cards", () => {
    it('renders the "Optimización Automática" card correctly', () => {
      render(<FeaturesSection />);
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: /Optimización Automática/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Generación automática de versiones optimizadas de tu CV para diferentes ofertas de trabajo./i,
        ),
      ).toBeInTheDocument();
      expect(screen.getByTestId("icon-zap")).toBeInTheDocument();
      expect(screen.getAllByText("Próximamente")[0]).toBeInTheDocument();
    });

    it('renders the "Plantillas Profesionales" card correctly', () => {
      render(<FeaturesSection />);
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: /Plantillas Profesionales/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Biblioteca de plantillas de CV profesionales adaptadas a diferentes industrias y roles./i,
        ),
      ).toBeInTheDocument();
      expect(screen.getByTestId("icon-file-text")).toBeInTheDocument();
      const comingSoonBadges = screen.getAllByText("Próximamente");
      expect(comingSoonBadges.length).toBeGreaterThanOrEqual(2);
    });
  });
});
