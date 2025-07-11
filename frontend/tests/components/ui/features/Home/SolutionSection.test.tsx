// 📁 tests/components/sections/SolutionSection.test.tsx

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SolutionSection from "@/components/ui/features/homePage/SolutionSection"; // Adjust path as necessary

// --- Mocks Necesarios ---

// Mock de `framer-motion`. Es fundamental para evitar errores de animación en el entorno de pruebas.
// Reemplaza cada componente `motion.*` con un div/elemento HTML simple que renderiza sus hijos.
// Se añaden `data-testid` para poder verificar que los mocks están en uso.
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
    h4: ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => (
      <h4 className={className} data-testid="mock-motion-h4">
        {children}
      </h4>
    ),
  },
}));

// Mock de los iconos de lucide-react.
// Cada icono se reemplaza por un simple SVG con un `data-testid` para verificar su presencia.
jest.mock("lucide-react", () => ({
  CheckCircle: () => <svg data-testid="icon-check-circle" />,
  Brain: () => <svg data-testid="icon-brain" />,
  Zap: () => <svg data-testid="icon-zap" />,
  Shield: () => <svg data-testid="icon-shield" />,
  Upload: () => <svg data-testid="icon-upload" />,
  FileText: () => <svg data-testid="icon-file-text" />,
  Sparkles: () => <svg data-testid="icon-sparkles" />,
}));

// Mock del componente Badge. Esto permite controlarlo y añadir un data-testid si fuera necesario,
// aunque para este componente solo verificamos su texto.
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

describe("<SolutionSection />", () => {
  // 1. Test de renderizado básico y presencia de elementos principales de la sección
  it('renders the main heading, subheading, and "La Solución" badge', () => {
    render(<SolutionSection />);

    // Verificar el badge de "La Solución"
    expect(screen.getByText("La Solución")).toBeInTheDocument();
    expect(screen.getByTestId("icon-check-circle")).toBeInTheDocument(); // Icono dentro del badge

    // Verificar el título principal de la sección de solución
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /IA que analiza y optimiza tu CV para cada oportunidad/i,
      }),
    ).toBeInTheDocument();

    // Verificar el párrafo introductorio de la solución
    expect(
      screen.getByText(
        /CV Optimizer utiliza inteligencia artificial avanzada para analizar tu currículum y la descripción del puesto, generando recomendaciones específicas que aumentan tus posibilidades de ser seleccionado./i,
      ),
    ).toBeInTheDocument();
  });

  // 2. Test para la renderización de las "Características de la Solución" (lado izquierdo)
  describe("Solution Features (left side)", () => {
    it("renders exactly 3 solution feature items", () => {
      render(<SolutionSection />);
      const featureTitles = screen.getAllByRole("heading", { level: 3 }); // h3 for feature titles
      expect(featureTitles).toHaveLength(3);
    });

    it('renders "Análisis Inteligente" feature correctly', () => {
      render(<SolutionSection />);
      expect(screen.getAllByText("1")[0]).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: /Análisis Inteligente/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Nuestra IA examina tu CV completo, identificando áreas de mejora y oportunidades perdidas/i,
        ),
      ).toBeInTheDocument();
      expect(screen.getByTestId("icon-brain")).toBeInTheDocument();
    });

    it('renders "Sugerencias Personalizadas" feature correctly', () => {
      render(<SolutionSection />);
      expect(screen.getAllByText("2")[0]).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: /Sugerencias Personalizadas/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Recibe recomendaciones específicas para tu industria y nivel de experiencia/i,
        ),
      ).toBeInTheDocument();
      expect(screen.getByTestId("icon-zap")).toBeInTheDocument();
    });

    it('renders "Optimización ATS" feature correctly', () => {
      render(<SolutionSection />);
      expect(screen.getAllByText("3")[0]).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 3, name: /Optimización ATS/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Asegúrate de que tu CV pase los filtros automáticos y llegue a los reclutadores/i,
        ),
      ).toBeInTheDocument();
      expect(screen.getByTestId("icon-shield")).toBeInTheDocument();
    });
  });

  // 3. Test para la renderización de los "Pasos del Proceso" (lado derecho)
  describe("Process Steps (right side)", () => {
    it("renders exactly 3 process step items", () => {
      render(<SolutionSection />);
      const processTitles = screen.getAllByRole("heading", { level: 4 }); // h4 for process step titles
      expect(processTitles).toHaveLength(3);
    });

    it('renders "Sube tu CV" process step correctly', () => {
      render(<SolutionSection />);
      // We target the step number associated with this specific process.
      // Since numbers are not unique, we can check for text content in close proximity or use `getAllByText` and check index.
      // For simplicity and given the structure, `getByText` will often find the first match, but if duplicates
      // exist that are not semantically distinct, a more robust query might be needed (e.g., within a specific parent).
      expect(screen.getAllByText("1")[1]).toBeInTheDocument(); // Step number
      expect(
        screen.getByRole("heading", { level: 4, name: /Sube tu CV/i }),
      ).toBeInTheDocument();
      expect(screen.getByText(/Formato PDF/i)).toBeInTheDocument();
      expect(screen.getByTestId("icon-upload")).toBeInTheDocument();
    });

    it('renders "Pega la descripción del puesto" process step correctly', () => {
      render(<SolutionSection />);
      expect(screen.getAllByText("2")[1]).toBeInTheDocument(); // Step number
      expect(
        screen.getByRole("heading", {
          level: 4,
          name: /Pega la descripción del puesto/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Copia y pega la oferta laboral/i),
      ).toBeInTheDocument();
      expect(screen.getByTestId("icon-file-text")).toBeInTheDocument();
    });

    it('renders "Recibe recomendaciones" process step correctly', () => {
      render(<SolutionSection />);
      expect(screen.getAllByText("3")[1]).toBeInTheDocument(); // Step number
      expect(
        screen.getByRole("heading", {
          level: 4,
          name: /Recibe recomendaciones/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/IA analiza y sugiere mejoras/i),
      ).toBeInTheDocument();
      expect(screen.getByTestId("icon-sparkles")).toBeInTheDocument();
    });
  });
});
