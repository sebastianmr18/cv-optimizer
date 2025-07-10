// Archivo: HomePage.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "@/app/page";

// Mock child components
jest.mock("@/components/ui/features/homePage/HeroSection", () =>
  jest.fn(() => <section data-testid="hero-section">Hero Section</section>),
);

jest.mock("@/components/ui/features/homePage/ProblemSection", () =>
  jest.fn(() => (
    <section data-testid="problem-section">Problem Section</section>
  )),
);

jest.mock("@/components/ui/features/homePage/SolutionSection", () =>
  jest.fn(() => (
    <section data-testid="solution-section">Solution Section</section>
  )),
);

jest.mock("@/components/ui/features/homePage/TargetAudience", () =>
  jest.fn(() => (
    <section data-testid="target-audience">Target Audience</section>
  )),
);

jest.mock("@/components/ui/features/homePage/FeaturesSection", () =>
  jest.fn(() => (
    <section data-testid="features-section">Features Section</section>
  )),
);

describe("<HomePage />", () => {
  // 1. Test de renderizado básico
  it("se monta correctamente con todos los componentes hijos", () => {
    render(<HomePage />);

    // Verificar estructura principal
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();

    // Verificar orden correcto de las secciones
    const sections = [
      "hero-section",
      "problem-section",
      "solution-section",
      "target-audience",
      "features-section",
    ];

    sections.forEach((testId) => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });

  // 2. Test de estructura del layout
  it("tiene las clases CSS correctas", () => {
    const { container } = render(<HomePage />);

    // Verificar clases del contenedor principal
    const mainElement = container.firstChild;
    expect(mainElement).toHaveClass("flex");
    expect(mainElement).toHaveClass("flex-col");
    expect(mainElement).toHaveClass("min-h-screen");
    expect(mainElement).toHaveClass("bg-white");

    // Verificar clases del main
    const contentElement = screen.getByRole("main");
    expect(contentElement).toHaveClass("flex-1");
  });

  // 3. Test de integración básica
  it("renderiza todos los componentes hijos exactamente una vez", () => {
    render(<HomePage />);

    const mocks = [
      "HeroSection",
      "ProblemSection",
      "SolutionSection",
      "TargetAudience",
      "FeaturesSection",
    ];

    mocks.forEach((componentName) => {
      expect(
        jest.requireMock(`@/components/ui/features/homePage/${componentName}`),
      ).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
