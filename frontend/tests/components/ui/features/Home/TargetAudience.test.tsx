import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TargetAudience from "@/components/ui/features/homePage/TargetAudience";

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
  Users: () => <svg data-testid="icon-users" />,
  GraduationCap: () => <svg data-testid="icon-graduation-cap" />,
  Briefcase: () => <svg data-testid="icon-briefcase" />,
  RefreshCw: () => <svg data-testid="icon-refresh-cw" />,
  Crown: () => <svg data-testid="icon-crown" />,
}));

describe("<TargetAudience />", () => {
  // 1. Test de renderizado básico y presencia de elementos principales
  it('renders the main heading, subheading, and "Para Todos" badge', () => {
    render(<TargetAudience />);

    expect(screen.getByText("Para Todos")).toBeInTheDocument();
    expect(screen.getByTestId("icon-users")).toBeInTheDocument();

    const mainHeading = screen.getByRole("heading", {
      level: 2,
      name: /¿Para quién es CV Optimizer\?/i,
    });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent("CV Optimizer?");

    expect(
      screen.getByText(
        /Nuestra herramienta está diseñada para profesionales en todas las etapas de su carrera/i,
      ),
    ).toBeInTheDocument();
  });

  // 2. Test para la renderización de las tarjetas de audiencia
  it("renders exactly four audience cards", () => {
    render(<TargetAudience />);
    const cardTitles = screen.getAllByRole("heading", { level: 3 });
    expect(cardTitles).toHaveLength(4);
  });

  // 3. Test para cada tarjeta de audiencia
  it('renders "Recién Graduados" card correctly with its icon and description', () => {
    render(<TargetAudience />);
    expect(
      screen.getByRole("heading", { level: 3, name: /Recién Graduados/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Destaca tu potencial y habilidades académicas de manera profesional/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-graduation-cap")).toBeInTheDocument();
  });

  it('renders "Profesionales" card correctly with its icon and description', () => {
    render(<TargetAudience />);
    expect(
      screen.getByRole("heading", { level: 3, name: /Profesionales/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Optimiza tu experiencia y logros para avanzar en tu carrera/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-briefcase")).toBeInTheDocument();
  });

  it('renders "Cambio de Carrera" card correctly with its icon and description', () => {
    render(<TargetAudience />);
    expect(
      screen.getByRole("heading", { level: 3, name: /Cambio de Carrera/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Resalta habilidades transferibles para tu nueva industria/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-refresh-cw")).toBeInTheDocument();
  });

  it('renders "Ejecutivos" card correctly with its icon and description', () => {
    render(<TargetAudience />);
    expect(
      screen.getByRole("heading", { level: 3, name: /Ejecutivos/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Presenta tu liderazgo y impacto estratégico de forma convincente/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-crown")).toBeInTheDocument();
  });
});
