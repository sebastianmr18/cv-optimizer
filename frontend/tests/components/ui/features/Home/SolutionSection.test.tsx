// 📁 tests/components/ui/features/SolutionSection.test.tsx

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SolutionSection from "@/components/ui/features/homePage/SolutionSection";

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

jest.mock("lucide-react", () => ({
  CheckCircle: () => <svg data-testid="icon-check-circle" />,
}));

describe("<SolutionSection />", () => {
  // 1. Test de renderizado básico y presencia de textos principales
  it("renders the main solution heading and introductory paragraph", () => {
    render(<SolutionSection />);

    expect(screen.getByText(/Nuestra Solución/i)).toBeInTheDocument();
    expect(screen.getByTestId("mock-badge")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /IA que analiza y optimiza tu CV para cada oportunidad/i,
        level: 2,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /CV Optimizer utiliza inteligencia artificial avanzada para analizar tu currículum y la descripción del puesto, generando recomendaciones específicas que aumentan tus posibilidades de ser seleccionado./i,
      ),
    ).toBeInTheDocument();
  });

  // 2. Test para las características de la solución (lado izquierdo)
  it("renders the key solution features with their titles, descriptions, and CheckCircle icons", () => {
    render(<SolutionSection />);

    expect(
      screen.getByRole("heading", { name: /Análisis Inteligente/i, level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Compara tu CV con los requisitos específicos del puesto/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /Recomendaciones Personalizadas/i,
        level: 3,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sugerencias específicas para mejorar tu perfil/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Resultados Inmediatos/i, level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Obtén tu análisis en segundos, no en días/i),
    ).toBeInTheDocument();

    const checkCircles = screen.getAllByTestId("icon-check-circle");
    expect(checkCircles.length).toBeGreaterThanOrEqual(3);
  });

  // 3. Test para el proceso de 3 pasos (lado derecho)
  it("renders the 3-step process with correct titles and descriptions", () => {
    render(<SolutionSection />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Sube tu CV/i, level: 4 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Formato PDF/i)).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Pega la descripción del puesto/i,
        level: 4,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Copia y pega la oferta laboral/i),
    ).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Recibe recomendaciones/i,
        level: 4,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/IA analiza y sugiere mejoras/i),
    ).toBeInTheDocument();
  });

  // 4. Test para la cantidad total de iconos CheckCircle
  it("renders a total of 3 CheckCircle icons in the benefits list", () => {
    render(<SolutionSection />);
    const checkCircles = screen.getAllByTestId("icon-check-circle");
    expect(checkCircles).toHaveLength(3);
  });
});
