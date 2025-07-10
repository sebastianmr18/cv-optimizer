// 📁 tests/components/ui/features/HeroSection.test.tsx

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroSection from "@/components/ui/features/homePage/HeroSection";

jest.mock("lucide-react", () => ({
  ArrowRight: () => <svg data-testid="icon-arrow-right" />,
}));

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>; // Simula un <a> tag con el href
  };
});

jest.mock("next/image", () => {
  return ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        data-testid="mock-image"
      />
    );
  };
});

jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    size,
    className,
  }: {
    children: React.ReactNode;
    size?: string;
    className?: string;
  }) => (
    <button
      data-testid={`mock-button${size ? `-${size}` : ""}`}
      className={className}
    >
      {children}
    </button>
  ),
}));

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

describe("<HeroSection />", () => {
  // 1. Test de renderizado básico y presencia de texto principal
  it("renders the main heading, subheading, and calls to action", () => {
    render(<HeroSection />);

    expect(screen.getByText(/Optimización de CV con IA/i)).toBeInTheDocument();
    expect(screen.getByTestId("mock-badge")).toBeInTheDocument(); // Verify the badge component mock

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Optimiza tu CV con/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Inteligencia Artificial/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Mejora tus oportunidades laborales con nuestro optimizador de CV impulsado por IA. Obtén sugerencias personalizadas y destaca entre los candidatos./i,
      ),
    ).toBeInTheDocument();

    const startButton = screen.getByRole("link", { name: /Comenzar Gratis/i });
    expect(startButton).toBeInTheDocument();
  });

  // 2. Test de interacción: Link y su destino
  it('the "Comenzar Gratis" link navigates to the correct path', () => {
    render(<HeroSection />);
    const startButtonLink = screen.getByRole("link", {
      name: /Comenzar Gratis/i,
    });

    expect(startButtonLink).toHaveAttribute("href", "/analyzer");
  });

  // 3. Test de los iconos y componentes hijos
  it("renders the ArrowRight icon within the button", () => {
    render(<HeroSection />);

    expect(screen.getByTestId("icon-arrow-right")).toBeInTheDocument();

    const button = screen.getByRole("link", { name: /Comenzar Gratis/i });
    expect(button).toContainElement(screen.getByTestId("icon-arrow-right"));
  });

  // 4. Test de la estructura general (presencia de mock-card aunque no es una Card)
  it("uses the mocked Button and Badge components", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("mock-button-lg")).toBeInTheDocument();
    expect(screen.getByTestId("mock-badge")).toBeInTheDocument();
  });
});
