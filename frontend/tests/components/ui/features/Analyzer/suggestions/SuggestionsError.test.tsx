// 📁 tests/components/SuggestionsError.test.tsx

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SuggestionsError from "@/components/ui/features/suggestions/SuggestionsError";

jest.mock("lucide-react", () => ({
  AlertTriangle: () => <svg data-testid="icon-alert-triangle" />,
  Home: () => <svg data-testid="icon-home" />,
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
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
  }) => (
    <button className={className} {...props}>
      {children}
    </button>
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

describe("<SuggestionsError />", () => {
  // 1. Test de renderizado básico y elementos de texto principales
  it("renders the error title and descriptive messages", () => {
    render(<SuggestionsError />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Error al generar sugerencias/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-alert-triangle")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Lo sentimos, no pudimos generar las sugerencias para tu CV en este momento./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Por favor, intenta nuevamente en unos minutos\. Si el problema persiste, contacta al soporte técnico./i,
      ),
    ).toBeInTheDocument();
  });

  // 2. Test para el botón "Volver al inicio" y su enlace
  it('renders the "Volver al inicio" button with correct link', () => {
    render(<SuggestionsError />);

    const homeButton = screen.getByRole("link", { name: /Volver al inicio/i });
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).toHaveAttribute("href", "/");
    expect(homeButton).toContainElement(screen.getByTestId("icon-home"));
  });

  // 3. Verificar que los mocks de los componentes UI se están utilizando
  it("renders elements wrapped by mock UI components", () => {
    render(<SuggestionsError />);
    expect(screen.getByTestId("mock-card")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-content")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Volver al inicio/i }),
    ).toBeInTheDocument(); // It will still be a link from Next/Link mock
    expect(
      screen.getByRole("link", { name: /Volver al inicio/i }),
    ).toContainElement(screen.getByText("Volver al inicio"));
  });
});
